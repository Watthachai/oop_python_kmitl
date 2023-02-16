class Account: #! This is a superclass
    def __init__(self, email, password, account_status, phone_number):
        self.email = email
        self.password = password
        self.account_status = account_status
        self.phone_number = phone_number

class PaymentMethod: #! This is a superclass
    def __init__(self, payment_type, bill_no, bill_date, bill_status):
        self.payment_type = payment_type
        self.billno = bill_no
        self.bill_date = bill_date
        self.bill_status = bill_status

class WatchList:
    def __init__(self, watchlist_id, watchlist_name, watchlist_date):
        self.watchlist_id = watchlist_id
        self.watchlist_name = watchlist_name
        self.watchlist_date = watchlist_date
class Watched:
    def __init__(self, watched_id, watched_name, watched_date):
        self.watched_id = watched_id
        self.watched_name = watched_name
        self.watched_date = watched_date
        
class Category():
    def __init__(self, category_id, category_name):
        self.category_id = category_id
        self.category_name = category_name
        
class Content(Category):
    def __init__(self, content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, \
        content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer, category_id, category_name):
        Category.__init__(category_id, category_name)
        self.content_id = content_id
        self.content_name = content_name
        self.content_detail = content_detail
        self.content_release_date = content_release_date
        self.content_rating = content_rating
        self.content_qualification = content_qualification
        self.content_genre = content_genre
        self.content_category = content_category
        self.content_cast = content_cast
        self.content_date_added = content_date_added
        self.content_view_count = content_view_count
        self.content_trailer = content_trailer
class Series(Content):
    def __init__(self, num_chapters, num_season, content_id, content_name, content_detail, content_release_date, content_rating, \
        content_qualification, content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer):
        Content.__init__(content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, \
            content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer)
        self.num_chapters = num_chapters
        self.num_season = num_season

class Flims(Content):
    def __init__(self, flim_length, content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, \
        content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer):
        Content.__init__(content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, content_genre, \
            content_category, content_cast, content_date_added, content_view_count, content_trailer)
        self.flim_length = flim_length

class Category(Content):
    def __init__(self, category_id, category_name, content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, \
        content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer):
        Content.__init__(content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, content_genre, \
            content_category, content_cast, content_date_added, content_view_count, content_trailer)
        self.category_id = category_id
        self.category_name = category_name
        
class Season(Series):
    def __init__(self, season_number, num_chapters, num_season, content_id, content_name, content_detail, content_release_date, content_rating, \
        content_qualification, content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer):
        super().__init__(num_chapters, num_season, content_id, content_name, content_detail, content_release_date, content_rating, \
            content_qualification, content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer)
        self.season_number = season_number

class Chapter(Series):
    def __init__(self, chapter_number, chapter_title, chapter_duration, num_chapters, num_season, content_id, content_name, content_detail, \
        content_release_date, content_rating, content_qualification, content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer):
        super().__init__(num_chapters, num_season, content_id, content_name, content_detail, content_release_date, content_rating, content_qualification, \
            content_genre, content_category, content_cast, content_date_added, content_view_count, content_trailer)
        self.chapter_number = chapter_number
        self.chapter_title = chapter_title
        self.chapter_duration = chapter_duration
class Admin(Account): #! This is a subclass of Account
    def __init__(self, email, password, account_status, phone_number):
        Account.__init__(email, password, account_status, phone_number)

class Customer(Account, PaymentMethod, Watched, WatchList): #! This is a subclass of Account and PaymentMethod
    def __init__(self, email, password, account_status, phone_number, plan_detail, payment_detail, payment_type, bill_no, \
        bill_date, bill_status, watchlist_id, watchlist_name, watchlist_date, watched_id, watched_name, watched_date):
        Account.__init__(email, password, account_status, phone_number)
        PaymentMethod.__init__(payment_type, bill_no, bill_date, bill_status)
        WatchList.__init__(watchlist_id, watchlist_name, watchlist_date)
        Watched.__init__(watched_id, watched_name, watched_date)
        self.plan_detail = plan_detail
        self.payment_detail = payment_detail
