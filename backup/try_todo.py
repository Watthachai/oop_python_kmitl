import datetime

class MeetingScheduler:
    def __init__(self) -> None:
        self.__meeting_room_list = []
        self.__user_list = []
        
    def add_room(self, room):
        self.__meeting_room_list.append(room)
        
    def add_user(self, user):
        self.__user_list.append(user)
    
    def get_available_room(self, st_date, st_time, end_date, end_time, capacity):
        date1 = datetime.datetime.strptime(st_date + " " + st_time, '%d-%m-%Y %H:%M')
        date2 = datetime.datetime.strptime(end_date + " " + end_time, '%d-%m-%Y %H:%M')
        
        available_room =  []
        for i in self.__meeting_room_list:
            if not i.is_available():
                continue
            if i.capacity < capacity:
                continue
            if not i.room_available(date1, date2):
                continue
            available_room.append(i)
        return available_room
    
    def list_room(self):
        for i in self.__meeting_room_list:
            print(i)
            
class User:
    def __init__(self, name) -> None:
        self.name =  name
        
class MeetingRoom:
    def __init__(self, id, capacity) ->  None:
        self.__id = id
        self.__capacity = capacity
        self.__is_available = True
        self.__interval_list = []
        
    def is_available(self):
        return self.__is_available
    
    @property
    def capacity(self):
        return self.__capacity
    
    def add_interval(self, interval):
        self.__interval_list.append(interval)
    
    def check_no_overlap(self, st1, end_t1, st2, end_t2):
        if st1 > end_t2 or st2 > end_t1:
            return True
        else: 
            return False
    
    def room_available(self, date1, date2):
        for i in self.__interval_list:
            if not self.check_no_overlap(i.get_start_time(), i.get_end_time(), date1, date2):
                return False
        return True
    
    def __str__(self):
        return(f'Room ID {self.__id}, Capacity {self.__capacity}')
        
class Interval:
    def __init__(self, start_time, end_time):
        self.__start_time = start_time
        self.__end_time = end_time
        
    def get_start_time(self):
        return self.__start_time
    
    def get_end_time(self):
        return self.__end_time

meet =  MeetingScheduler()
for i in range(10):
    room_id = i+1
    room_capacity = (i+1) * 10
    meet.add_room(MeetingRoom(room_id, room_capacity))

watthachai = User("Watthachai")
meet.add_user(watthachai)

a_room =  meet.get_available_room("26-03-2023", "09:00", "26-03-2023", "16:00", 30)
for i in a_room:
    print(i)
    