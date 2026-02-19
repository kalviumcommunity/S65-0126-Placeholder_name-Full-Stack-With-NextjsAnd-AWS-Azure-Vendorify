# 🐳 Docker Setup - START HERE

**Sprint 2.12 Complete** — Everything you need to run the project with Docker Compose.

---

## ⚡ Quick Start (30 seconds)

### Step 1: Install Docker
- **Windows/Mac:** Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux:** `sudo apt install docker.io docker-compose`

### Step 2: Start Everything
```bash
docker compose up --build
```

### Step 3: Open Your Browser
```
http://localhost:3000
```

**That's it!** Your app is running! 🎉

---

## 🛑 Stop Everything
```bash
docker compose down
```

---

## 🔍 Verify It's Working

See everything running:
```bash
docker compose ps
```

Expected output (all should say "Up (healthy)"):
```
NAME                COMMAND         STATUS          PORTS
vendorify-app       node server.js  Up (healthy)    0.0.0.0:3000->3000/tcp
vendorify-postgres  postgres        Up (healthy)    0.0.0.0:5432->5432/tcp
vendorify-redis     redis-server    Up (healthy)    0.0.0.0:6379->6379/tcp
```

---

## 📊 What's Running

| Service | URL | Purpose |
|---------|-----|---------|
| **Next.js App** | http://localhost:3000 | Your web application |
| **PostgreSQL** | localhost:5432 | Database (password: vendorify_password) |
| **Redis** | localhost:6379 | Cache system |

---

## 📚 Documentation

| File | Purpose | Read If... |
|------|---------|-----------|
| **README.md § Docker** | Full guide with troubleshooting | You want to learn everything |
| **SPRINT2_12_QUICK_REFERENCE.md** | One-page cheat sheet | You need quick commands |
| **DOCKER_CONFIGURATION_GUIDE.md** | Technical deep-dive | You're debugging something |

---

## 🐛 Something Not Working?

### "Docker not found"
→ Install Docker Desktop

### "Port 3000 already in use"
→ See README.md § Port already in use

### "Cannot connect to database"
→ Wait 10 seconds and refresh browser

### "App won't start"
→ Run: `docker compose logs app`

**For more solutions:** See README.md § Common Issues & Solutions

---

## 🔧 Useful Commands

```bash
# View logs
docker compose logs app              # App logs
docker compose logs app -f           # Follow (live updates)

# Execute commands
docker compose exec app npm run build   # Run build
docker compose exec app npm run lint    # Run linter

# Add a package
docker compose exec app pnpm install express

# Access database
docker compose exec postgres psql -U vendorify_user -d vendorify_db

# Restart everything
docker compose restart

# Clean everything (delete data!)
docker compose down -v
```

---

## 📝 Database Info

```
Host:     postgres (from Docker) or localhost:5432 (from host)
User:     vendorify_user
Password: vendorify_password
Database: vendorify_db
```

---

## 🔄 Development Workflow

1. **Start:** `docker compose up --build`
2. **Code:** Edit your files (changes reload automatically)
3. **Test:** Go to http://localhost:3000
4. **Debug:** `docker compose logs app`
5. **Stop:** `Ctrl+C` or `docker compose down`

---

## 🎯 Next Steps

Once you're comfortable with Docker:

1. Read **README.md § Docker & Local Container Setup** (full guide)
2. Try the commands in **SPRINT2_12_QUICK_REFERENCE.md**
3. Check **DOCKER_CONFIGURATION_GUIDE.md** for technical details

---

## 💡 Tips

- **Data persists!** Stop the containers, start them again, data is still there
- **Fast rebuilds!** Docker caches layers, so rebuilds are much faster
- **No conflicts!** Each project gets its own isolated containers
- **Same on all machines!** Windows, Mac, Linux all work the same way

---

**📌 That's all you need to know to get started!**

For more help, see the documentation files listed above. Happy coding! 🚀
