import React from "react";
import PropTypes from 'prop-types';
import UserAvatar from "./UserAvatar";
import {useUserData} from "../redux/reducers/user_data";

export default function ContactRow({userID}) {
    const user_data = useUserData(userID);

    if (user_data === null)
        return <>Ładownaie</>;

    let display_name = [
        user_data.name_prefix,
        user_data.name_given,
        user_data.name_middle,
        user_data.name_family,
        user_data.name_suffix,
    ].filter(str => str).join(" ");

    return <div>
        <UserAvatar/>
        <div>{display_name}</div>
        <div>{userID}</div>
    </div>
}

ContactRow.propTypes = {
    userID: PropTypes.string.isRequired
};