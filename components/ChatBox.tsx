import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { PlaceholdersAndVanishInput } from "./ui/VanishInput";
import MagicBox from "@/components/MagicBox";
import Loader from "@/components/ui/loader";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

type ChatMessage = {
    text: string;
    sender: "user" | "bot";
};

const Chatbox = () => {
    const exampleQuestions = [
        "What languages can you code in?",
        "What do you like to do for fun?",
        "Tell me about yourself",
    ];

    const { toast } = useToast();
    const axios = require("axios");
    const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    const CHATBOT_API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [awake, setAwake] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        const fetchData = async () => {
            console.log("waking chatbot");
            const response = await axios.get(`${CHATBOT_API_URL}/wake`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": CHATBOT_API_KEY,
                },
            });
            console.log(response);
            if (response.status === 200) {
                toast({
                    title: "A.I. Matt is awake!",
                    description: "You can now chat with A.I. Matt",
                    variant: "custom",
                    action: (
                        <ToastAction
                            altText="Chat"
                            onClick={handleSendMessageScroll}
                        >
                            Chat now!
                        </ToastAction>
                    ),
                });
                setAwake(true);
            }
        };
        fetchData();
    }, []);

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } =
            messagesContainerRef.current;

        setIsAutoScroll(scrollTop + clientHeight >= scrollHeight - 70);
    };

    const handleSendMessageScroll = () => {
        if (chatboxContainerRef.current) {
            const rect = chatboxContainerRef.current.getBoundingClientRect();
            window.scrollBy({
                top: rect.top - 60,
                behavior: "smooth",
            });
        }
    };

    const sendMessage = async (message?: string) => {
        const msg = message || input;
        if (!msg.trim()) return;
        // Add user message to UI
        const newMessages: ChatMessage[] = [
            ...messages,
            { text: msg, sender: "user" },
        ];
        setMessages(newMessages);
        setLoading(true);
        setInput("");
        setError(null);

        try {
            const response = await axios.post(
                `${CHATBOT_API_URL}/ask`,
                { question: msg },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": CHATBOT_API_KEY,
                    },
                }
            );

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
            handleSendMessageScroll();
        }
    };

    const placeholders = [
        "What languages can you code in?",
        "Tell me about yourself",
        "What is Forge Fitness?",
        "What do you like to do for fun?",
    ];

    return (
        <MagicBox>
            <Card
                ref={chatboxContainerRef}
                className=" max-w-3xl h-full pb-0 shadow-lg rounded-3xl flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out bg-[#04071d] justify-end"
                id="chatbox-card"
            >
                <CardContent
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    style={{ overflowY: "auto" }}
                    className=" px-3  h-full custom-scrollbar flex-1 rounded-3xl transition-all duration-500 ease-in-out opacity-100"
                    id="card-content"
                >
                    <CardHeader
                        id="card-header"
                        className="top-0 z-50 sticky bg-gradient-to-b from-[#04071d] to-[#04071d]/1 "
                    >
                        {" "}
                        {awake ? (
                            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                Chat with my
                                <span className="px-1 py-0.5 rounded-lg  text-purple border-gray-200">
                                    AI clone
                                </span>
                                here!
                            </h4>
                        ) : (
                            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                A.I. Matt was sleeping for a while,
                                <span className="px-1 py-0.5 rounded-lg  text-purple border-gray-200">
                                    give him a minute to wake up...
                                </span>
                            </h4>
                        )}
                    </CardHeader>

                    {/* Initial Message */}
                    {!awake && (
                        <div
                            id="loader-container"
                            className="flex rounded-3xl justify-center items-center h-full"
                            style={{ paddingTop: "calc(50% - 100px)" }}
                        >
                            <Loader />
                        </div>
                    )}
                    {awake && (
                        <div
                            className={`flex "justify-start"items-start gap-2 pb-5 transition-all duration-500 ease-in-out text-sm font-bold`} //
                        >
                            <Avatar className="mt-2 ">
                                <AvatarImage
                                    src="/bot-avatar.jpeg"
                                    alt="Bot Avatar"
                                />
                                <AvatarFallback>Matt</AvatarFallback>
                            </Avatar>

                            <Card
                                className={`mt-0 max-w-md border-none bg-transparent break-words whitespace-pre-wrap rounded-lg  bg-[#3e295f88]  text-[#C1C2D3] px-3 transition-all duration-500 ease-in-out`}
                            >
                                <TextGenerateEffect
                                    words={"Hello! Ask me about my background!"}
                                    textColor="white-100"
                                />
                            </Card>
                        </div>
                    )}

                    {awake && messages.length < 1 && (
                        <div
                            id="example-questions-container"
                            className="flex flex-col items-end pb-5 transition-all duration-500 ease-in-out text-sm font-bold"
                        >
                            {exampleQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    className="my-1 justify-start bg-[#10132E] hover:bg-[#3c4591] break-words justify-end font-bold border-[white]/2 text-[#C1C2D3] border-2 rounded-3xl px-0 py-2 transition-all duration-500 ease-in-out p-3"
                                    onClick={() => sendMessage(question)}
                                >
                                    {question}
                                </Button>
                            ))}
                        </div>
                    )}
                    {awake &&
                        messages.map((msg, i) => (
                            <div
                                key={i}
                                id="messages-container"
                                className={`flex ${
                                    msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                } items-start gap-2 pb-5 transition-all duration-500 ease-in-out text-sm font-bold`} //
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
                                    className={`mt-0 max-w-md border-none bg-transparent break-words whitespace-pre-wrap rounded-lg ${
                                        msg.sender === "user"
                                            ? "  bg-[#10132E] text-[#C1C2D3] p-3"
                                            : " bg-[#3e295f88]  text-[#C1C2D3] px-3"
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
                            <Avatar>
                                <AvatarImage
                                    src="/bot-avatar.jpeg"
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

                <div className="mt-0 pb-5 bg-transparent flex text-base pt-3 mx-auto w-full border-[#10132E] border-t-2 bordershadow-lg z-20">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={(e) => setInput(e.target.value)}
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        awake={awake}
                    />
                </div>
            </Card>
        </MagicBox>
    );
};

export default Chatbox;
