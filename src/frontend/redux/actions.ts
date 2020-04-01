import type {BasicLoginData} from "../../share/types";
import type AppData from "./AppData";
import type {LoadingObject} from "./AppData";
import type Session from "../lib/Session";
import DatabaseT from "../../share/DatabaseT";

export interface Actions {
    CREDENTIALS_DATA_REQUEST: BasicLoginData
    CREDENTIALS_DATA_SET: LoadingObject<AppData.CredentialsData>

    SESSION_SET: Session | null

    CONTACT_LIST_REQUEST: void
    CONTACT_LIST_SET: AppData.ContactList

    USER_DATA_REQUEST: string
    USER_DATA_SET: DatabaseT.User
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}
