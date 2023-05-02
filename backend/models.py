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

    leads = _orm.relationship("Lead", back_populates="owner")
    subscriptions = _orm.relationship("Subscription", back_populates="user")

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

class Content(_database.Base):
    __tablename__ = "contents"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    catagory_id = _sql.Column(_sql.String, index=True)
    
    series = _orm.relationship("Series", back_populates="Catagory")

class Series(_database.Base):
    __tablename__ = "series"
    id = _sql.Column(_sql.Integer, unique=True, index=True)
    series_id = _sql.Column(_sql.Integer, _sql.ForeignKey("content.catagory_id"))
    season_no = _sql.Column(_sql.Integer, primary_key=True, index=True)
    discription = _sql.Column(_sql.String,unique=True,index=True)
    rating = _sql.Column(_sql.Integer, primary_key=True, index=True)
    trailer = _sql.Column(_sql.String,unique=True,index=True)

class Season(_database.Base):
    __tablename__ = "season"
    season_no = _sql.Column(_sql.Integer, primary_key=True, index=True)

    series = _orm.relationship("Season", back_populates="series.series_id")

class Section(_database.Base):
    __tablename__ = "Section"
    name_series = _sql.Column(_sql.String, unique= True, index=True)
    series = _orm.relationship("Section", back_populates="season.season_no")

class Movie(_database.Base):
    __tablename__ = "movie"
    id_movie = _sql.Column(_sql.Integer,unique=True,index=True)
    name_movie = _sql.Column(_sql.String,unique=True,index=True)
    movie_length = _sql.Column(_sql.Integer,primary_key=True,index=True)
    description = _sql.Column(_sql.String,primary_key=True,index=True)
    actor = _sql.Column(_sql.String,primary_key=True,index=True)
    trailer = _sql.Column(_sql.String,primary_key=True,index=True)
    rating = _sql.Column(_sql.Integer,primary_key=True,index=True)

class Payment(_database.Base):
    __tablename__ = "payment"
    billing_no = _sql.Column(_sql.Integer,primary_key=True,index=True)
    amount = _sql.Column(_sql.Float,index=True)
    payment_method = _sql.Column(_sql.String,index=True)
    card_number = _sql.Column(_sql.String,index=True)
    ex_date_card = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    cvv = _sql.Column(_sql.String,index=True)
    first_name = _sql.Column(_sql.String,index=True)
    last_name = _sql.Column(_sql.String,index=True)


class Catagory(_database.Base):
    __tablename__ = "catagory"
    catagory_id = _sql.Column(_sql.Integer,primary_key=True,index=True)
    data_base = _sql.Column(_sql.String,unique=True,index=True)


class Admin(_database.Base):
    __tablename__ = "admin"
    email = _sql.Column(_sql.String,primary_key=True,index=True)
    password = _sql.Column(_sql.String,unique=True,index=True)
    phone_number = _sql.Column(_sql.String,unique=True,index=True)


class Subscription(_database.Base):
    __tablename__ = "subscription"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    package_type = _sql.Column(_sql.String, index=True)
    price = _sql.Column(_sql.Integer, index=True)
    package_detail = _sql.Column(_sql.String)
    package_ex_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    user = _orm.relationship("User", back_populates="subscriptions")