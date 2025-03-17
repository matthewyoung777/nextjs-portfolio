"use client";

import Head from "next/head";
import { navItems } from "@/data";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import * as Sentry from "@sentry/nextjs";

console.log("Sentry Replay active:", Sentry.replayIntegration ? "Yes" : "No");
const Home = () => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
                <div className="max-w-7xl w-full">
                    <FloatingNav navItems={navItems} />
                    <Hero />
                    <Grid />
                    <RecentProjects />
                    <Clients />
                    <Experience />
                    <Footer />
                </div>
            </main>
        </>
    );
};

export default Home;
