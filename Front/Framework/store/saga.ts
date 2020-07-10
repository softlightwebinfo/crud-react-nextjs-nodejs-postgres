import {all, takeLatest} from 'redux-saga/effects'
import es6promise from 'es6-promise'
import {actionTypes as actionTypeClient, createClient, deleteClient, getAllClients, getClient, updateClient} from "./client";

es6promise.polyfill();

function* rootSaga() {
    yield all([
        //call(runClockSaga),
        takeLatest(actionTypeClient.CLIENT_ALL, getAllClients),
        takeLatest(actionTypeClient.CLIENT_CREATE, createClient),
        takeLatest(actionTypeClient.CLIENT_DELETE, deleteClient),
        takeLatest(actionTypeClient.CLIENT_GET, getClient),
        takeLatest(actionTypeClient.CLIENT_UPDATE, updateClient),
    ])
}

export default rootSaga
