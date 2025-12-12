class User:
    def __init__(self, id: int, full_name: str, email: str, hashed_password: str, role: str = "author"):
        self.id = id
        self.full_name = full_name
        self.email = email
        self.hashed_password = hashed_password
        self.role = role
