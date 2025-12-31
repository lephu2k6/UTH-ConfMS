"""Add schema updates: add password_hash, avatar_url, last_login, history_logs action/ip_address, and submission extra fields

Revision ID: d7a5c9b8e3f4
Revises: ca0038b2dfaa
Create Date: 2025-12-31 17:40:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers
revision: str = 'd7a5c9b8e3f4'
down_revision: Union[str, Sequence[str], None] = 'ca0038b2dfaa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add columns to users
    op.add_column('users', sa.Column('password_hash', sa.String(), nullable=True, index=True))
    op.add_column('users', sa.Column('avatar_url', sa.String(), nullable=True))
    op.add_column('users', sa.Column('last_login', sa.DateTime(), nullable=True))

    # Backfill password_hash from existing hashed_password
    op.execute("""
    UPDATE users SET password_hash = hashed_password WHERE password_hash IS NULL
    """)

    # Add columns to history_logs
    op.add_column('history_logs', sa.Column('action', sa.String(), nullable=True))
    op.add_column('history_logs', sa.Column('ip_address', sa.String(), nullable=True))

    # Add columns to submissions
    op.add_column('submissions', sa.Column('type', sa.String(), nullable=True))
    op.add_column('submissions', sa.Column('file_version', sa.Integer(), nullable=True))
    op.add_column('submissions', sa.Column('decision', sa.String(), nullable=True))
    op.add_column('submissions', sa.Column('final_score', sa.Numeric(19, 2), nullable=True))


def downgrade() -> None:
    # Reverse added columns
    op.drop_column('submissions', 'final_score')
    op.drop_column('submissions', 'decision')
    op.drop_column('submissions', 'file_version')
    op.drop_column('submissions', 'type')

    op.drop_column('history_logs', 'ip_address')
    op.drop_column('history_logs', 'action')

    op.drop_column('users', 'last_login')
    op.drop_column('users', 'avatar_url')
    op.drop_column('users', 'password_hash')
