export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
            <div>{props.movie.description}</div>

            {/* Sprawdzenie, czy film ma aktorów */}
            {props.movie.actors && props.movie.actors.length > 0 && (
                <div>
                    <strong>Actors:</strong>
                    <ul>
                        {props.movie.actors.map((actor, index) => (
                            <li key={index}>{actor}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
