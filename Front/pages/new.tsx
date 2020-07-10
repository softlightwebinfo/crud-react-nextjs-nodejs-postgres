import * as React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import {END} from "redux-saga";
// @ts-ignore
import {Link, Router} from '../server/routes';
import {Template} from "../Framework/Components/Template";
import {Container} from "@material-ui/core";
import {ActionClientCreate} from "../Framework/store/client";
import {FormClient} from "../Framework/Containers/FormClient";

class Index extends Component<{
    dispatch: any;
    error: string;
    loader: boolean;
    success: boolean;
}> {
    static async getInitialProps(ctx) {
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
    }

    componentDidUpdate(): void {
        if (this.props.success) {
            Router.pushRoute("/");
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
        this.props.dispatch(ActionClientCreate({
            name,
            address,
            phone,
        }));
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <Template
                title={"Create a new customer"}
            >
                <Container>
                    <FormClient
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
}))(Index)
