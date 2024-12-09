import { CssVarsProvider, Sheet } from "@mui/joy";
import Image from "next/image";
import PageLayout from "./components/PageLayout";
import { BackgroundBeams } from "./components/aceternity/BackgroundBeams";

export default function Home() {
    return (
        <PageLayout>
            <BackgroundBeams />
            <div className="flex flex-col align justify full-w h-90 gap-05">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-blue-100 to-indigo-500  text-center font-sans font-bold">
                    Movieslay Emerald
                </h1>
                <p className="text-light-blue-50 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Welcome to Movieslay Emerald, the best place to find movies, shows, and anime. Movieslay Emerald is the successor to Movieslay, a free and robust movie streaming service.
                </p>
            </div>
        </PageLayout>
    );
}
