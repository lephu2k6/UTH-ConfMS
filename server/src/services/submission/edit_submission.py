class EditSubmissionService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self, submission_id: int, data: dict):
        return self.repo.update(submission_id, data)
