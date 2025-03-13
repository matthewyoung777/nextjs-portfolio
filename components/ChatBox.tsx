import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { PlaceholdersAndVanishInput } from "./ui/VanishInput";

type ChatMessage = {
    text: string;
    sender: "user" | "bot";
};

const Chatbox = () => {
    const axios = require("axios");
    const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    const CHATBOT_API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Ref for auto-scrolling
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        if (isAutoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } =
            messagesContainerRef.current;

        // If the user is near the bottom, enable auto-scroll
        setIsAutoScroll(scrollTop + clientHeight >= scrollHeight - 50);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        // Add user message to UI
        const newMessages: ChatMessage[] = [
            ...messages,
            { text: input, sender: "user" },
        ];
        setMessages(newMessages);
        setLoading(true);
        setInput("");
        setError(null);

        try {
            const response = await axios.get(CHATBOT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": CHATBOT_API_KEY,
                },
                // body: JSON.stringify({ message: input }),
            });

            console.log("RESPONSE", response.data.answer);
            const answer = response.data.answer;
            if (answer) {
                setMessages([
                    ...newMessages,
                    {
                        text: answer,
                        sender: "bot",
                    },
                ]);
            } else {
                setError("Eror receiving message");
            }
        } catch (error) {
            setError("Uh oh, something went wrong");
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    const placeholders = [
        "Ask: Tell me about yourself",
        "Ask: What is Forge Fitness?",
        "Ask: What do you like to do for fun?",
    ];

    return (
        <Card className="w-full max-w-5xl mx-auto p-6 shadow-lg border-none bg-transparent h-full flex flex-col overflow-hidden">
            <CardContent
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{ overflowY: "auto", maxHeight: "600px" }} // Ensure maxHeight is set
                className="space-y-4 p-1 border-b custom-scrollbar flex-1"
            >
                <CardHeader>
                    <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                        Chat with my{" "}
                        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                            clone
                        </span>{" "}
                        now! 🤖
                    </h4>
                </CardHeader>

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        } items-start gap-2`} // Changed items-center to items-start
                    >
                        {msg.sender === "bot" && (
                            <Avatar className="mt-2">
                                <AvatarImage
                                    src="/bot-avatar.jpeg"
                                    alt="Bot Avatar"
                                />
                                <AvatarFallback>Matt</AvatarFallback>
                            </Avatar>
                        )}
                        <Card
                            className={`pl-2 mt-0 max-w-xs border-none bg-transparent break-words whitespace-pre-wrap ${
                                msg.sender === "user"
                                    ? "text-gray-400"
                                    : "text-white-100"
                            }`}
                        >
                            {msg.sender === "bot" ? (
                                <TextGenerateEffect
                                    words={msg.text}
                                    textColor="white-100"
                                />
                            ) : (
                                msg.text
                            )}
                        </Card>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start items-start gap-2">
                        {" "}
                        {/* Changed items-center to items-start */}
                        <Avatar>
                            <AvatarImage
                                src="/bot-avatar.png"
                                alt="Bot Avatar"
                            />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start gap-2">
                            <Skeleton className="w-[150px] h-[16px] rounded-full" />
                            <Skeleton className="w-[100px] h-[16px] rounded-full" />
                        </div>
                    </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
                {/* Invisible div to trigger scroll */}
                <div ref={messagesEndRef} />
            </CardContent>
            <div className="mt-4 flex gap-3 text-base">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={sendMessage}
                />
            </div>
        </Card>
    );
};

export default Chatbox;
