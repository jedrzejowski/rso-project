import React from "react";
import PropTypes from "prop-types";
import {useMessagesByConversationId} from "../redux/reducers/messages";
import Message from "./Message";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(theme => ({
    root: {},
    child_spacing: {
        marginTop: theme.spacing(1)
    }
}), {name: "MessageList"});

export default function MessageList({
                                        conversationId: conversation_id,
                                        ...props
                                    }) {

    const classes = useStyle();
    const messages = useMessagesByConversationId(conversation_id);

    return <div>
        {messages.map((message, i) => {
            return <div className={classes.child_spacing}
                        key={message.from_user_id + message.message_id}>
                <Message message={message}/>
            </div>
        })}
    </div>
}


MessageList.propTypes = {
    conversationId: PropTypes.string.isRequired
};