"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    textColor,
    className,
}: {
    words: string;
    className?: string;
    textColor?: string; // Make textColor optional
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 2,
                delay: stagger(0.2),
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    if (word === "\n") {
                        return <br key={"br" + idx} />;
                    }
                    return (
                        <motion.span
                            key={word + idx}
                            className={`${
                                textColor
                                    ? `text-${textColor} text-sm`
                                    : idx > 3 && idx < 7
                                    ? "text-purple"
                                    : "dark:text-white text-black"
                            } opacity-0`}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="my-4">
                <div className="leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
