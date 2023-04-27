import datetime

class MeetingScheduler :
    def __init__(self) -> None: #เก็บ objectของระบบ 
        self.__meeting_room_list = [] #listของ meeting room
        self.__user_list = [] #listของ user
        
    def add_room(self, room): #เอาข้อมูลไปใส่ในadd_room
        self.__meeting_room_list.append(room) #methodแอดห้อง
        
    def add_user(self, user): #เอาข้อมูล user ไปเก็บ
        self.__user_list.append(user)
        
    def get_available_room(self,st_d,st_t,end_d,end_t, capacity):#st_d = StartDate st_t = StartTime
        date1 = datetime.datetime.strptime(st_d + " " + st_t, '%d-%m-%Y %H:%M')
        date2 = datetime.datetime.strptime(end_d + " " + end_t, '%d-%m-%Y %H:%M') #แปลงdate time เป็นของ python
        
        available_room = []
        for i in self.__meeting_room_list:  #ให้เอาข้อมูลทุกห้องมา
            if not i.is_available():          #ถ้าเป็น No จะข้ามห้องนั้นไป
                continue                    
            if i.capacity < capacity :     #ถ้าความจุห้องน้อยกว่าที่มีอยู่ให้ข้ามห้องไปเลย
                continue
            if not i.room_availble(date1,date2):
                continue
            available_room.append(i)
        return available_room
    
    def list_room(self) : #เช็คว่าเก็บค่าไปรึยัง
        for i in self.__meeting_room_list: #เช็คว่ามีข้อมูลไหมในแต่ละห้อง
            print(i) #แสดงผล 

class User:
    def __init__(self,name) -> None:#user เก็บแค่ name
        self.name = name
        
class MeetingRoom:
    def __init__(self,capacity,id) -> None: #ห้องนี้มีความจุเท่าไหร่และชื่อห้อง
        self.__capacity = capacity
        self.__id = id
        self.__is_available = True #ตั้งค่าเบื้องต้นว่ามีห้องว่างอยู่
        self.__interval_list = [] #เก็บ ช่วงเวลา
        
    def is_available(self): #เช็คว่ามีห้องว่างหรือไม่
        return self.__is_available #สั่งให้returnค่ากลับไป
    
    @property
    def capacity(self) :
        return self.__capacity #ดึงข้อมูลความจุห้อง
    
    def add_interval(self, interval): #เอาข้อมูล interval ใส่เข้าไป
        self.__interval_list.append(interval)
    
    def check_no_overlap(self, st_1, end_t1, st_2, end_t2):#เช็คเวลา
        if st_1 > end_t2 or st_2 > end_t1: #เช็คว่าเวลามันมากเกินไปมั้ย
            return True     #ถ้ามากไปให้return True
        else:
            return False
        
    def room_available(self, date1,date2) : #ส่งparameter มา2ตัว
        for i in self.__interval_list: #เช็คว่ามีตัวไหนทับกันมั้ย
            if not self.check_no_overlap(i.get_start_time(),i.get_end_time(),date1,date2 ): #ถ้าเช็คnot แล้ว return false
                return False
            return True
            
    def __str__(self):
        return (f"room id {self.__id}) capacity {self.__capacity}")

class interval:
    def __init__(self, start_time, end_time) -> None:#interval เก็บstart end time
        self.__start_time = start_time
        self.__end_time = end_time
        
    def get_start_time(self):   
        return self.__start_time
    
    def get_end_time(self):            #ดึงค่า start end time
        return self.__end_time
    
meet = MeetingScheduler()
for i in range(10):
    room_id = i+1
    room_capacity = (i+1) * 10
    meet.add_room(MeetingRoom(room_id, room_capacity)) 
john = User("John")
meet.add_room(john)

a_room = meet.get_available_room("26-03-2023","09:00","26-03-2023","16:00",30)
for i in a_room:
    print(i)