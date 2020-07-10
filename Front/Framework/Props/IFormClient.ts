import {IClientCreate} from "../Interfaces/IClient";
import {IOnChange} from "@codeunic/library-ui/build/Interfaces/IOnChange";

export interface IFormClient {
    data: IClientCreate;
    onChange: (e: IOnChange) => void;
    onSubmit: (e: any) => void;
    loader: boolean;
    error: string;
    errorClient: boolean;
    text?: string;
}
