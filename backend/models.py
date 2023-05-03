import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)
    user_type = _sql.Column(_sql.String,index=True , default="customer")

    leads = _orm.relationship("Lead", back_populates="owner")
    #subscriptions = _orm.relationship("Subscription", back_populates="user")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Lead(_database.Base):
    __tablename__ = "leads"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String, index=True)
    last_name = _sql.Column(_sql.String, index=True)
    email = _sql.Column(_sql.String, index=True)
    company = _sql.Column(_sql.String, index=True, default="")
    note = _sql.Column(_sql.String, default="")
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    owner = _orm.relationship("User", back_populates="leads")

class Series(_database.Base):
    __tablename__ = "series"
    series_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    title = _sql.Column(_sql.String, index=True)
    description = _sql.Column(_sql.String, index=True)
    release_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    cover_image = _sql.Column(_sql.String, index=True)
    
    seasons = _orm.relationship("Season", back_populates="series", lazy="dynamic")

class Season(_database.Base):
    __tablename__ = "season"
    # id = _sql.Column(_sql.Integer, primary_key=True)
    season_number = _sql.Column(_sql.Integer,primary_key=True, index=True)
    series_id = _sql.Column(_sql.Integer, _sql.ForeignKey("series.series_id"), primary_key=True, index=True)
    release_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    
    series = _orm.relationship("Series", back_populates="seasons")


class Episode(_database.Base):
    __tablename__ = "episodes"
    episode_id = _sql.Column(_sql.Integer,primary_key=True,index=True)
    season_number = _sql.Column(_sql.Integer, _sql.ForeignKey("season.season_number"))
    sereis_id = _sql.Column(_sql.Integer, _sql.ForeignKey("series.series_id"))
    title = _sql.Column(_sql.String,index=True)
    description = _sql.Column(_sql.String,index=True)
    video_url = _sql.Column(_sql.String,index=True)
    thumbnail_url = _sql.Column(_sql.String,index=True)
    release_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)



class Movie(_database.Base):
    __tablename__ = "movies"
    movie_id = _sql.Column(_sql.Integer,primary_key=True,index=True)
    title = _sql.Column(_sql.String,index=True)
    release_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    duration = _sql.Column(_sql.String,index=True)
    rating = _sql.Column(_sql.String,index=True)
    description = _sql.Column(_sql.String,index=True)
    cover_image = _sql.Column(_sql.String,index=True)
    
class Genre(_database.Base):
    __tablename__ = "genres"
    genre_id = _sql.Column(_sql.Integer,primary_key=True,index=True)
    genre_name = _sql.Column(_sql.String,index=True)
    
class MovieGenre(_database.Base):
    __tablename__ = "movie_genres"
    movie_genre_id = _sql.Column(_sql.Integer,primary_key=True,index=True)
    movie_id = _sql.Column(_sql.Integer, _sql.ForeignKey("movies.movie_id"))
    genre_id = _sql.Column(_sql.Integer, _sql.ForeignKey("genres.genre_id"))
    
