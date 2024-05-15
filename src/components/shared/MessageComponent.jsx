import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { caribbeangreen, puregreys, richblack } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div
            
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: sameSender ? caribbeangreen[300] : puregreys[50],
                color: richblack[800],
                borderRadius: "5px",
                padding: "0.5rem",
                width: "fit-content"
            }}

        >
            {
                !sameSender &&
                <Typography color={caribbeangreen[500]} fontWeight={"700"} variant="caption">
                    {sender.name}
                </Typography>
            }
            {content && <Typography>{content}</Typography>}
            {
                attachments.length > 0 && attachments.map((attachment, index) => {
                    const url = attachment.url
                    const file = fileFormat(url)

                    return (
                        <Box key={index}>
                            <a href={url} target="_black" download
                                style={{
                                    color: richblack[800]
                                }}
                            >
                                {RenderAttachment(file, url)}
                            </a>
                        </Box>
                    )
                })
            }

            <Typography variant="caption" color={"text.secondary"}>
                {timeAgo}
            </Typography>
        </div>
    )
}

export default memo(MessageComponent)