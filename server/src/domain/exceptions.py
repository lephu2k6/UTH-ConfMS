class DuplicateUserError(Exception):
    """Raised when attempting to create a user with an existing email."""


class AuthenticationError(Exception):
    """Raised when authentication fails."""


class InitialChairExistsError(Exception):
    """Raised when trying to create an initial chair while one already exists."""


class UserNotFoundError(Exception):
    """Raised when a user is not found."""


class InvalidUserOperationError(Exception):
    """Raised when attempting an invalid user operation."""

