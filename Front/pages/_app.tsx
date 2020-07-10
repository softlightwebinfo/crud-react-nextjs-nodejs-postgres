import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {wrapper} from "../Framework/store/store";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        };

        return {pageProps}
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <>
                <Head>
                    <title>My page</title>
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default wrapper.withRedux(MyApp)


