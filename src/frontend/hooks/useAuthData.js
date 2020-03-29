import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {DatabaseT.Session}
 */
function selector(store) {
    return store.auth_data;
}

/**
 *
 * @return {DatabaseT.Session | null}
 */
export default function () {
    let session_data = useSelector(selector);

    return session_data ?? null;
}
