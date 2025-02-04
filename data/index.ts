export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
];

export const gridItems = [
    {
        id: 1,
        title: "I prioritize client collaboration, fostering open communication ",
        description: "",
        className:
            "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[70vh] sm:min-h-[90vh] min-h-[50vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "/profile.jpg",
        spareImg: "",
    },
    {
        id: 2,
        title: "I'm very flexible with time zone communications",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
    },
    {
        id: 3,
        title: "My tech stack",
        description: "I constantly try to improve",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "",
        spareImg: "",
    },
    {
        id: 4,
        title: "Tech enthusiast with a passion for development.",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/grid.svg",
        spareImg: "/b4.svg",
    },

    {
        id: 5,
        title: "Currently building a mobile Fitness Companion",
        description: "The Inside Scoop",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/b5.svg",
        spareImg: "/grid.svg",
    },
    {
        id: 6,
        title: "Want to get in contact?",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full max-w-60 text-center",
        img: "",
        spareImg: "",
    },
];

export const projects = [
    {
        id: 1,
        title: "Forge Fitness",
        des: "Gamifyng fitness to make it more fun and engaging for users to chase their fitness goals.",
        img: "/forge-fitness.svg",
        iconLists: [
            "/re.svg",
            "/mongo.svg",
            "/ts.svg",
            "/expo.svg",
            "/nodejs.svg",
        ],
        link: "https://mailchi.mp/6190a8efe0c0/forge-fitness-signup-form",
    },
    {
        id: 2,
        title: "Paper Stonks - Practice investing risk-free",
        des: "A simulated investment platform to refine trading strategies without real-world risks.",
        img: "/paperstonks.svg",
        iconLists: [
            "/fastapi.svg",
            "/docker.svg",
            "/re.svg",
            "/postgresql.svg",
            "/python.svg",
        ],
        link: "https://apex-legends1.gitlab.io/paper-stonks/",
    },
    // {
    //     id: 3,
    //     title: "AI Image SaaS - Canva Application",
    //     des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    //     img: "/p3.svg",
    //     iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    //     link: "/ui.aiimg.com",
    // },
    // {
    //     id: 4,
    //     title: "Animated Apple Iphone 3D Website",
    //     des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    //     img: "/p4.svg",
    //     iconLists: [
    //         "/next.svg",
    //         "/tail.svg",
    //         "/ts.svg",
    //         "/three.svg",
    //         "/gsap.svg",
    //     ],
    //     link: "/ui.apple.com",
    // },
];

export const testimonials = [
    {
        quote: "I enjoyed working with Matthew in Cruise's R & D Fleet Ops. Matthew was part of an elite group of R & D testers that were trained in Mapping. To be selected for Mapping, you have to be technically savvy, have dependable time management skills, and have solid communication skills when slacking with techs and engineers. You have to get results. Matthew had all those plus he is pleasant to work with. Highly recommended!",
        name: "Marisa Lomask",
        title: "Technical Project Manager at Cruise",
        img: "/profile.svg",
    },
    {
        quote: "As a team member, Matt was essential in helping us plan the project out using figma and excalidraw which was important in helping us understand how the project was meant to be built. Matthew was also frequent in giving us fresh ideas and solutions to make our project stand out from the rest. Even after the completion our project, Matthew was consistent to add more features and front-end development post-deployment which shows his nature to go above and beyond the set goal. I am very confident that Matthew will bring these skills to any team that he joins!",
        name: "Leo Shon",
        title: "Software Engineer at Rendr",
        img: "/leo.png",
    },
];

export const companies = [
    {
        id: 1,
        name: "cloudinary",
        img: "/cloud.svg",
        nameImg: "/cloudName.svg",
    },
    {
        id: 2,
        name: "appwrite",
        img: "/app.svg",
        nameImg: "/appName.svg",
    },
    {
        id: 3,
        name: "HOSTINGER",
        img: "/host.svg",
        nameImg: "/hostName.svg",
    },
    {
        id: 4,
        name: "stream",
        img: "/s.svg",
        nameImg: "/streamName.svg",
    },
    {
        id: 5,
        name: "docker.",
        img: "/dock.svg",
        nameImg: "/dockerName.svg",
    },
];

export const workExperience = [
    {
        id: 1,
        title: "AI Engineer Intern - MiniMe AI",
        desc: "Assisted in the development a RAG pipeline to enhance LLM retrieval and response accuracy.",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "Full Stack Software Engineer Intern - Networky.ai",
        desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
    },
    {
        id: 3,
        title: "Founding Engineer",
        desc: "Leading the development of a mobile app for fitness, from initial concept to deployment on app stores.",
        className: "md:col-span-2",
        thumbnail: "/exp3.svg",
    },
    {
        id: 4,
        title: "Autonomos Vehicle Test Specialist",
        desc: "Expanded drivable testing zones and improved drive behavior data analysis and enhanced vehicle testing efficiency, doubling driverless mileage.",
        className: "md:col-span-2",
        thumbnail: "/exp2.svg",
    },
];

export const timelineData = [];

export const socialMedia = [
    {
        id: 1,
        img: "/git.svg",
    },
    {
        id: 2,
        img: "/twit.svg",
    },
    {
        id: 3,
        img: "/link.svg",
    },
];
