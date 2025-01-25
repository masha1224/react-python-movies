import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actorInput, setActorInput] = useState(''); // Pole dla aktora
    const [actors, setActors] = useState([]); // Lista aktorów


     // Funkcja do dodawania aktora do listy
    function addActor(event) {
        event.preventDefault();
        if (actorInput.trim() === '') return; // Sprawdzenie, czy pole nie jest puste
        setActors([...actors, actorInput]); // Dodanie aktora do listy
        setActorInput(''); // Czyszczenie pola aktora
    }

    // Funkcja do usuwania aktora
    function removeActor(actor) {
        setActors(actors.filter(a => a !== actor)); // Usunięcie aktora z listy
    }


    function addMovie(event) {
    event.preventDefault();
    if (title.length < 5) {
        return alert('Tytuł jest za krótki');
    }
    // Przekazywanie aktorów do props
    props.onMovieSubmit({title, year, director, description, actors});
    setTitle('');
    setYear('');
    setDirector('');
    setDescription('');
    // Usuwanie aktorów może być zachowane po dodaniu, jeśli chcesz to zrobić
    // setActors([]);
}

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <div>
            <label>Actor</label>
            <input
                type="text"
                value={actorInput}
                onChange={(event) => setActorInput(event.target.value)}/>
            <button onClick={addActor}>Add Actor</button>
        </div>
        <ul>
            {actors.map((actor, index) => (
                <li key={index}>
                    {actor}
                    <button onClick={() => removeActor(actor)}>Remove</button>
                </li>
            ))}
        </ul>
            <button>{props.buttonLabel || 'Submit'}</button>
    </form>
;
}
