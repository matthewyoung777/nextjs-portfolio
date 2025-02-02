import React from "react";
import { Timeline } from "@/components/ui/Timeline";

export function TimelineList() {
    const data = [
        {
            title: "2025",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Continued development on my fitness mobile app, adding
                        AI-powered features and refining the ranking system.
                    </p>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Worked as an intern at a startup, contributing to
                        full-stack applications and API development.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Built and launched my fitness app with workout
                        generation, ranking systems, and game-like features.
                    </p>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Started my journey into software engineering,
                        transitioning from an Economics background and joining
                        Hackreactor&apos;s 19-week intensive bootcamp.
                    </p>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
