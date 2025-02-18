from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import schemas
import models

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")


@app.get("/movies", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())

@app.post("/movies/{movie_id}/actors")
def add_actor_to_movie(movie_id: int, actor: schemas.ActorCreate):
    # Znajdź film po ID
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    # Tworzenie nowego aktora (jeśli nie istnieje)
    db_actor = models.Actor.create(name=actor.name, surname=actor.surname)

    # Dodaj powiązanie do tabeli pośredniczącej
    models.ActorMovie.create(movie_id=db_movie.id, actor_id=db_actor.id)

    return {"message": "Actor added to movie", "actor": db_actor}

@app.delete("/movies/{movie_id}/actors/{actor_id}")
def remove_actor_from_movie(movie_id: int, actor_id: int):
    # Sprawdź, czy istnieje powiązanie aktora z filmem
    actor_movie_link = models.ActorMovie.get_or_none(
        (models.ActorMovie.movie_id == movie_id) & (models.ActorMovie.actor_id == actor_id)
    )

    if actor_movie_link is None:
        raise HTTPException(status_code=404, detail="Actor is not linked to this movie")

    # Usuń wpis z tabeli pośredniczącej
    actor_movie_link.delete_instance()

    return {"message": "Actor removed from movie"}

@app.post("/movies", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieBase):
    movie = models.Movie.create(**movie.dict())
    return movie


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie


@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def delete_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db_movie.delete_instance()
    return db_movie
