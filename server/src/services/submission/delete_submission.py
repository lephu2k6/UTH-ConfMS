class DeleteSubmissionService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self, submission_id: int):
        self.repo.delete(submission_id)
        return True
