class DuplicateUserError(Exception):
    """Raised when attempting to create a user with an existing email."""


class AuthenticationError(Exception):
    """Raised when authentication fails."""


class InitialChairExistsError(Exception):
    """Raised when trying to create an initial chair while one already exists."""


class NotFoundError(Exception):
    """Raised when a requested resource is not found."""


class BusinessRuleException(Exception):
    """Raised when a business rule is violated."""


