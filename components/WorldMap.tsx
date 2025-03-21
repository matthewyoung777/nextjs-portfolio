"use client";
import { WorldMap } from "@/components/ui/world-map";

export default function WorldMapGrid() {
    return (
        <>
            <WorldMap
                dots={[
                    {
                        start: {
                            lat: 64.2008,
                            lng: -149.4937,
                        }, // Alaska (Fairbanks)
                        end: {
                            lat: 30.7749,
                            lng: -130.4194,
                        }, // San Francisco
                    },
                    {
                        start: {
                            lat: 30.7749,
                            lng: -130.4194,
                        }, // San Francisco
                        end: {
                            lat: 40.7128,
                            lng: -74.006,
                        }, // New York
                    },
                    {
                        start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                        end: { lat: -20.7975, lng: -52.8919 }, // Brazil (Brasília)
                    },
                    {
                        start: { lat: -20.7975, lng: -52.8919 }, // Brazil (Brasília)
                        end: { lat: 30.7223, lng: -9.1393 }, // Lisbon
                    },
                    {
                        start: { lat: 47.5074, lng: -2.1278 }, // London
                        end: { lat: 10.6139, lng: 82.209 }, // New Delhi
                    },
                    {
                        start: { lat: 10.6139, lng: 82.209 }, // New Delhi
                        end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                    },
                    {
                        start: { lat: 10.6139, lng: 82.209 }, // New Delhi
                        end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                    },
                ]}
            />
        </>
    );
}
