import * as React from "react";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {IHeader} from "../Props/IHeader";
// @ts-ignore
import {Link} from '../../server/routes';

export const Header = (props: IHeader) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" style={{flex: 1}}>
                {props.title}
            </Typography>
            <Link to={"index"}>
                <a style={{color: "white"}}>
                    <Button color="inherit">Listar clientes</Button>
                </a>
            </Link>
            <Link to={"new"}>
                <a style={{color: "white"}}>
                    <Button color="inherit">Crear cliente</Button>
                </a>
            </Link>
        </Toolbar>
    </AppBar>
);
