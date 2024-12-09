"use client";
import { Button, Dropdown, Input, Option, Select, Sheet } from "@mui/joy";
import PageLayout from "../components/PageLayout";
import { WavyBackground } from "../components/aceternity/BackgroundWave";
import { useEffect, useState } from "react";
import { getMovies, getSearch } from "../components/useTMDB";
import { useRouter } from "next/navigation";
import { getNameOrTitle, SearchResults } from "../api/get-movies/search-types";

export interface TMDBMovie {
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
export interface Genre {
    id: number;
    name: string;
}

export default function MovieIndex() {
    const [results, setResults] = useState<SearchResults | null>(null);

    const router = useRouter();

    function goTo(id: number, type: string) {
        router.push(`/${type}/${id}`);
    }

    const [search, setSearch] = useState<string>('');

    let timeoutId: NodeJS.Timeout;

    const searchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            updateResults(e.target.value);
        }, 200);
    };

    const updateResults = (query: string) => {
        getSearch(query).then((data) => {
            setResults(data.results);
        });
    };

    return (
        <PageLayout title="Movies">
            <Sheet variant={'plain'} sx={{ height: '20%', overflow: 'hidden', marginTop: '8px' }}>
                <WavyBackground style={{ width: '100%', height: '100%' }} colors={[
                    '#38bdf8',  // Bright Blue (replacing #00FF00)
                    '#818cf8',  // Soft Violet (replacing #32CD32)
                    '#c084fc',  // Light Purple (replacing #228B22)
                    '#e879f9',  // Magenta (replacing #008000)
                    '#22d3ee'   // Sky Blue (replacing #ADFF2F)
                ]}>
                    <h1 className="relative z-10 text-lg md:text-7xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] bg-clip-text text-transparent bg-gradient-to-b from-[#FFCCFF] to-[#FFCCFF90]  text-center font-sans font-bold">
                        Search
                    </h1>
                </WavyBackground>
            </Sheet>
            <div className="full-w" style={{ height: '20px' }}></div>
            <div className="flex-align-flex-col list-list">
                <div className="flex align justify gap-05">
                    <Select placeholder="Filter by...">
                        {/* <Option value="movie">Movies</Option>
                        <Option value="tv">TV Shows</Option> */}
                        <Option value="none">Filtering not yet complete</Option>
                    </Select>
                    <Input placeholder="Search for movies or tv shows..." style={{width:'100%'}} onChange={searchChanged} value={search} />
                    <Button variant="outlined" color="primary" startDecorator={<i className="fa-solid fa-magnifying-glass"/>}>Search</Button>
                </div>
                <div className="full-w" style={{height:'20px'}}></div>
                <span>Search results for: <b>{search}</b></span>
                <div className="flex gap-1 movie-list">
                    {results?.results.filter(r => r.media_type !== 'person').map((result) => (
                        <div key={result.id} className={`movie-card${result.adult ? ' adult' : ''}`} onClick={() => { goTo(result.id, 'movie') }}>
                            <img src={`https://image.tmdb.org/t/p/w342${result.poster_path}`} alt={getNameOrTitle(result)} />
                            <span>{getNameOrTitle(result)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}