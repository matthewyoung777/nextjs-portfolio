import React from "react";

const MagicBox = ({
    children,
    otherClasses,
}: {
    children: React.ReactNode;
    otherClasses?: string;
}) => {
    return (
        <div className="w-full lg:min-h-[80%] max-w-3xl  max-h-[600px] relative inline-flex  overflow-hidden rounded-3xl p-[4px]  focus:outline-none">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            <span
                className={`inline-flex h-full w-full items-center justify-center rounded-3xl
             bg-slate-950   backdrop-blur-3xl  ${otherClasses}`}
            >
                {children}
            </span>
        </div>
    );
};

export default MagicBox;
