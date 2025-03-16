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
    const chatboxContainerRef = useRef<HTMLDivElement | null>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        if (isAutoScroll) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [messages]);

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } =
            messagesContainerRef.current;

        // If the user is near the bottom, enable auto-scroll
        setIsAutoScroll(scrollTop + clientHeight >= scrollHeight - 50);
    };

    const handleSendMessageScroll = () => {
        if (chatboxContainerRef.current) {
            const rect = chatboxContainerRef.current.getBoundingClientRect();
            window.scrollBy({
                top: rect.top - 50, // Adjust the value as needed
                behavior: "smooth",
            });
        }
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
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": CHATBOT_API_KEY,
                },
                // body: JSON.stringify({ message: input }),
            });
            // const response = await axios.post(
            //     `${CHATBOT_API_URL}/ask`,
            //     { question: input },
            //     {
            //         headers: {
            //             "Content-Type": "application/json",
            //             "X-API-Key": CHATBOT_API_KEY,
            //         },
            //     }
            // );

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
            setError("Uh oh, lets not spam the bot!");
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
            handleSendMessageScroll(); // Scroll the chatbox to the top of the screen
        }
    };

    const placeholders = [
        "What languages can you code in?",
        "Tell me about yourself",
        "What is Forge Fitness?",
        "What do you like to do for fun?",
    ];

    return (
        <>
            <Card
                ref={chatboxContainerRef}
                className="w-full max-w-3xl mx-auto pb-6 shadow-lg border-3px rounded-lg flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out lg:max-h-[50%]  bg-[#04071d]"
            >
                <CardContent
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    style={{ overflowY: "auto", maxHeight: "600px" }}
                    className="space-y-4 px-3  custom-scrollbar flex-1 rounded-lg transition-all duration-500 ease-in-out opacity-100 "
                >
                    <CardHeader className="top-0 z-10">
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Chat with{" "}
                            <span className="px-1 py-0.5 rounded-lg  text-purple border-gray-200">
                                &quot;me&quot;
                            </span>
                            here!
                        </h4>
                    </CardHeader>

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            } items-start gap-2 transition-all duration-500 ease-in-out text-sm font-bold`} // Changed items-center to items-start
                        >
                            {msg.sender === "bot" && (
                                <Avatar className="mt-2 ">
                                    <AvatarImage
                                        src="/bot-avatar.jpeg"
                                        alt="Bot Avatar"
                                    />
                                    <AvatarFallback>Matt</AvatarFallback>
                                </Avatar>
                            )}
                            <Card
                                className={`mt-0 max-w-xs border-none bg-transparent break-words whitespace-pre-wrap rounded-lg ${
                                    msg.sender === "user"
                                        ? "bg-[#472f6d88] text-[#C1C2D3] p-3"
                                        : "bg-[#10132E] text-[#C1C2D3] px-3"
                                } transition-all duration-500 ease-in-out`}
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
                        <div className="flex justify-start items-start gap-2 transition-all duration-500 ease-in-out">
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
                <div className="mt-auto flex gap-3 text-base pt-3 mx-auto  w-full">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={(e) => setInput(e.target.value)}
                        onSubmit={sendMessage}
                    />
                </div>
            </Card>
        </>
    );
};

export default Chatbox;
