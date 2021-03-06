import {combineReducers} from "redux";
import userReducer from "./user/reducers";
import exampleReducer from "./example/reducers";
import clientReducer from "./client/reducers";

export default combineReducers({
    example: exampleReducer,
    user: userReducer,
    client: clientReducer,
});
