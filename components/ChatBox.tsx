import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const Chatbox = () => {
    const axios = require("axios");
    const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    const CHATBOT_API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY;
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Ref for auto-scrolling
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        // Add user message to UI
        const newMessages = [...messages, { text: input, sender: "user" }];
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Card className="w-full max-w-5xl mx-auto p-6 shadow-lg">
            <CardContent className="h-96 overflow-y-auto space-y-4 p-1 border-b custom-scrollbar">
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
                            className={`pl-2 mt-0 max-w-xs border-none ${
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
                            <Skeleton className="w-[150px] h-[15px] rounded-full" />
                            <Skeleton className="w-[100px] h-[15px] rounded-full" />
                        </div>
                    </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
                {/* Invisible div to trigger scroll */}
                <div ref={messagesEndRef} />
            </CardContent>
            <div className="mt-4 flex gap-3">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                    placeholder="Type a message..."
                />
                <Button
                    onClick={sendMessage}
                    className="bg-black-500 text-white hover:bg-gray-700"
                >
                    Send
                </Button>
            </div>
        </Card>
    );
};

export default Chatbox;
