import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import {DataGrid} from "@mui/x-data-grid"
import { richblack } from "../../constants/color";

const Table = ({rows, columns, heading ,rowHeight =52}) => {

    // console.log(rows)
    // console.log(columns)
    return (
        <Container
            sx={{
                height:"100vh",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding:"1rem 4rem",
                    borderRadius:"1rem",
                    margin:"auto",
                    width:'100%',
                    overflow:"hidden",
                    height:"100%",
                    boxShadow:"none"

                }}
            >
                <Typography
                    textAlign={"center"}
                    variant="h4"
                    sx={{
                        margin:"2rem",
                        textTransform:"uppercase"
                    }}
                >{heading}</Typography>
                
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={rowHeight}
                    style={{
                        height:"80%"
                    }}
                    sx={{
                        border:"none",
                        ".table-header" : {
                            bgcolor : richblack[400],
                            color: richblack[5]
                        }
                    }}
                />
            </Paper>
        </Container>
    )
}

export default Table