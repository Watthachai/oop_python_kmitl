#### Start Field of data ####

#### END Field of data ####

class UserAccount:
    def __init__(self, email, password):
        self.email = email
        self.password = password
class PaymentMethod:
    def __init__(self, transaction_id, firstname, lastname, cvv, card_number, expire_date):
        self.transaction_id = transaction_id
        self.firstname = firstname
        self.lastname = lastname
        self.cvv = cvv
        self.card_number = card_number
        self.expire_date = expire_date


class Movies:
    def __init__(self, movie_id, movie_name, year, rating, lenght, description,  cast, genres, movie_category, poster):
        self.movie_id = movie_id
        self.movie_name = movie_name
        self.year =     year
        self.rating = rating
        self.lenght = lenght
        self.description = description
        self.cast = cast
        self.genres = genres
        self.movie_category = movie_category
        self.poster = poster


class MovieSeries:
    def __init__(self, series_id, series_name, year, rating, lenght, description,  cast, genres, movie_category, poster):
        self.series_id = series_id
        self.series_name = series_name
        self.year =     year
        self.rating = rating
        self.lenght = lenght
        self.description = description
        self.cast = cast
        self.genres = genres
        self.movie_category = movie_category
        self.poster = poster
