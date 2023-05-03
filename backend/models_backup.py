class Content(_database.Base):
    __tablename__ = "contents"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    
    series = _orm.relationship("Series", back_populates="content")

class Series(_database.Base):
    __tablename__ = "series"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    content_id = _sql.Column(_sql.Integer, _sql.ForeignKey("contents.id"))
    season_no = _sql.Column(_sql.Integer, primary_key=True, index=True)
    description = _sql.Column(_sql.String, index=True, unique=True)
    rating = _sql.Column(_sql.Integer, index=True)
    trailer = _sql.Column(_sql.String, index=True, unique=True)

    content = _orm.relationship("Content", back_populates="series")
    seasons = _orm.relationship("Season", back_populates="series")


class Season(_database.Base):
    __tablename__ = "seasons"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    series_id = _sql.Column(_sql.Integer, _sql.ForeignKey("series.id"))
    season_no = _sql.Column(_sql.Integer, index=True)
    section_name = _sql.Column(_sql.String, index=True)

    series = _orm.relationship("Series", back_populates="seasons")
    sections = _orm.relationship("Section", back_populates="season")


class Section(_database.Base):
    __tablename__ = "sections"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    season_id = _sql.Column(_sql.Integer, _sql.ForeignKey("seasons.id"))
    name = _sql.Column(_sql.String, index=True)

    season = _orm.relationship("Season", back_populates="sections")

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
    catagory_name = _sql.Column(_sql.String,primary_key=True,index=True)


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
    
    
    

"""class Customer(_database.Base):
    __tablename__ = "customer"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    subscriptions = _orm.relationship("Subscription", back_populates="customer")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Subscription(_database.Base):
    __tablename__ = "subscription"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    customer_id = _sql.Column(_sql.Integer, _sql.ForeignKey("customer.id"))
    package_expired_date = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    
    customer = _orm.relationship("Customer", back_populates="subscriptions")
"""