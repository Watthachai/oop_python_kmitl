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


#! Series Section

@app.get("/api/series", response_model=List[_schemas.Series])
async def get_series(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_series(db=db)

@app.get("/api/series/{series_id}", response_model=_schemas.Series)
async def get_series_by_id(
    series_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_series_by_id(db=db, series_id=series_id)

@app.post("/api/series", response_model=_schemas.Series)
async def create_series(
    series: _schemas.SeriesCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_series(db=db, series=series)

@app.put("/api/series/{series_id}", response_model=_schemas.Series)
async def update_series(
    series_id: int,
    series: _schemas.SeriesCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.update_series(db=db, series_id=series_id, series=series)

@app.delete("/api/series/{series_id}", status_code=204)
async def delete_series(
    series_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_series(db=db, series_id=series_id)
    return {"message", "Successfully Deleted"}

#! Subseries = Season Section
@app.get("/api/series/{series_id}/seasons/", response_model=List[_schemas.Season])
async def get_seasons(
    series_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_seasons(db=db, series_id=series_id)

@app.get("/api/series/{series_id}/seasons/{season_number}", response_model=_schemas.Season)
async def get_season_by_id(
    series_id: int,
    season_number: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_season_by_id(db=db, series_id=series_id, season_number=season_number)

@app.post("/api/series/{series_id}/seasons/", response_model=_schemas.Season)
async def create_season(
    series_id: int, 
    season: _schemas.SeasonCreate, 
    db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_season(db=db, series_id=series_id, season=season)

@app.delete("/api/series/{series_id}/seasons/{season_id}", status_code=204)
async def delete_season(
    series_id: int,
    season_number: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    await _services.delete_season(db=db, series_id=series_id, season_number=season_number)
    return {"message": "Successfully Deleted"}


#! Subseries = Episode Section
@app.get("/api/series/{series_id}/seasons/{season_id}/episodes", response_model=List[_schemas.Episode])
async def get_episodes(
    series_id: int,
    season_number: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_episodes(db=db, series_id=series_id, season_number=season_number)

@app.get("/api/series/{series_id}/seasons/{season_id}/episodes/{episode_id}", response_model=_schemas.Episode)
async def get_episode_by_id(
    series_id: int,
    season_number: int,
    episode_id: int,
    
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_episode_by_id(db=db, series_id=series_id, season_number=season_number, episode_id=episode_id)

@app.post("/api/series/{series_id}/seasons/{season_id}/episodes", response_model=_schemas.Episode)
async def create_episode(
    series_id: int,
    season_number: int,
    episode: _schemas.EpisodeCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_episode(db=db, series_id=series_id, season_number=season_number, episode=episode)

@app.put("/api/series/{series_id}/seasons/{season_id}/episodes/{episode_id}", response_model=_schemas.Episode)
async def update_episode(
    series_id: int,
    season_number: int,
    episode_id: int,
    episode: _schemas.EpisodeCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.update_episode(db=db, series_id=series_id, season_number=season_number, episode_id=episode_id, episode=episode)

@app.delete("/api/series/{series_id}/seasons/{season_id}/episode/{episode_id}", status_code=204)
async def delete_episode(
    series_id: int,
    season_number: int,
    episode_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_episode(db=db, series_id=series_id, season_number=season_number, episode_id=episode_id)
    return {"message": "Successfully Deleted"}


#! Movie Section
@app.get("/api/movies", response_model=List[_schemas.Movie])
async def get_movies(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movies(db=db)

@app.get("/api/movies/{movie_id}", response_model=_schemas.Movie)
async def get_movie_by_id(
    movie_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_movie_by_id(db=db, movie_id=movie_id)

@app.post("/api/movies", response_model=_schemas.Movie)
async def create_movie(
    movie: _schemas.MovieCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_movie(db=db, movie=movie)

@app.put("/api/movies/{movie_id}", response_model=_schemas.Movie)
async def update_movie(
    movie_id: int,
    movie: _schemas.MovieCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.update_movie(db=db, movie_id=movie_id, movie=movie)

@app.delete("/api/movie/{movie_id}", status_code=204)
async def delete_movie(
    movie_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_movie(db=db, movie_id=movie_id)
    return {"message", "Successfully Deleted"}


"""
#! Sub Movie = Genre Section
@app.get("/api/genres", response_model=List[_schemas.Genre])
async def get_genre(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_genres(db=db)

@app.get("/api/genres/{genre_id}", response_model=_schemas.Genre)
async def get_genre_by_id(
    genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_genre_by_id(db=db, genre_id=genre_id)

@app.post("/api/genres", response_model=_schemas.Genre)
async def create_genre(
    genre: _schemas.GenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_genre(db=db, genre=genre)

@app.put("/api/genres/{genre_id}", response_model=_schemas.Genre)
async def update_genre(
    genre_id: int,
    genre: _schemas.GenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.update_genre(db=db, genre_id=genre_id, genre=genre)

@app.delete("/api/genre/{genre_id}", status_code=204)
async def delete_genre(
    genre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_genre(db=db, genre_id=genre_id)
    return {"message", "Successfully Deleted"}



#! SubMovie = MovieGenre Section
@app.get("/api/moviegenres", response_model=List[_schemas.MovieGenre])
async def get_moviegenres(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_moviegenres(db=db)

@app.get("/api/moviegenres/{moviegenre_id}", response_model=_schemas.MovieGenre)
async def get_moviegenre_by_id(
    moviegenre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_moviegenre_by_id(db=db, moviegenre_id=moviegenre_id)

@app.post("/api/moviegenres", response_model=_schemas.MovieGenre)
async def create_moviegenre(
    moviegenre: _schemas.MovieGenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_moviegenre(db=db, moviegenre=moviegenre)

@app.put("/api/moviegenres/{moviegenre_id}", response_model=_schemas.MovieGenre)
async def update_moviegenre(
    moviegenre_id: int,
    moviegenre: _schemas.MovieGenreCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.update_moviegenre(db=db, moviegenre_id=moviegenre_id, moviegenre=moviegenre)

@app.delete("/api/moviegenre/{moviegenre_id}", status_code=204)
async def delete_moviegenre(
    moviegenre_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_moviegenre(db=db, moviegenre_id=moviegenre_id)
    return {"message", "Successfully Deleted"}"""

@app.get("/api")
async def root():
    return {"message": "Awesome Netflix"}