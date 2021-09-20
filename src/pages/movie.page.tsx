import { MovieDetails } from "./movie.types";

export function Page({ movie }: { movie: MovieDetails }) {
    return (
        <>
            <h1>{movie.title}</h1>
            Release Date: {movie.release_date}
            <br />
            Director: {movie.director}
            <br />
            Producer: {movie.producer}
        </>
    );
}
