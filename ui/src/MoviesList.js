import MovieListItem from "./MovieListItem";

export default function MoviesList(props) {
    return (
        <div>
            <h2>Movies</h2>
            <ul className="movies-list">
                {props.movies.map(movie => (
                    <li key={movie.id}>
                        <MovieListItem
                            movie={movie}
                            onDelete={() => props.onDeleteMovie(movie)}
                            onAddActor={props.onAddActor}   // ✅ Przekazujemy funkcję do MovieListItem
                            onRemoveActor={props.onRemoveActor} // ✅ To samo dla usuwania aktorów
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
