import {IClient} from "./IClient";

export interface IRClient {
    clients: IClient[];
    loader: boolean;
    error: string;
    success: boolean;
    client: IClient;
}
