import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography, Box } from "@mui/material";
import { richblack, puregreys } from "../constants/color";

const Home = () => {
    return (
        <Box bgcolor={puregreys[50]} height={"100%"}>
            <Typography color={richblack[700]} p={"2rem"} variant="h5" textAlign={"center"}>  
                Select a friend to chat
            </Typography>
        </Box>
    )
}

export default AppLayout()(Home);