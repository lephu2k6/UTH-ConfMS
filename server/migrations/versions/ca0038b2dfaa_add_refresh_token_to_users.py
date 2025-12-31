"""add_refresh_token_to_users

Revision ID: ca0038b2dfaa
Revises: 59deb36d21f5
Create Date: 2025-12-12 22:06:58.525594

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa



revision: str = 'ca0038b2dfaa'
down_revision: Union[str, Sequence[str], None] = '59deb36d21f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('refresh_token_hash', sa.String(255), nullable=True, index=True))
    op.add_column('users', sa.Column('refresh_token_expires_at', sa.DateTime, nullable=True))
def downgrade() -> None:
    op.drop_column('users', 'refresh_token_expires_at')
    op.drop_column('users', 'refresh_token_hash')
