class AuthenticateUser:
    def __init__(self, email, password):
        self.email = email #"@netflix.com" 
        self.password = password #"1234"

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password
    

class ContentItem:
    def __init__(self, title, genre, description, url):
        self.title = title
        self.genre = genre
        self.description = description
        self.url = url

class Catagories:
    def __init__(self):
        self.__content_items = []
        self.__content_items.append(ContentItem("The Office", "Comedy", "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.", "https://www.netflix.com/title/70143836"))

    def get_content_items(self):
        return self.__content_items

me = AuthenticateUser('@netflix.com', '1234')
#account = me.AuthenticateUser(email, password)
#me = Catagories()

#content_items = account.get_content_items()

A = Catagories()
content_items = A.get_content_items()

#for item in AuthenticateUser:
#    print(f'{account.email} >> {account.password}')
for item in content_items:
    print(f'Movie : {item.title}\nGenre : {item.genre}\nDescription : {item.description}\nURL : {item.url}')
