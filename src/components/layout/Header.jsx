import { AppBar, Backdrop, Badge, Box, Button, Dialog, IconButton, Stack, SwipeableDrawer, Toolbar, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { Suspense, lazy, useState } from "react";
import { server } from "../../constants/config";

import {
    Add as AddIcon,
    ArrowBackIos as ArrowBackIosIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    Cancel as CancelIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { caribbeangreen, richblack } from "../../constants/color";

import logo from "./Icon.png"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { resetNotificationCount } from "../../redux/reducers/chat";
import { setIsMobile, setIsNewGroup, setIsNotification, setIsReloadPage, setIsSearch } from "../../redux/reducers/misc";

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

            dispatch(userNotExists());
            dispatch(setIsReloadPage((false)))
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }

    }
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount())
    }

    const shouldRenderHeader = !location.pathname.includes("/chat/");

    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar position="static" sx={{
                    bgcolor: richblack[500],
                    height: "4rem"
                }}>
                    <Toolbar>
                        <Tooltip>
                            <Box
                                onClick={() => navigate("/")}

                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    marginTop: "25px",
                                    position: "absolute",
                                    cursor: "pointer",
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <img src={logo} alt="Logo" width={160} height={100} loading="lazy" position="relative" />
                            </Box>
                        </Tooltip>



                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <IconButton color="inherit" onClick={handleClick}>
                                <ArrowForwardIosIcon />
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
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

                    <SwipeableDrawer 
                        open={isSidebarOpen} 
                        onClose={menuCloseHandler} 
                        anchor="right" 
                        onOpen={() => {}}
                    >

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            margin: "10px"
                        }}>

                            <Box sx={{
                                height: "10px"
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
                        p={{ xs: "1rem", sm: "2rem" }} width={"90%"} spacing={"2rem"}
                    >
                        <Typography textAlign={"center"} variant="h5">
                            Are you sure you want to log out?
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"space-evenly"} alignItems={"center"}
                            p={{ xs: "1rem", sm: "2rem" }} width={{ xs: "60%", sm: "25rem" }} gap={"2rem"}
                        >
                            <Button variant="contained" color="error" size="large" onClick={() => setIsLogout(false)}
                                sx={{
                                    // marginLeft:{xs:"10px", sm:"0px"},
                                    minWidth: { xs: "90%", sm: "40%" },
                                }}
                            >
                                <Stack direction={"row"} gap={"0.5rem"}>
                                    No
                                    <CancelIcon />
                                </Stack>

                            </Button>
                            <Button variant="contained" size="large" color="success" onClick={logoutHandler}
                                sx={{
                                    minWidth: { xs: "90%", sm: "40%" },
                                }}
                            >
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