"""merge multiple heads

Revision ID: f9a1b2c3d4e5
Revises: 51754f4127ce, d7a5c9b8e3f4
Create Date: 2025-12-31 17:50:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'f9a1b2c3d4e5'
down_revision: Union[str, Sequence[str], None] = ('51754f4127ce', 'd7a5c9b8e3f4')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # This is a merge revision to unify two heads. No schema changes required.
    pass


def downgrade() -> None:
    # Nothing to undo here.
    pass
