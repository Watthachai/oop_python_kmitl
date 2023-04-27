import sqlalchemy.orm as _orm
import database as _database, models as _models


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
async def get_user_by_email(email:str, db:_orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()