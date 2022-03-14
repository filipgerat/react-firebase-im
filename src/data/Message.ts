type MessageContentBlock = {
    type: "text";
    value: string;
}

export type MessageContentBlocks = MessageContentBlock[]

export type Message = {
    id: string;
    user: string;
    content: MessageContentBlocks
    createdAt: Date;
}