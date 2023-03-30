class User:
    users = []

    def register(self, email, password):
        for account in self.users:
            if email in account.values():
                print('This email already exists!')
                return False
        self.users.append({'email': email, 'password': password})
        print(f'User: {email} and password: {password} created successfully!')
        return True

class Registration:
    def __init__(self):
        self.__users = User.users
    
    def register(self, email, password):
        user = User()
        return user.register(email, password)

    def is_available(self, email):
        for account in self.__users:
            if email in account.values():
                print('This email already exists!')
                return False
        return True
    

regis = Registration()

email = input('Enter your e-mail: ')
password = input('Enter your password: ')
regis.register(email, password)
email = input('Enter your e-mail: ')
password = input('Enter your password: ')
regis.register(email, password)
email = input('Enter your e-mail: ')
password = input('Enter your password: ')
regis.register(email, password)


test = User()
print(test.users)
