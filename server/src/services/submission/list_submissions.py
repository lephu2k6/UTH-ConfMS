class ListSubmissionsService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self):
        return self.repo.get_all()
