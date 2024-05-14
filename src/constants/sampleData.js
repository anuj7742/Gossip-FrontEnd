

export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Ankit Kumar",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Anuj Kumawat",
        _id: "2",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png",],
        name: "Chetan Jangid",
        _id: "3",
        groupChat: true,
        members: ["3", "2"],
    },
]

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Ankit Kumar",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Anuj Kumawat",
        _id: "2",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar.png",],
        name: "Chetan Jangid",
        _id: "3"
    },
]

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Ankit Kumar",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Anuj Kumawat",
        },
        _id: "2",
    },

]


export const sampleMessage = [
    {

        content: "Hello, how are you..",
        _id: "efdfsffdfdgffdfdgdfgdfg",
        sender: {
            _id: "user._id",
            name: "Cp Sharma",
        },
        char: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachments: [
            {
                public_id: "asdfdsad",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        _id: "efdfsffdfregrrdgffdfdgdfgdfg",
        sender: {
            _id: "fsdsgthb",
            name: "Cp Sharma",
        },
        char: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
]


export const dashboardData = {
    users: [
        {
            name: "Anuj Kumawat",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            username:"@nuj7777",
            friends: 20,
            groups: 5,
        },
        {
            name: "Ankit Kumar",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            username:"ankit_07",
            friends: 77,
            groups: 7,
        },
        {
            name: "CP Sharma",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "3",
            username:"cp_443",
            friends: 18,
            groups: 3,
        },
    ],

    chats:[
        {
            name: "Zammers",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "3",
            groupChat: false,
            members:  [
                { _id:"1", avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                { _id:"2", avatar:"https://www.w3schools.com/howto/img_avatar.png "}
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "CP Sharma",
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            }
        },
        {
            name: "StudyNotion",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: true,
            members: [
                { _id:"1", avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                { _id:"2", avatar:"https://www.w3schools.com/howto/img_avatar.png "}
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "Anuj Kumawat",
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            }
        }
    ],


    messages: [
        {
            attachments : [],
            content: "Hello ji",
            _id: "wdffverfve",
            sender: {
                avatar : "https://www.w3schools.com/howto/img_avatar.png",
                name : "Piyush",
            },
            chat : "chatId",
            groupChat:false,
            createdAt: "2024-04-12T10:41:30.630Z"
        },
        {
            attachments : [
                {
                    public_id : "dsfewfwew",
                    url:"https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            content: "",
            _id: "rwthrtbbrhgh",
            sender: {
                avatar : "https://www.w3schools.com/howto/img_avatar.png",
                name : "Piyush MI",
            },
            chat : "chatId",
            groupChat: true,
            createdAt: "2024-04-12T10:41:30.630Z"
        },
    ]

}