import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicBox = ({
    children,
    otherClasses,
}: {
    children: React.ReactNode;
    otherClasses?: string;
}) => {
    return (
        <div className="w-full lg:min-h-[80%] max-w-3xl relative inline-flex  overflow-hidden rounded-lg p-[4px]  focus:outline-none">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            {/* remove px-3 py-1, add px-5 gap-2 */}
            <span
                className={`inline-flex h-full w-full items-center justify-center rounded-lg
             bg-slate-950   backdrop-blur-3xl  ${otherClasses}`}
            >
                {children}
            </span>
        </div>
    );
};

export default MagicBox;
