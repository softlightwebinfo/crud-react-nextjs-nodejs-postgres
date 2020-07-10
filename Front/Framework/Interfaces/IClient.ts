export interface IClientBase {
    id: number;
    createddate: string;
}

export interface IClientData {
    name: string;
    address: string;
    phone: string;
}

export interface IClient extends IClientBase, IClientData {

}

export interface IClientCreate extends IClientData {

}
