import { createSlice } from "@reduxjs/toolkit"
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT, NOTIFICATIONS_COUNT, } from "../../constants/events";

const initialState = {
   notificationCount : getOrSaveFromStorage({
    key: NOTIFICATIONS_COUNT,
    get:"true"
   }) || 0,
   newMessagesAlert : 
   getOrSaveFromStorage(
    {
        key:NEW_MESSAGE_ALERT, 
        get:true
    }
    ) || [
    {
        chatId: "",
        count : 0,
    },
   ],
   
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        incrementNotificationCount : (state)=> {
            state.notificationCount += 1;
            getOrSaveFromStorage({key:NOTIFICATIONS_COUNT, value: state.notificationCount})
        },
        resetNotificationCount : (state)=> {
            state.notificationCount = 0;
            getOrSaveFromStorage({key:NOTIFICATIONS_COUNT, value: 0})
        },
        setNewMessagesAlert : (state, action) => {
            const chatId = action.payload.chatId
            const index = state.newMessagesAlert.findIndex(
                (item) => item.chatId === chatId
            )
            if(index !== -1){
                state.newMessagesAlert[index].count += 1;
            }else{
                state.newMessagesAlert.push({
                    chatId,
                    count : 1,
                })
            }
        },
        removeNewMessagesAlert : (state,action)=> {
            state.newMessagesAlert = state.newMessagesAlert.filter(
                (item) => item.chatId !== action.payload
            )
        }
    },


})



export default chatSlice;
export const {
    incrementNotificationCount,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert
} = chatSlice.actions;