from typing import List
import fastapi as _fastapi
import fastapi.security as _security

import sqlalchemy.orm as _orm

import services as _services, schemas as _schemas

app = _fastapi.FastAPI()


@app.post("/api/users")
async def create_user(
    user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_email(user.email, db)
    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Email already in use")

    user = await _services.create_user(user, db)

    return await _services.create_token(user)


@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return await _services.create_token(user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/leads", response_model=_schemas.Lead)
async def create_lead(
    lead: _schemas.LeadCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_lead(user=user, db=db, lead=lead)


@app.get("/api/leads", response_model=List[_schemas.Lead])
async def get_leads(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_leads(user=user, db=db)


@app.get("/api/leads/{lead_id}", status_code=200)
async def get_lead(
    lead_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_lead(lead_id, user, db)


@app.delete("/api/leads/{lead_id}", status_code=204)
async def delete_lead(
    lead_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_lead(lead_id, user, db)
    return {"message", "Successfully Deleted"}


@app.put("/api/leads/{lead_id}", status_code=200)
async def update_lead(
    lead_id: int,
    lead: _schemas.LeadCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_lead(lead_id, lead, user, db)
    return {"message", "Successfully Updated"}


#! TVSeries Section
@app.post("/api/series", response_model=_schemas.Series)
async def create_series(
    series: _schemas.SeriesCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_series(db=db, series=series)

@app.get("/api/series", response_model=List[_schemas.Series])
async def get_series(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_series(db=db)

@app.get("/api/series/{series_id}", status_code=200)
async def get_series_by_id(
    series_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_series_by_id(series_id, db)

@app.put("/api/series/{series_id}", status_code=200)
async def update_series(
    series_id: int,
    series: _schemas.SeriesCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_series(series_id, series, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/series/{series_id}", status_code=204)
async def delete_series(
    series_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_series(series_id, db)
    return {"message": "Successfully Deleted"}


#* Season Section
@app.post("/api/seasons", response_model=_schemas.Season)
async def create_season(
    season: _schemas.SeasonCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_season(db=db, season=season)

@app.get("/api/seasons", response_model=List[_schemas.Season])
async def get_seasons(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_seasons(db=db)

@app.get("/api/seasons/{season_id}", status_code=200)
async def get_season_by_id(
    season_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_season_by_id(season_id, db)

@app.put("/api/seasons/{season_id}", status_code=200)
async def update_season(
    season_id: int,
    season: _schemas.SeasonCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_season(season_id, season, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/seasons/{season_id}", status_code=204)
async def delete_season(
    season_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_season(season_id, db)
    return {"message": "Successfully Deleted"}

#? Episode Section
@app.post("/api/episodes", response_model=_schemas.Episode)
async def create_episode(
    episode: _schemas.EpisodeCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_episode(db=db, episode=episode)

@app.get("/api/episodes", response_model=List[_schemas.Episode])
async def get_episodes(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_episodes(db=db)

@app.get("/api/episodes/{episode_id}", status_code=200)
async def get_episode_by_id(
    episode_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_episode_by_id(episode_id, db)

@app.put("/api/episodes/{episode_id}", status_code=200)
async def update_episode(
    episode_id: int,
    episode: _schemas.EpisodeCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_episode(episode_id, episode, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/episodes/{episode_id}", status_code=204)
async def delete_episode(
    episode_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_episode(episode_id, db)
    return {"message": "Successfully Deleted"}


 #TODO: ALL section at update function it might have some bugs BOOM! HELP ME!
 
 
#! Movie Section
@app.post("/api/movies", response_model=_schemas.Movie)
async def create_movie(
    movie: _schemas.MovieCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_movie(db=db, movie=movie)

@app.get("/api/movies", response_model=List[_schemas.Movie])
async def get_movies(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movies(db=db)

@app.get("/api/movies/{movie_id}", status_code=200)
async def get_movie_by_id(
    movie_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movie_by_id(movie_id, db)

@app.put("/api/movies/{movie_id}", status_code=200)
async def update_movie(
    movie_id: int,
    movie: _schemas.MovieCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_movie(movie_id, movie, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/movies/{movie_id}", status_code=204)
async def delete_movie(
    movie_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_movie(movie_id, db)
    return {"message": "Successfully Deleted"}


#* Genre Section
@app.post("/api/genres", response_model=_schemas.Genre)
async def create_genre(
    genre: _schemas.GenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_genre(db=db, genre=genre)

@app.get("/api/genres", response_model=List[_schemas.Genre])
async def get_genres(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_genres(db=db)

@app.get("/api/genres/{genre_id}", status_code=200)
async def get_genre_by_id(
    genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_genre_by_id(genre_id, db)

@app.put("/api/genres/{genre_id}", status_code=200)
async def update_genre(
    genre_id: int,
    genre: _schemas.GenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_genre(genre_id, genre, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/genres/{genre_id}", status_code=204)
async def delete_genre(
    genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_genre(genre_id, db)
    return {"message": "Successfully Deleted"}


#? Movie Genre Section
@app.post("/api/moviegenres", response_model=_schemas.MovieGenre)
async def create_movie_genre(
    movie_genre: _schemas.MovieGenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_movie_genre(db=db, movie_genre=movie_genre)

@app.get("/api/moviegenres", response_model=List[_schemas.MovieGenre])
async def get_movie_genres(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movie_genres(db=db)

@app.get("/api/moviegenres/{movie_genre_id}", status_code=200)
async def get_movie_genre_by_id(
    movie_genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movie_genre_by_id(movie_genre_id, db)

@app.put("/api/moviegenres/{movie_genre_id}", status_code=200)
async def update_movie_genre(
    movie_genre_id: int,
    movie_genre: _schemas.MovieGenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_movie_genre(movie_genre_id, movie_genre, db)
    return {"message": "Successfully Updated"}

@app.delete("/api/moviegenres/{movie_genre_id}", status_code=204)
async def delete_movie_genre(
    movie_genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_movie_genre(movie_genre_id, db)
    return {"message": "Successfully Deleted"}



"""@app.get("/api")
async def root():
    return {"message": "Awesome Netflix"}"""