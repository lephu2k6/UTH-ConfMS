
class CreateSubmissionService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self, **kwargs):
        return self.repo.create(kwargs)