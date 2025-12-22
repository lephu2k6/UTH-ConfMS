class DeleteConferenceService:
    def __init__(self, conference_repo):
        self.conference_repo = conference_repo

    async def execute(self, conference_id: int):
        # Đây là logic xóa, bạn có thể điều chỉnh tùy theo repo của mình
        return await self.conference_repo.delete(conference_id)