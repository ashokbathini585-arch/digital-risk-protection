from pydantic import BaseModel


class SocialAccount(BaseModel):
    platform: str
    username: str
    display_name: str
    bio: str
    followers: int = 0
    verified: bool = False
    