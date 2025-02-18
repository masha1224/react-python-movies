import { useState } from 'react';

export default function MovieListItem(props) {
    const [showForm, setShowForm] = useState(false);
    const [actorName, setActorName] = useState("");
    const [actorSurname, setActorSurname] = useState("");

    const handleAddActor = async () => {
        if (!actorName || !actorSurname) return;

        // Tworzenie nowego aktora
        const newActor = { name: actorName, surname: actorSurname };
        await props.onAddActor(props.movie.id, newActor);

        setActorName("");
        setActorSurname("");
        setShowForm(false);
    };

    return (
        <div style={{ border: '2px solid #ccc', padding: '15px', margin: '10px', borderRadius: '8px' }}>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <a onClick={props.onDelete} style={{ color: 'red', fontWeight: 'bold' }}>Delete Movie</a>,
                {' '}
                <a onClick={() => setShowForm(true)}>Add Actor</a>
            </div>

            {props.movie.description && (
                <div style={{ marginTop: "10px" }}>
                    <strong>Description:</strong> {props.movie.description}
                </div>
            )}

            {props.movie.actors && props.movie.actors.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    <strong>Actors:</strong>
                    {props.movie.actors.map((actor, index) => (
                        <div key={index}>
                            {actor.name} {actor.surname}
                            <a onClick={() => props.onRemoveActor(props.movie.id, actor)} style={{ marginLeft: "10px" }}>Remove Actor</a>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={actorName}
                        onChange={(e) => setActorName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={actorSurname}
                        onChange={(e) => setActorSurname(e.target.value)}
                    />
                    <div style={{ marginTop: "5px" }}>
                        <button style={{ marginRight: "10px" }} onClick={handleAddActor}>Confirm</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
