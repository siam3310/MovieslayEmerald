interface MovieProps {
    params: { id: string };
}

export default function MoviePage({ params }: MovieProps) {
    return <h1>Movie ID: {params.id}</h1>;
}