import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { richblack } from "../../constants/color";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsDeleteMenu, setIsMobile, setIsReloadPage, setSelectedDeleteChat } from "../../redux/reducers/misc";
import Title from "../shared/Title";
import Chatlist from "../specific/Chatlist";
import Profile from "../specific/Profile";
import Header from "./Header";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/features";
import { incrementNotificationCount, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {


    return (props) => {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const params = useParams();
        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null);

        const [onlineUsers, setOnlineUsers] = useState([])

        const socket = getSocket();

        const { isMobile, isReloadPage } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)
        const { newMessagesAlert } = useSelector((state) => state.chat)


        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        // console.log(data);
        useErrors([{ isError, error }])

        useState(()=>{
            if(isReloadPage) {
                window.location.reload();
                dispatch(setIsReloadPage(false));
            } 
        },[dispatch])
              

        useEffect(() => {

            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })

        }, [newMessagesAlert])

        const handleDeleteChat = (e, chatId, groupChat) => {

            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            deleteMenuAnchor.current = e.currentTarget
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false))
        }

        const newMessageAlertListener = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data))
        }, [chatId])

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount())
        }, [dispatch])

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/")
        }, [refetch, navigate])

        const onlineUsersListener = useCallback((data) => {

            setOnlineUsers(data)
        }, [])


        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,

        };

        useSocketEvents(socket, eventHandlers)

        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor.current} />

                {
                    isLoading ?
                        (<Skeleton />) : (
                            <Drawer open={isMobile} onClose={handleMobileClose}>
                                <Chatlist chats={data?.chats} chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                            </Drawer>
                        )
                }

                <Grid container height="calc(100vh - 4rem)" >
                    <Grid item md={4} lg={3} height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: richblack[700],
                        }}
                    >
                        <Profile user={user} />
                    </Grid>

                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                            backgroundColor: "#B4D9CA"
                        }}
                        height={"100%"}
                    >
                        {isLoading ? (<Skeleton />) :
                            (
                                <Chatlist chats={data?.chats} chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                            )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>

                </Grid>


            </>
        )
    }
}

export default AppLayout
