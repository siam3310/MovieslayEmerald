import { NextResponse } from 'next/server';

async function useTMDB(path: string, customKey?: string) {
    const url = 'https://api.themoviedb.org/3/' + path;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + (customKey ?? process.env.TMDB_API_KEY),
        },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

async function getTV(series: number, season: number, customKey?: string) {
    const string = `tv/${series}/season/${season}?language=en-US`;
    return await useTMDB(string, customKey);
}
async function getEP(series: number, season: number, episode: number, customKey?: string) {
    const string = `tv/${series}/season/${season}?language=en-US`;
    return await useTMDB(string, customKey);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const series = parseInt(searchParams.get('series') ?? '1', 10);
    const season = parseInt(searchParams.get('season') ?? '1', 10);
    const episode = searchParams.get('episode') ? parseInt(searchParams.get('episode')||'-1', 10) : -1;
    const customApiKey = searchParams.get('apiKey') || undefined;

    const data = episode === -1 ? await getTV(series, season, customApiKey) : await getEP(series, season, episode, customApiKey);
    return NextResponse.json(data);
}