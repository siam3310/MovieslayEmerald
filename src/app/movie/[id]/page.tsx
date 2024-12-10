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
    const [fullscreen, setFullscreen] = useState(false);

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
            <div className={`flex align flex-col ${fullscreen ? '' : 'gap-05'} movie-page${fullscreen ? ' fullscreen' : ''}`} style={{gap:`${fullscreen ? '0px' : '1rem'}`}}>
                { failed ? <>
                    <h1>Movie not found.</h1>
                </> : <>
                    {fullscreen ? (
                        <button style={{marginTop:`${fullscreen ? '2px' : undefined}`,width:'100%'}} className="server thin" onClick={() => {
                            setFullscreen(false);
                        }}><i className="fa-solid fa-compress"></i> Exit Fullscreen</button>
                    ) : null}
                    <iframe sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts" src={`https://www.2embed.cc/embed/${movie?.id}`}></iframe>
                    <div className="info-card flex align gap-1">
                        <img src={`https://image.tmdb.org/t/p/w342${movie?.poster_path}`}/>
                        <div className="flex flex-col justify details">
                            <button className="server" style={{width:'fit-content'}} onClick={()=>{
                                setFullscreen(!fullscreen);
                            }}><i className="fa-solid fa-expand"></i> Go Fullscreen</button>
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