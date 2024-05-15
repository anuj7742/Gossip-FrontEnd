import React, { Suspense, lazy, useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip, Backdrop, Container, Badge, Drawer, Stack, Paper, Dialog, Button, SwipeableDrawer } from "@mui/material";
import axios from "axios";
import { server } from "../../constants/config";

import {
    Group as GroupIcon,
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    ArrowBackIos as ArrowBackIosIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    Cancel as CancelIcon
} from "@mui/icons-material"
import { caribbeangreen, orange, richblack, richblue } from "../../constants/color";
import { useNavigate } from "react-router-dom";

import Gossip from "../../assets/Gossip.png"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsNotification, setIsSearch, setIsNewGroup } from "../../redux/reducers/misc";
import { useSelector } from "react-redux";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationsDialog = lazy(() => import("../specific/Notifications"))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc)
    const { notificationCount } = useSelector((state) => state.chat)

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLogout, setIsLogout] = useState(false)

    const menuOpenHandler = () => {
        setIsSidebarOpen(true);
    }

    const menuCloseHandler = () => {
        setIsSidebarOpen(false);
    }


    const handleClick = () => {
        dispatch(setIsMobile(true));
    }

    const openSearch = () => {
        dispatch(setIsSearch(true));
    }

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true))
    }
    const navigateToGroup = () => {
        navigate("/groups");
    }

    const logoutClickHandler = () => {
        setIsLogout(true);
    }


    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`, {
                withCredentials: true
            });

            dispatch(userNotExists())
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }

    }
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount())
    }



    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar position="static" sx={{
                    bgcolor: caribbeangreen[600]
                }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Gossip
                        </Typography>


                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <IconButton color="inherit" onClick={handleClick}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1
                            }}
                        />

                        <Stack sx={{
                            display: { xs: "none", sm: "block" }
                        }}>

                            <Box>
                                <IconBtn
                                    title={"Search"}
                                    icon={<SearchIcon />}
                                    onClick={openSearch}
                                />
                                <IconBtn
                                    title={"New Group"}
                                    icon={<AddIcon />}
                                    onClick={openNewGroup}
                                />
                                <IconBtn
                                    title={"Manage Group"}
                                    icon={<GroupIcon />}
                                    onClick={navigateToGroup}
                                />
                                <IconBtn
                                    title={"Notifications"}
                                    icon={<NotificationsIcon />}
                                    onClick={openNotification}
                                    value={notificationCount}
                                />

                                <IconBtn
                                    title={"Logout"}
                                    icon={<LogoutIcon />}
                                    onClick={logoutClickHandler}
                                />

                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <IconButton color="inherit" onClick={menuOpenHandler}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

                    <SwipeableDrawer open={isSidebarOpen} onClose={menuCloseHandler} anchor="right" >

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>

                            <Box sx={{
                                height:"10px"
                            }}>

                            </Box>


                            <IconBtn
                                title={"Search"}
                                icon={<SearchIcon />}
                                onClick={openSearch}
                            />
                            <IconBtn
                                title={"New Group"}
                                icon={<AddIcon />}
                                onClick={openNewGroup}
                            />
                            <IconBtn
                                title={"Manage Group"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />
                            <IconBtn
                                title={"Notifications"}
                                icon={<NotificationsIcon />}
                                onClick={openNotification}
                                value={notificationCount}
                            />

                            <IconBtn
                                title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logoutClickHandler}
                            />
                        </Box>
                    </SwipeableDrawer>

                </AppBar>
            </Box>

            {isSearch &&
                <Suspense fallback={<Backdrop open />}>
                    <SearchDialog />
                </Suspense>
            }
            {isNotification &&
                <Suspense fallback={<Backdrop open />}>
                    <NotificationsDialog />
                </Suspense>
            }
            {isNewGroup &&
                <Suspense fallback={<Backdrop open />}>
                    <NewGroupDialog />
                </Suspense>
            }

            {
                isLogout &&
                <Dialog open onClose={() => setIsLogout(false)}>
                    <Stack direction={"column"} alignItems={"center"}
                        p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}
                    >
                        <Typography textAlign={"center"} variant="h5">
                            Are you sure you want to log out?
                        </Typography>

                        <Stack direction={"row"} justifyContent={"space-evenly"}
                            p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}
                        >
                            <Button variant="contained" color="error" size="large" onClick={() => setIsLogout(false)}>
                                <Stack direction={"row"} gap={"0.5rem"}>
                                    No
                                    <CancelIcon />
                                </Stack>

                            </Button>
                            <Button variant="contained" size="large" onClick={logoutHandler}>
                                <Stack direction={"row"} gap={"0.5rem"}>
                                    Yes
                                    <LogoutIcon />
                                </Stack>


                            </Button>
                        </Stack>
                    </Stack>
                </Dialog>
            }
        </>
    )
}

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {value ? (
                    <Badge badgeContent={value} color="error">
                        {icon}
                    </Badge>) : (
                    icon)
                }
            </IconButton>
        </Tooltip>
    )
}

export default Header 