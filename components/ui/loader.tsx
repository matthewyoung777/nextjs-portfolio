"use client"; // Ensures this runs only on the client side
import { grid } from "ldrs";
import { useEffect, useState } from "react";
const Loader = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            grid.register();
            setIsClient(true);
        }
    }, []);

    if (!isClient) return null; // Prevent rendering on the server

    return <l-grid size="60" speed="1.5" color="white"></l-grid>;
};

export default Loader;
