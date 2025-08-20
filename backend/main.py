from database import Base, engine
from fastapi import FastAPI

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# TODO: Import your router modules here
# Example: from routers import users, tasks

# TODO: Register your routers with /api prefix
# Example: app.include_router(users.router, prefix="/api/users", tags=["users"])
# Example: app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

# NOTE: Make sure to register ALL routers before run.py executes
# The order matters! Routers must be registered before any catch-all routes

# QUICK FIX CHECKLIST (if you're getting 404 errors):
# 1. ✅ Create router files: backend/routers/your_resource.py
# 2. ✅ Each router file should have: router = APIRouter()
# 3. ✅ Add routes with: @router.get("/"), @router.post("/"), etc.
# 4. ✅ Import routers here: from routers import your_resource
# 5. ✅ Register routers: app.include_router(your_resource.router, prefix="/api/your_resource")
# 6. ✅ Test endpoints appear at: /openapi.json
