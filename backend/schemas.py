import datetime as _dt

import pydantic as _pydantic
from typing import List, Optional


class _UserBase(_pydantic.BaseModel):
    email: str

class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True

class User(_UserBase):
    id: int
    user_type: str  # admin, customer, guest
    class Config:
        orm_mode = True


class _LeadBase(_pydantic.BaseModel):
    first_name: str
    last_name: str
    email: str
    company: str
    note: str


class LeadCreate(_LeadBase):
    pass


class Lead(_LeadBase):
    id: int
    owner_id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime

    class Config:
        orm_mode = True


#! TVSeries BASE
class _SeriesBase(_pydantic.BaseModel):
    title: str
    description: Optional[str] = None
    release_date: Optional[_dt.datetime] = None
    cover_image: Optional[str] = None

class SeriesCreate(_SeriesBase):
    pass

class Series(_SeriesBase):
    series_id: int
    class Config:
        orm_mode = True

#* Season BASE
class _SeasonBase(_pydantic.BaseModel):
    title: str
    release_date: Optional[_dt.datetime] = None
    series_id: int

class SeasonCreate(_SeasonBase):
    pass

class Season(_SeasonBase):
    season_id: int
    class Config:
        orm_mode = True    

#? Episode BASE
class _EpisodeBase(_pydantic.BaseModel):
    title: str
    description: Optional[str] = None
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    release_date: Optional[_dt.datetime] = None
    season_id: int

class EpisodeCreate(_EpisodeBase):
    pass

class Episode(_EpisodeBase):
    episode_id: int
    class Config:
        orm_mode = True

#! MOVIE BASE
class _MovieBase(_pydantic.BaseModel):
    title: str
    release_date: Optional[_dt.datetime] = None
    duration: Optional[int] = None
    rating: Optional[int] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None
    video_url: Optional[str] = None

class MovieCreate(_MovieBase):
    pass

class Movie(_MovieBase):
    movie_id: int
    class Config:
        orm_mode = True
        
class _GenreBase(_pydantic.BaseModel):
    genre_name: str

class GenreCreate(_GenreBase):
    pass

class Genre(_GenreBase):
    genre_id: int
    class Config:
        orm_mode = True

class _MovieGenreBase(_pydantic.BaseModel):
    movie_id: int
    genre_id: int

class MovieGenreCreate(_MovieGenreBase):
    pass

class MovieGenre(_MovieGenreBase):
    movie_genre_id: int
    class Config:
        orm_mode = True    