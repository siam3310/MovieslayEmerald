"use client";
import { Sheet } from "@mui/joy";
import PageLayout from "../components/PageLayout";
import { WavyBackground } from "../components/aceternity/BackgroundWave";
import { useEffect, useState } from "react";
import { getMovies } from "../components/useTMDB";
import { useRouter } from "next/navigation";
import { Genre } from "../movie/page";

export interface TMDBShow {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export default function MovieIndex() {
    const [movies, setMovies] = useState<TMDBShow[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getMovies(1, 'discover-tv').then((data) => {
            setMovies(data.results);
        });
        getMovies(1, 'genres-tv').then((data) => {
            setGenres(data.genres);
        });
    }, []);

    const router = useRouter();

    function goTo(id: number, type: string) {
        router.push(`/${type}/${id}`);
    }

    return (
        <PageLayout title="Movies">
            <Sheet variant={'plain'} sx={{height:'30%',overflow:'hidden',marginTop:'8px'}}>
                <WavyBackground style={{width:'100%',height:'100%'}} colors={[
                    "#f87171", // Soft Red
                    "#f43f5e", // Strong Pink-Red
                    "#f472b6", // Bright Pink
                    "#ec4899", // Vibrant Pink
                    "#e11d48", // Deep Pink-Red
                    "#be185d", // Dark Pink
                ]}>
                    <h1 className="relative z-10 text-lg md:text-7xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] bg-clip-text text-transparent bg-gradient-to-b from-[#ff7ae0] to-[#ff7ae090]  text-center font-sans font-bold">
                        Anime
                    </h1>
                </WavyBackground>
            </Sheet>
            <div className="full-w" style={{height:'20px'}}></div>
            <div className="flex-align-flex-col list-list flex align justify">
                <h1 className="text-3xl">Anime is coming soon!</h1>
            </div>
        </PageLayout>
    );
}