import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { richblack } from "../../constants/color";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";
import { format } from 'date-fns';

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
    lastMessage
}) => {

    const dispatch = useDispatch();

    const formattedTime = lastMessage ? format(new Date(lastMessage.createdAt), 'p') : '';
    // console.log(formattedTime)

    return (
        <Link
            sx={{
                padding: "0"
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                    display: "flex",
                    gap: "0.2rem",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? richblack[300] : "unset",
                    color: sameSender ? richblack[5] : "unset",
                    position: "relative"
                }}

            >
                <AvatarCard avatar={avatar} />

                <Stack flex={1} spacing={0.5}>
                    <Typography sx={{ color: 'text.primary' }}>
                        {name}
                    </Typography>
                    {/* {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Message</Typography>
                        )
                    } */}
                    {lastMessage && (
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            {/* <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex:1, }}>
                                {lastMessage?.attachments?.length === 0 ? lastMessage?.content : "File"}
                            </Typography> */}
                            {/* <Typography variant="body2" sx={{ color: 'text.disabled', marginLeft: 'auto', paddingLeft: '1rem' }}>
                                {formattedTime}
                            </Typography> */}
                        </Stack>
                    )}
                </Stack>

                {
                    isOnline && (
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                                position: "absolute",
                                top: "25%",
                                left: "2.7rem",
                                transform: "translateY(-50%)",
                            }}


                        />
                    )
                }

            </motion.div>
        </Link>
    )
}


export default memo(ChatItem)