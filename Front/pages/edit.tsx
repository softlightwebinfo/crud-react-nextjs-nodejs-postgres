import * as React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import {END} from "redux-saga";
// @ts-ignore
import {Link, Router} from '../server/routes';
import {Template} from "../Framework/Components/Template";
import {Container} from "@material-ui/core";
import {ActionClientUpdate, ActionClientGet} from "../Framework/store/client";
import {FormClient} from "../Framework/Containers/FormClient";
import {IClient} from "../Framework/Interfaces/IClient";

class Index extends Component<{
    dispatch: any;
    error: string;
    loader: boolean;
    success: boolean;
    client: IClient;
}> {
    static async getInitialProps(ctx) {
        ctx.store.dispatch(ActionClientGet(ctx.query.id));
        if (ctx.req) {
            ctx.store.dispatch(END);
            await ctx.store.sagaTask.toPromise();
        }
        return {
            tag: ctx.query.tag
        }
    }

    state = {
        name: "",
        phone: "",
        address: "",
        error: false,
    };

    constructor(props) {
        super(props);
        if (props.client) {
            this.initialize(props)
        }
    }

    initialize(props) {
        this.state.name = props.client.name;
        this.state.phone = props.client.phone;
        this.state.address = props.client.address;
    }

    componentDidUpdate(prevProps): void {
        if (this.props.success) {
            Router.pushRoute("/");
        }
        if (this.props.client != prevProps.client) {
            this.initialize(this.props);
            this.setState(this.state);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            error: false,
        });
        const {name, address, phone} = this.state;
        if (!name.length || !address.length || !phone.length) {
            this.setState({
                error: true,
            });
            return;
        }
        this.props.dispatch(ActionClientUpdate({
            name,
            address,
            phone,
        }, this.props.client.id));
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <Template
                title={"Editar cliente"}
            >
                <Container>
                    <FormClient
                        text={"Update client"}
                        data={this.state}
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                        error={this.props.error}
                        errorClient={this.state.error}
                        loader={this.props.loader}
                    />
                </Container>
            </Template>
        );
    }
}

export default connect((state) => ({
    success: state.client.success,
    loader: state.client.loader,
    error: state.client.error,
    client: state.client.client,
}))(Index)
