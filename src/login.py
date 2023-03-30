from register import *

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password

class Authentication:
    def __init__(self):
        self.__users = []
    
    def register(self, email, password):
        user = User(email, password)
        self.__users.append(user)
    
    def login(self, email, password):
        for user in self.__users:
            if user.email == email and user.password == password:
                print(f'Welcome back, {email}!')
                return True
        print('Ouch!! Invalid Email or Paswword please check!')
        return False

auth = Authentication()
#auth.register("admin@netflix.com", "1234")
#auth.register("user@gmail.com", "1234")

email = input('Enter your e-mail: ')
password = input('Enter your password: ')

auth.login(email, password)

"""class User:
    def __init__(self):
        self.__users = []
    
    def register(self, email, password):
        for account in self.__users:
            if email in account:
                print('User already exists!')
                return False
        self.__users.append([email, password])
        print(f'User {email} created successfully!')
        return True

user = User()
email = input('Enter your e-mail: ')
password = input('Enter your password: ')
user.register(email, password)"""
