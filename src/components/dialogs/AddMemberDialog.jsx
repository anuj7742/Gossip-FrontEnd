import { Dialog, DialogTitle, Stack, Typography, Button, Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData';
import UserItem from "../shared/UserItem"
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducers/misc';
import { useDispatch } from 'react-redux';

const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();

    const [selectedMembers, setSelectedMembers] = useState([]);

    const { isAddMember } = useSelector((state) => state.misc)

    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId)

    console.log(data)

    const [addMembers, isLoadingAddMembers] = useAsyncMutation(
        useAddGroupMembersMutation
    )

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => (prev.includes(id)) ? prev.filter((curr) => curr !== id) : [...prev, id])
    }

    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { members: selectedMembers, chatId })
        closeHandler()
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }

    useErrors([{ isError, error }])


    return (
        <Dialog open={isAddMember} onClose={closeHandler}>

            <Stack spacing={"1rem"} p={"2rem"} width={"20rem"}>
                <DialogTitle textAlign={"center"}>Add member</DialogTitle>

                <Stack spacing={"1rem"}>
                    {isLoading ? (
                        <Skeleton />
                    ) :
                        (
                            data?.friends?.length > 0 ? (
                            data?.friends?.map((user) => (
                                <UserItem user={user}
                                    key={user._id}
                                    handler={selectMemberHandler}
                                    isAdded={selectedMembers.includes(user._id)}
                                />
                            ))
                        ) : (<Typography textAlign={"center"}>No Friends</Typography>)
                        )
                    }
                </Stack>

                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button color="error" onClick={closeHandler}>
                        Cancel</Button>
                    <Button variant="contained" disabled={isLoadingAddMembers}
                        onClick={addMemberSubmitHandler}
                    >
                        Submit Changes</Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog;