import fastapi as _fastapi
import fastapi.security as _security
from fastapi import HTTPException
import jwt as _jwt
import datetime as _dt
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database, models as _models, schemas as _schemas



oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "myjwtsecret"


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: _orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)

    token = _jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema),
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )

    return _schemas.User.from_orm(user)


async def create_lead(user: _schemas.User, db: _orm.Session, lead: _schemas.LeadCreate):
    lead = _models.Lead(**lead.dict(), owner_id=user.id)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return _schemas.Lead.from_orm(lead)


async def get_leads(user: _schemas.User, db: _orm.Session):
    leads = db.query(_models.Lead).filter_by(owner_id=user.id)

    return list(map(_schemas.Lead.from_orm, leads))


async def _lead_selector(lead_id: int, user: _schemas.User, db: _orm.Session):
    lead = (
        db.query(_models.Lead)
        .filter_by(owner_id=user.id)
        .filter(_models.Lead.id == lead_id)
        .first()
    )

    if lead is None:
        raise _fastapi.HTTPException(status_code=404, detail="Lead does not exist")

    return lead


async def get_lead(lead_id: int, user: _schemas.User, db: _orm.Session):
    lead = await _lead_selector(lead_id=lead_id, user=user, db=db)

    return _schemas.Lead.from_orm(lead)


async def delete_lead(lead_id: int, user: _schemas.User, db: _orm.Session):
    lead = await _lead_selector(lead_id, user, db)

    db.delete(lead)
    db.commit()

async def update_lead(lead_id: int, lead: _schemas.LeadCreate, user: _schemas.User, db: _orm.Session):
    lead_db = await _lead_selector(lead_id, user, db)

    lead_db.first_name = lead.first_name
    lead_db.last_name = lead.last_name
    lead_db.email = lead.email
    lead_db.company = lead.company
    lead_db.note = lead.note
    lead_db.date_last_updated = _dt.datetime.utcnow()

    db.commit()
    db.refresh(lead_db)

    return _schemas.Lead.from_orm(lead_db)


#! Series Section
async def create_series(db: _orm.Session, series: _schemas.SeriesCreate):
    series = _models.Series(**series.dict())
    db.add(series)
    db.commit()
    db.refresh(series)
    return _schemas.Series.from_orm(series)


async def get_series(db: _orm.Session):
    series = db.query(_models.Series)

    return list(map(_schemas.Series.from_orm, series))


async def get_series_by_id(series_id: int, db: _orm.Session):
    series = db.query(_models.Series).filter(_models.Series.series_id == series_id).first()

    if series is None:
        raise _fastapi.HTTPException(status_code=404, detail="Series does not exist")

    return _schemas.Series.from_orm(series)


async def delete_series(series_id: int, db: _orm.Session):
    series = db.query(_models.Series).filter(_models.Series.series_id == series_id).first()

    if series is None:
        raise _fastapi.HTTPException(status_code=404, detail="Series does not exist")

    db.delete(series)
    db.commit()
    
    
async def update_series(series_id: int, series: _schemas.SeriesCreate, db: _orm.Session):
    series_db = db.query(_models.Series).filter(_models.Series.series_id == series_id).first()

    if series_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Series does not exist")

    series_db.title = series.title
    series_db.description = series.description
    series_db.release_date = series.release_date
    series_db.cover_image = series.cover_image

    db.commit()
    db.refresh(series_db)

    return _schemas.Series.from_orm(series_db)


#* Season Section
async def create_season(db: _orm.Session, season: _schemas.SeasonCreate):
    season = _models.Season(**season.dict())
    db.add(season)
    db.commit()
    db.refresh(season)
    return _schemas.Season.from_orm(season)


async def get_seasons(db: _orm.Session):
    seasons = db.query(_models.Season)

    return list(map(_schemas.Season.from_orm, seasons))


async def get_season_by_id(season_id: int, db: _orm.Session):
    season = db.query(_models.Season).filter(_models.Season.season_id == season_id).first()

    if season is None:
        raise _fastapi.HTTPException(status_code=404, detail="Season does not exist")

    return _schemas.Season.from_orm(season)


async def delete_season(season_id: int, db: _orm.Session):
    season = db.query(_models.Season).filter(_models.Season.season_id == season_id).first()

    if season is None:
        raise _fastapi.HTTPException(status_code=404, detail="Season does not exist")

    db.delete(season)
    db.commit()
    
    
async def update_season(season_id: int, season: _schemas.SeasonCreate, db: _orm.Session):
    season_db = db.query(_models.Season).filter(_models.Season.season_id == season_id).first()

    if season_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Season does not exist")

    season_db.title = season.title
    season_db.release_date = season.release_date
    season_db.series_id = season.series_id

    db.commit()
    db.refresh(season_db)

    return _schemas.Season.from_orm(season_db)


#? Episode Section
async def create_episode(db: _orm.Session, episode: _schemas.EpisodeCreate):
    episode = _models.Episode(**episode.dict())
    db.add(episode)
    db.commit()
    db.refresh(episode)
    return _schemas.Episode.from_orm(episode)


async def get_episodes(db: _orm.Session):
    episodes = db.query(_models.Episode)

    return list(map(_schemas.Episode.from_orm, episodes))


async def get_episode_by_id(episode_id: int, db: _orm.Session):
    episode = db.query(_models.Episode).filter(_models.Episode.episode_id == episode_id).first()

    if episode is None:
        raise _fastapi.HTTPException(status_code=404, detail="Episode does not exist")

    return _schemas.Episode.from_orm(episode)


async def delete_episode(episode_id: int, db: _orm.Session):
    episode = db.query(_models.Episode).filter(_models.Episode.episode_id == episode_id).first()

    if episode is None:
        raise _fastapi.HTTPException(status_code=404, detail="Episode does not exist")

    db.delete(episode)
    db.commit()
    

async def update_episode(episode_id: int, episode: _schemas.EpisodeCreate, db: _orm.Session):
    episode_db = db.query(_models.Episode).filter(_models.Episode.episode_id == episode_id).first()

    if episode_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Episode does not exist")

    episode_db.title = episode.title
    episode_db.description = episode.description
    dpisode_db.video_url = episode.video_url
    episode_db.thumbnail_url = episode.thumbnail_url
    episode_date.release_date = episode.release_date
    episode_db.season_id = episode.season_id

    db.commit()
    db.refresh(episode_db)

    return _schemas.Episode.from_orm(episode_db)


#! Movie Section
async def create_movie(db: _orm.Session, movie: _schemas.MovieCreate):
    movie = _models.Movie(**movie.dict())
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return _schemas.Movie.from_orm(movie)

async def get_movies(db: _orm.Session):
    movies = db.query(_models.Movie)

    return list(map(_schemas.Movie.from_orm, movies))

async def get_movie_by_id(movie_id: int, db: _orm.Session):
    movie = db.query(_models.Movie).filter(_models.Movie.movie_id == movie_id).first()

    if movie is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie does not exist")

    return _schemas.Movie.from_orm(movie)

async def delete_movie(movie_id: int, db: _orm.Session):
    movie = db.query(_models.Movie).filter(_models.Movie.movie_id == movie_id).first()

    if movie is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie does not exist")

    db.delete(movie)
    db.commit()
    
async def update_movie(movie_id: int, movie: _schemas.MovieCreate, db: _orm.Session):
    movie_db = db.query(_models.Movie).filter(_models.Movie.movie_id == movie_id).first()

    if movie_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie does not exist")

    movie_db.title = movie.title
    movie_db.description = movie.description
    movie_db.cover_image = movie.cover_image
    movie_db.video_url = movie.video_url

    db.commit()
    db.refresh(movie_db)

    return _schemas.Movie.from_orm(movie_db)


#* Genre Section
async def create_genre(db: _orm.Session, genre: _schemas.GenreCreate):
    genre = _models.Genre(**genre.dict())
    db.add(genre)
    db.commit()
    db.refresh(genre)
    return _schemas.Genre.from_orm(genre)

async def get_genres(db: _orm.Session):
    genres = db.query(_models.Genre)

    return list(map(_schemas.Genre.from_orm, genres))

async def get_genre_by_id(genre_id: int, db: _orm.Session):
    genre = db.query(_models.Genre).filter(_models.Genre.genre_id == genre_id).first()

    if genre is None:
        raise _fastapi.HTTPException(status_code=404, detail="Genre does not exist")

    return _schemas.Genre.from_orm(genre)

async def delete_genre(genre_id: int, db: _orm.Session):
    genre = db.query(_models.Genre).filter(_models.Genre.genre_id == genre_id).first()

    if genre is None:
        raise _fastapi.HTTPException(status_code=404, detail="Genre does not exist")

    db.delete(genre)
    db.commit()
    
async def update_genre(genre_id: int, genre: _schemas.GenreCreate, db: _orm.Session):
    genre_db = db.query(_models.Genre).filter(_models.Genre.genre_id == genre_id).first()

    if genre_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Genre does not exist")

    genre_db.genre_name = genre.genre_name

    db.commit()
    db.refresh(genre_db)

    return _schemas.Genre.from_orm(genre_db)

async def get_genre_by_name(genre_name: str, db: _orm.Session):
    genre = db.query(_models.Genre).filter(_models.Genre.genre_name == genre_name).first()

    if genre is None:
        raise _fastapi.HTTPException(status_code=404, detail="Genre does not exist")

    return _schemas.Genre.from_orm(genre)


#? Movie Genre Section
async def create_movie_genre(db: _orm.Session, movie_genre: _schemas.MovieGenreCreate):
    movie_genre = _models.MovieGenre(**movie_genre.dict())
    db.add(movie_genre)
    db.commit()
    db.refresh(movie_genre)
    return _schemas.MovieGenre.from_orm(movie_genre)

async def get_movie_genres(db: _orm.Session):
    movie_genres = db.query(_models.MovieGenre)

    return list(map(_schemas.MovieGenre.from_orm, movie_genres))

async def get_movie_genre_by_id(movie_genre_id: int, db: _orm.Session):
    movie_genre = db.query(_models.MovieGenre).filter(_models.MovieGenre.movie_genre_id == movie_genre_id).first()

    if movie_genre is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie Genre does not exist")

    return _schemas.MovieGenre.from_orm(movie_genre)

async def delete_movie_genre(movie_genre_id: int, db: _orm.Session):
    movie_genre = db.query(_models.MovieGenre).filter(_models.MovieGenre.movie_genre_id == movie_genre_id).first()

    if movie_genre is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie Genre does not exist")

    db.delete(movie_genre)
    db.commit()
    
async def update_movie_genre(movie_genre_id: int, movie_genre: _schemas.MovieGenreCreate, db: _orm.Session):
    movie_genre_db = db.query(_models.MovieGenre).filter(_models.MovieGenre.movie_genre_id == movie_genre_id).first()

    if movie_genre_db is None:
        raise _fastapi.HTTPException(status_code=404, detail="Movie Genre does not exist")

    movie_genre_db.movie_id = movie_genre.movie_id
    movie_genre_db.genre_id = movie_genre.genre_id

    db.commit()
    db.refresh(movie_genre_db)

    return _schemas.MovieGenre.from_orm(movie_genre_db)
