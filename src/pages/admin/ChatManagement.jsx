import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard"
import { useFetchData } from "6pp"
import { server } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders"
import { useErrors } from "../../hooks/hook";



const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => <AvatarCard avatar={params.row.avatar} />
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 300
    },
    {
        field: "groupChat",
        headerName: "Group",
        headerClassName: "table-header",
        width: 100
    },
    {
        field: "totalMembers",
        headerName: "Total Meembers",
        headerClassName: "table-header",
        width: 120
    },
    {
        field: "members",
        headerName: "Members",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => (
            <AvatarCard max={100} avatar={params.row.members} />
        )
    },
    {
        field: "totalMessages",
        headerName: "TotalMessages",
        headerClassName: "table-header",
        width: 120
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => (
            <Stack direction="row" alignItems="center" spacing={"1rem"} >
                <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                <span>{params.row.creator.name}</span>
            </Stack>
        )
    },

];

const ChatManagement = () => {

    const [rows, setRows] = useState([]);

    const { loading, data, error } = useFetchData(`${server}/api/v1/admin/chats`, "dashboard-chats")

    // console.log(data)
    useErrors([
        {
            isError: error,
            error: error
        }
    ])

    useEffect(() => {
        if (data) {
            setRows(data?.transformedChats.map((i) => ({
                ...i,
                id: i._id,
                avatar: i.avatar.map((i) => transformImage(i, 50)),
                members: i.members.map((i) => transformImage(i.avatar, 50)),
                creator: {
                    name: i.creator.name,
                    avatar: transformImage(i.creator.avatar, 50)
                }
            })));
        }

    }, [data])

    return (
        <AdminLayout>
            {
                loading ? (
                    <Skeleton height={"100vh"} />
                ) : (
                    <Table heading={"All Chats"} rows={rows} columns={columns} />
                )
            }
        </AdminLayout>
    )
}


export default ChatManagement