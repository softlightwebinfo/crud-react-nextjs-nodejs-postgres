import * as React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import {END} from "redux-saga";
// @ts-ignore
import {Link} from '../server/routes';
import {Template} from "../Framework/Components/Template";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {ActionClientGetAll, ActionClientDelete} from "../Framework/store/client";
import {IClient} from "../Framework/Interfaces/IClient";
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class Index extends Component<{
    clients: IClient[];
    dispatch: any;
}> {
    static async getInitialProps(ctx) {
        const state = ctx.store.getState();
        if (!state.client.clients.length) {
            ctx.store.dispatch(ActionClientGetAll());
        }
        if (ctx.req) {
            ctx.store.dispatch(END);
            await ctx.store.sagaTask.toPromise();
        }
        return {
            tag: ctx.query.tag
        }
    }

    constructor(props) {
        super(props);
    }

    delete = (id: number) => {
        if (confirm("you want to delete the client?")) {
            this.props.dispatch(ActionClientDelete(id));
        }
    };

    render() {
        const {clients} = this.props;
        return (
            <Template
                title={"Listado de clientes"}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{moment(row.createddate).format("DD/MM/YYYY HH:mm")}</TableCell>
                                    <TableCell align="right">
                                        <Link to={"edit"} params={{id: row.id}}>
                                            <a>
                                                <IconButton aria-label="delete" color="primary">
                                                    <EditIcon/>
                                                </IconButton>
                                            </a>
                                        </Link>
                                        <IconButton aria-label="delete" color="primary" onClick={() => this.delete(row.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Template>
        );
    }
}

export default connect(state => ({
    clients: state.client.clients || []
}))(Index)
