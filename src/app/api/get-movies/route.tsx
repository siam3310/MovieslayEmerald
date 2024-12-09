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

async function getMovies(page: number, customKey?: string) {
    const string = `discover/movie?page=${page}&sort_by=popularity.desc&language=en-US`;
    return await useTMDB(string, customKey);
}
async function getShows(page: number, customKey?: string) {
    const string = `discover/tv?page=${page}&sort_by=popularity.desc&language=en-US`;
    return await useTMDB(string, customKey);
}
async function getGenres(customKey?: string) {
    const string = `genre/movie/list?language=en-US`;
    return await useTMDB(string, customKey);
}
async function getGenresTV(customKey?: string) {
    const string = `genre/tv/list?language=en-US`;
    return await useTMDB(string, customKey);
}
async function getMovie(id: number, customKey?: string) {
    const string = `movie/${id}?language=en-US`;
    return await useTMDB(string, customKey);
}
async function getTV(id: number, customKey?: string) {
    const string = `tv/${id}?language=en-US`;
    return await useTMDB(string, customKey);
}

async function getFromType(type: string, page: number, customKey?: string) {
    switch (type) {
        case 'discover':
            return await getMovies(page, customKey);
        case 'genres':
            return await getGenres(customKey);
        case 'discover-tv':
            return await getShows(page, customKey);
        case 'genres-tv':
            return await getGenresTV(customKey);
        case 'movie':
            return await getMovie(page, customKey);
        case 'tv':
            return await getTV(page, customKey);
        default:
            return await getMovies(page, customKey);
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const customApiKey = searchParams.get('apiKey') || undefined;
    const type = searchParams.get('type') || 'discover';

    if(type === 'search') {
        const query = searchParams.get('query') || '';
        const string = `search/multi?query=${query}&page=${page}&language=en-US`;
        var dataSearch = await useTMDB(string, customApiKey);
        return NextResponse.json(dataSearch);
    }

    const data = await getFromType(type, page, customApiKey);
    return NextResponse.json(data);
}