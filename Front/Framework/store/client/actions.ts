import {IClient, IClientCreate} from "../../Interfaces/IClient";

export const actionTypes = {
    CLIENT_ALL: "CLIENT_ALL",
    CLIENT_ALL_SUCCESS: "CLIENT_ALL_SUCCESS",
    CLIENT_ALL_FAILED: "CLIENT_ALL_FAILED",
    CLIENT_CREATE: "CLIENT_CREATE",
    CLIENT_CREATE_SUCCESS: "CLIENT_CREATE_SUCCESS",
    CLIENT_CREATE_TRIGGER: "CLIENT_CREATE_TRIGGER",
    CLIENT_CREATE_FAILED: "CLIENT_CREATE_FAILED",

    CLIENT_UPDATE: "CLIENT_UPDATE",
    CLIENT_UPDATE_SUCCESS: "CLIENT_UPDATE_SUCCESS",
    CLIENT_UPDATE_TRIGGER: "CLIENT_UPDATE_TRIGGER",
    CLIENT_UPDATE_FAILED: "CLIENT_UPDATE_FAILED",

    CLIENT_DELETE: "CLIENT_DELETE_FAILED",
    CLIENT_DELETE_SUCCESS: "CLIENT_DELETE_SUCCESS",
    CLIENT_DELETE_FAILED: "CLIENT_DELETE_FAILED",
    CLIENT_GET: "CLIENT_GET",
    CLIENT_GET_SUCCESS: "CLIENT_GET_SUCCESS",
    CLIENT_GET_FAILED: "CLIENT_GET_FAILED",
};

export const ActionClientGetAll = () => ({type: actionTypes.CLIENT_ALL});
export const ActionClientGetAllSuccess = (data: IClient[]) => ({type: actionTypes.CLIENT_ALL_SUCCESS, data});
export const ActionClientGetAllFailed = (err) => ({type: actionTypes.CLIENT_ALL_FAILED, data: err});

export const ActionClientCreate = (data: IClientCreate) => ({type: actionTypes.CLIENT_CREATE, data});
export const ActionClientCreateTrigger = (success: boolean) => ({type: actionTypes.CLIENT_CREATE_TRIGGER, data: success});
export const ActionClientCreateSuccess = (data: IClient) => ({type: actionTypes.CLIENT_CREATE_SUCCESS, data});
export const ActionClientCreateFailed = (err) => ({type: actionTypes.CLIENT_CREATE_FAILED, data: err});

export const ActionClientUpdate = (data: IClientCreate, id: number) => ({type: actionTypes.CLIENT_UPDATE, data, id});
export const ActionClientUpdateTrigger = (success: boolean) => ({type: actionTypes.CLIENT_UPDATE_TRIGGER, data: success});
export const ActionClientUpdateSuccess = (data: IClient, id: number) => ({type: actionTypes.CLIENT_UPDATE_SUCCESS, data, id});
export const ActionClientUpdateFailed = (err) => ({type: actionTypes.CLIENT_UPDATE_FAILED, data: err});

export const ActionClientGet = (id: number) => ({type: actionTypes.CLIENT_GET, data: id});
export const ActionClientGetSuccess = (data: IClient) => ({type: actionTypes.CLIENT_GET_SUCCESS, data});
export const ActionClientGetFailed = (err) => ({type: actionTypes.CLIENT_GET_FAILED, data: err});

export const ActionClientDelete = (id: number) => ({type: actionTypes.CLIENT_DELETE, data: id});
export const ActionClientDeleteSuccess = (id: number) => ({type: actionTypes.CLIENT_DELETE_SUCCESS, data: id});
export const ActionClientDeleteFailed = (err) => ({type: actionTypes.CLIENT_DELETE_FAILED, data: err});
