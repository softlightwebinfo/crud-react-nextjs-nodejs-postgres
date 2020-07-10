import * as React from "react";
import {ITemplate} from "../Props/ITemplate";
import {Header} from "./Header";
import Head from "next/head";

export const Template = (props: ITemplate) => {
    return (
        <div className={"Template"}>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header title={props.title}/>
            <main>
                {props.children}
            </main>
        </div>
    );
};
