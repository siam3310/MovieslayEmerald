export async function getMovies(page: number, type?: string, customKey?: string) {
    const response = await fetch(`/api/get-movies?page=${page}${customKey ? '&apiKey='+customKey : ''}${type ? '&type='+type : ''}`);
    const data = await response.json();
    return data;
}
export async function getSearch(query: string, page?: number, customKey?: string) {
    const response = await fetch(`/api/get-movies?type=search&query=${encodeURIComponent(query)}&page=${page||'1'}${customKey ? '&apiKey='+customKey : ''}`);
    const data = await response.json();
    return data;
}
export async function getSeasonData(series: number, season: number, customKey?: string) {
    const response = await fetch(`/api/season-data?series=${series}&season=${season}${customKey ? '&apiKey='+customKey : ''}`);
    const data = await response.json();
    return data;
}