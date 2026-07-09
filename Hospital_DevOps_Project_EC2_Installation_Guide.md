# Hospital DevOps Project - EC2 Installation Guide

## Project Structure

``` text
hospital-devops-project/
├── backend/        # Node.js + Express API
├── frontend/       # React + Vite
├── kubernetes/     # Kubernetes manifests
├── docker-compose.yml
└── README.md
```

## 1. Update Ubuntu

``` bash
sudo apt update && sudo apt upgrade -y
```

## 2. Install Git

``` bash
sudo apt install git -y
git --version
```

## 3. Install Node.js 20 LTS

``` bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v
```

## 4. Install Docker

``` bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
docker --version
```

## 5. Install Docker Compose Plugin

``` bash
sudo apt install docker-compose-plugin -y
docker compose version
```

## 6. Install Tree (Optional)

``` bash
sudo apt install tree -y
tree
```

## 7. Install Backend Dependencies

``` bash
cd ~/hospital-project/hospital-devops-project/backend
npm install
```

## 8. Install Frontend Dependencies

``` bash
cd ~/hospital-project/hospital-devops-project/frontend
npm install
```

## 9. Run Backend

``` bash
cd ~/hospital-project/hospital-devops-project/backend
npm start
```

If npm start is not configured:

``` bash
node server.js
```

## 10. Run Frontend

``` bash
cd ~/hospital-project/hospital-devops-project/frontend
npm run dev
```

## 11. Run Using Docker

``` bash
cd ~/hospital-project/hospital-devops-project
docker compose up --build
```

## 12. Check Running Containers

``` bash
docker ps
```

## 13. Stop Containers

``` bash
docker compose down
```

## Useful Commands

``` bash
tree
ls -R
docker images
docker ps -a
docker logs <container_name>
```

## Next Step

Check: - backend/config/database.js - docker-compose.yml - package.json
(backend & frontend)

to verify database configuration and startup scripts.
