from pathlib import Path
import sys
import pytest

# Ensure the project `src` folder is on sys.path so imports like `services` work
ROOT = Path(__file__).resolve().parents[1]  # server/src
sys.path.insert(0, str(ROOT))


@pytest.fixture
def cleanup_registry():
    """Provide a registry for tests to register cleanup callables.

    Tests can call `cleanup_registry()(callable, *args, **kwargs)` to register
    cleanup actions that will run after the test session.
    """
    calls = []

    def register(fn, *args, **kwargs):
        calls.append((fn, args, kwargs))

    yield register

    # Execute cleanups in reverse order; ignore errors to avoid masking test failures
    for fn, args, kwargs in reversed(calls):
        try:
            fn(*args, **kwargs)
        except Exception:
            pass
