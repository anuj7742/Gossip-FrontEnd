import { Grid, Box, IconButton, Drawer, Stack, Typography, styled } from "@mui/material";
import {
    Close as CloseIcon,
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    ManageAccounts as ManageAccountsIcon,
    Groups as GroupsIcon,
    Message as MessageIcon,
    ExitToApp as ExitToAppIcon,
}
    from "@mui/icons-material";
import React, { useState } from "react";
import { richblack } from "../../constants/color";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";
// import { adminTabs } from "../../constants/route";


const Link = styled(LinkComponent)
    `
    text-decoration : none;
    border-radius : 2rem ;
    padding: 1rem 2rem;
    color : black;
    &:hover {
        color : rgba(0,0,0,0.54)
    }
`

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users-management",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats-management",
        icon: <GroupsIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />
    },

]


const Sidebar = ({ w }) => {

    const location = useLocation()

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(adminLogout())
    }
    return (
        <Stack width={w} direction={"column"} p={"1.5rem"} spacing={"3rem"}>
            <Typography variant="h5" textTransform={"uppercase"}>
                Gossip
            </Typography>

            <Stack spacing={"1rem"}>
                {
                    adminTabs.map((tab) => (
                        <Link key={tab.path} to={tab.path}
                            sx={
                                location.pathname === tab.path && {
                                    bgcolor: richblack[800],
                                    width: "11rem",
                                    color: richblack[50],
                                    ":hover": { color: richblack[200] },
                                }
                            }
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }


                <Link onClick={logoutHandler}>
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon />
                        <Typography>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}



const AdminLayout = ({ children }) => {

    const {isAdmin} = useSelector((state) => state.auth)

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => setIsMobile(!isMobile);

    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to="/admin"/>    

    return (
        <Grid container minHeight={"100vh"}>

            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    right: "1rem",
                    top: "1rem",
                    backgroundColor: richblack[50],
                    borderRadius: "3rem"
                }}
            >
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>

            </Box>
            <Grid
                item
                md={4}
                lg={3}
                sx={{ display: { xs: "none", md: "block" } }}
            >
                <Sidebar />
            </Grid>

            <Grid
                item
                xs={12}
                md={8}
                lg={9}
                sx={{
                    bgcolor: richblack[300]
                }}
            >
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>
                <Sidebar w="40vw" />
            </Drawer>
        </Grid>

    )
}

export default AdminLayout