import {Button, CircularProgress, TextField} from "@material-ui/core";
import * as React from "react";
import {IFormClient} from "../Props/IFormClient";
import {Alert} from "@material-ui/lab";

export const FormClient = (props: IFormClient) => {
    const {name, address, phone} = props.data;
    const {onChange, onSubmit, loader, error, errorClient, text} = props;
    const getError = () => {
        if (!errorClient) return null;
        return (
            <Alert severity="error">The fields cannot be empty</Alert>
        );
    };
    const getErrorBack = () => {
        if (error) {
            return (
                <Alert severity="error">{error}</Alert>
            );
        }
    };
    const loaderCompo = () => {
        if (loader) {
            return (
                <CircularProgress/>
            );
        }
        return (<Button type="submit">{text || "Create new Client"}</Button>)
    };
    return (
        <form className={"Form"} onSubmit={onSubmit}>
            {getError()}
            {getErrorBack()}
            <TextField onChange={onChange} name={"name"} value={name} label="name"/>
            <TextField onChange={onChange} name="address" value={address} label="address"/>
            <TextField type={"tel"} onChange={onChange} name="phone" value={phone} label="phone"/>
            {loaderCompo()}
        </form>
    )
};
