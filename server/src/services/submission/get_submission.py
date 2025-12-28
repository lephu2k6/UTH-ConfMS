class GetSubmissionService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self, submission_id: int):
        return self.repo.get_by_id(submission_id)
