import {HYDRATE} from "next-redux-wrapper";
import {actionTypes} from "./actions";
import {IRClient} from "../../Interfaces/IRClient";

export const exampleInitialState: IRClient = {
    clients: [],
    loader: false,
    error: null,
    success: false,
    client: null,
};

function reducers(state = exampleInitialState, action) {
    switch (action.type) {
        case HYDRATE: {
            const nextState = {
                ...state, // use previous state
                ...action.payload.client, // apply delta from hydration
            };
            return nextState
        }
        case actionTypes.CLIENT_CREATE: {
            return {
                ...state,
                loader: true,
                error: null,
            }
        }
        case actionTypes.CLIENT_ALL_SUCCESS: {
            return {
                ...state,
                clients: action.data || [],
            }
        }
        case actionTypes.CLIENT_CREATE_TRIGGER: {
            return {
                ...state,
                success: action.data,
            }
        }
        case actionTypes.CLIENT_CREATE_SUCCESS: {
            return {
                ...state,
                clients: [
                    action.data,
                    ...state.clients,
                ],
                loader: false,
                error: null,
            }
        }
        case actionTypes.CLIENT_CREATE_FAILED: {
            return {
                ...state,
                loader: false,
                error: action.data,
            }
        }
        case actionTypes.CLIENT_DELETE_SUCCESS: {
            return {
                ...state,
                clients: state.clients.filter(client => client.id != action.data),
            }
        }
        case actionTypes.CLIENT_GET_SUCCESS: {
            return {
                ...state,
                client: action.data,
            }
        }
        case actionTypes.CLIENT_UPDATE_TRIGGER: {
            return {
                ...state,
                success: action.data,
            }
        }
        case actionTypes.CLIENT_UPDATE_SUCCESS: {
            let client = state.clients.findIndex(client => client.id == action.id);
            state.clients[client] = action.data;
            return {
                ...state,
                clients: state.clients,
                loader: false,
                error: null,
            }
        }
        case actionTypes.CLIENT_UPDATE_FAILED: {
            return {
                ...state,
                loader: false,
                error: action.data,
            }
        }
        default:
            return state
    }
}

export default reducers
