import './App.css';
import { useState, useEffect } from "react"; // Dodaj `useEffect`
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);

    // Pobieranie filmów z serwera przy załadowaniu komponentu
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies); // Aktualizacja stanu filmów
            }
        };
        fetchMovies();
    }, []); // [] oznacza, że efekt wykona się tylko raz (przy montowaniu komponentu)

    // Funkcja dodawania aktora
    async function handleAddActor(movieId, newActor) {
        // Dodajemy logowanie danych przed wysłaniem do backendu
        console.log('Sending actor:', newActor);

        const response = await fetch(`/movies/${movieId}/actors`, {
            method: 'POST',
            body: JSON.stringify(newActor),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const updatedMovie = await response.json();
            setMovies(movies.map(movie =>
                movie.id === movieId ? updatedMovie : movie
            ));
        } else {
            console.error('Failed to add actor:', response.status);
        }
window.location.reload();
    }

    // Funkcja usuwania aktora
    async function handleRemoveActor(movieId, actor) {
        const response = await fetch(`/movies/${movieId}/actors/${actor.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setMovies(movies.map(movie =>
                movie.id === movieId
                    ? { ...movie, actors: movie.actors.filter(a => a.id !== actor.id) }
                    : movie
            ));
        }
    }

    async function handleAddMovie(movie) {
        console.log("Sending movie:", movie); // Loguj dane przed wysłaniem
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie), // Movie zawiera teraz aktorów
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const movieFromServer = await response.json(); // Pobranie filmu z serwera
            setMovies([...movies, movieFromServer]); // Dodanie nowego filmu do listy
            setAddingMovie(false); // Ukrywanie formularza
        }
    }

    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMovies = movies.filter(m => m !== movie);
            setMovies(nextMovies);
        }
    }

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0 ? (
                <p>No movies yet. Maybe add something?</p>
            ) : (
                <MoviesList movies={movies}
                            onDeleteMovie={handleDeleteMovie} // Przekazujemy funkcję usuwania do MoviesList
                            onAddActor={handleAddActor} // Przekazujemy funkcję dodawania aktora
                            onRemoveActor={handleRemoveActor} // Dodajemy obsługę usuwania aktora
                />
            )}
            {addingMovie ? (
                <MovieForm onMovieSubmit={handleAddMovie}
                           buttonLabel="Add a movie"
                />
            ) : (
                <button onClick={() => setAddingMovie(true)}>Add a movie</button>
            )}
        </div>
    );
}

export default App;