import {
    ActionClientGetAllSuccess,
    ActionClientGetAllFailed,
    ActionClientCreateSuccess,
    ActionClientCreateFailed,
    ActionClientCreateTrigger,
    ActionClientDeleteSuccess,
    ActionClientDeleteFailed,
    ActionClientGetSuccess,
    ActionClientGetFailed,
    ActionClientUpdateTrigger,
    ActionClientUpdateSuccess, ActionClientUpdateFailed
} from "./actions";
import {put} from 'redux-saga/effects'
import {getApi} from "../../../settings";
import {delay} from "q";
//require('es6-promise').polyfill();
//require('isomorphic-fetch');
export function* getAllClients() {
    try {
        const res = yield fetch(getApi("clients"));
        const response = yield res.json();
        yield put(ActionClientGetAllSuccess(response));
    } catch (err) {
        yield put(ActionClientGetAllFailed(err));
    }
}

export function* getClient(data) {
    try {
        const res = yield fetch(getApi(`client/${data.data}`));
        const response = yield res.json();
        yield put(ActionClientGetSuccess(response));
    } catch (err) {
        yield put(ActionClientGetFailed(err));
    }
}

export function* deleteClient(data) {
    try {
        yield fetch(getApi(`client/${data.data}`), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "delete",
        });
        yield put(ActionClientDeleteSuccess(data.data));
    } catch (err) {
        yield put(ActionClientDeleteFailed(err));
    }
}

export function* createClient(data) {
    try {
        const res = yield fetch(getApi("client"), {
            body: JSON.stringify(data.data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
        const response = yield res.json();
        if (res.ok) {
            yield put(ActionClientCreateSuccess(response));
            yield put(ActionClientCreateTrigger(true));
            yield delay(200);
            yield put(ActionClientCreateTrigger(false));
        } else {
            yield put(ActionClientCreateFailed(response));
        }
    } catch (err) {
        yield put(ActionClientCreateFailed(err));
    }
}

export function* updateClient(data) {
    try {
        const res = yield fetch(getApi(`client/${data.id}`), {
            body: JSON.stringify(data.data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT"
        });
        const response = yield res.json();
        if (res.ok) {
            yield put(ActionClientUpdateSuccess(response, data.id));
            yield put(ActionClientUpdateTrigger(true));
            yield delay(200);
            yield put(ActionClientUpdateTrigger(false));
        } else {
            yield put(ActionClientUpdateFailed(response));
        }
    } catch (err) {
        yield put(ActionClientUpdateFailed(err));
    }
}
