import os
from typing import Tuple

from fastapi.staticfiles import StaticFiles
from main import app

STATIC_WEB_DIR = os.environ.get("STATIC_WEB_DIR", "./static")

print(f"Mounting static website from {STATIC_WEB_DIR}")


class SinglePageApplication(StaticFiles):
    """Acts similar to the bripkens/connect-history-api-fallback
    NPM package."""

    def __init__(self, directory: os.PathLike, index="index.html") -> None:
        self.index = index

        # set html=True to resolve the index even when no
        # the base path is passed in
        super().__init__(directory=directory, packages=None, html=True, check_dir=True)

    def lookup_path(self, path: str) -> Tuple[str, os.stat_result]:
        """Returns the index file when no match is found.

        Args:
            path (str): Resource path.

        Returns:
            [tuple[str, os.stat_result]]: Always retuens a full path and stat result.
        """
        full_path, stat_result = super().lookup_path(path)

        # if a file cannot be found
        if stat_result is None:
            return super().lookup_path(self.index)

        return (full_path, stat_result)


app.mount(path="/", app=SinglePageApplication(directory=STATIC_WEB_DIR), name="SPA")


BACKEND_PORT = os.environ.get("BACKEND_PORT", 8000)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
