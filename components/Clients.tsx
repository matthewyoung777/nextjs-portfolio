"use client";

import React from "react";

import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
    return (
        <section id="testimonials" className="py-20">
            <h1 className="heading">
                Kind words from
                <span className="text-purple"> colleagues</span>
            </h1>

            <div className="flex flex-col items-center max-lg:mt-10">
                {/* Mobile: stacked cards */}
                <div className="md:hidden flex flex-col gap-6 px-4 mt-10 w-full">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-800 p-6"
                            style={{
                                background: "rgb(4,7,29)",
                                backgroundColor:
                                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                            }}
                        >
                            <p className="text-sm leading-[1.6] text-white font-normal">
                                {item.quote}
                            </p>
                            <div className="mt-6 flex flex-row items-center">
                                <div className="me-3">
                                    <img
                                        width={50}
                                        height={50}
                                        src={item.img}
                                        alt="profile"
                                    />
                                </div>
                                <span className="flex flex-col gap-1">
                                    <span className="text-xl font-bold leading-[1.6] text-white">
                                        {item.name}
                                    </span>
                                    <span className="text-sm leading-[1.6] text-white-200 font-normal">
                                        {item.title}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: infinite scrolling carousel */}
                <div className="hidden md:flex h-[30rem] rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="slow"
                    />
                </div>

                {/* <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
                    {companies.map((company) => (
                        <React.Fragment key={company.id}>
                            <div className="flex md:max-w-60 max-w-32 gap-2">
                                <img
                                    src={company.img}
                                    alt={company.name}
                                    className="md:w-10 w-5"
                                />
                                <img
                                    src={company.nameImg}
                                    alt={company.name}
                                    width={
                                        company.id === 4 || company.id === 5
                                            ? 100
                                            : 150
                                    }
                                    className="md:w-24 w-20"
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default Clients;
