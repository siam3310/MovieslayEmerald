"use client";
import PageLayout from "@/app/components/PageLayout";
import { TMDBMovie } from "../page";
import { useEffect, useState } from "react";
import { getMovies } from "@/app/components/useTMDB";
import React from "react";

interface MovieProps {
    params: Promise<{ id: number }>;
}

export default function MoviePage({ params }: MovieProps) {
    const [movie, setMovie] = useState<TMDBMovie | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        params.then(({ id }) => {
            getMovies(id, 'movie').then(data => {
                if (data.success === false) {
                    setFailed(true);
                    return;
                }
                setMovie(data);
            });
        });
    }, [params]);

    return (
        <PageLayout title={`${movie ? movie.title : 'Movie'}`}>
            <div className="flex align flex-col gap-05 movie-page">
                { failed ? <>
                    <h1>Movie not found.</h1>
                </> : <>
                    <iframe src={`https://www.2embed.cc/embed/${movie?.id}`}></iframe>
                    <div className="info-card flex align gap-1">
                        <img src={`https://image.tmdb.org/t/p/w342${movie?.poster_path}`}/>
                        <div className="flex flex-col justify details">
                            <b>{movie?.title}</b>
                            <p>{movie?.overview}</p>
                        </div>
                        <div className="flex flex-col gap-05 justify servers">
                            <button className="server" onClick={()=>{
                                navigator.clipboard.writeText(window.location.href);
                            }}>
                                <i className="fa-solid fa-clone"></i>
                                Copy Link
                            </button>
                            <button className="server" onClick={()=>{
                                window.open(`https://bsky.app/intent/compose?text=Watch%20${encodeURIComponent(movie?.title||'movies like this one')}%20on%20Movieslay:%20${encodeURIComponent(window.location.href)}`);
                            }}>
                                <i className="fa-solid fa-brands fa-bluesky"></i>
                                Bsky Share
                            </button>
                            <button className="server" onClick={()=>{
                                window.open(`https://twitter.com/intent/tweet?text=Watch%20${encodeURIComponent(movie?.title||'movies like this one')}%20on%20Movieslay:&url=${encodeURIComponent(window.location.href)}`);
                            }}>
                                <i className="fa-solid fa-brands fa-twitter"></i>
                                Tweet
                            </button>
                        </div>
                    </div>
                </>}
            </div>
        </PageLayout>
    );
}