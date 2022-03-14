type MessageContentBlock = {
    type: "text";
    value: string;
}

export type Message = {
    id: string;
    user: string;
    content: MessageContentBlock[]
}