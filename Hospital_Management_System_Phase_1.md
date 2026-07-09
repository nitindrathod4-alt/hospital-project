# Hospital Management System - Phase 1

## Goal

Create the backend project structure for a production-ready Hospital
Management System.

## Tech Stack

### Backend

-   Node.js 20
-   Express.js
-   MongoDB (Atlas)
-   Mongoose
-   JWT
-   bcryptjs
-   dotenv
-   Winston

### Frontend (Later)

-   React
-   Vite

### DevOps (Later)

-   Docker
-   Docker Compose
-   Kubernetes
-   Jenkins
-   AWS EC2

------------------------------------------------------------------------

# Step 1 - Create Project

``` bash
mkdir hospital-management-system
cd hospital-management-system
```

------------------------------------------------------------------------

# Step 2 - Create Backend Folder

``` bash
mkdir backend
cd backend
```

------------------------------------------------------------------------

# Step 3 - Initialize Node.js

``` bash
npm init -y
```

------------------------------------------------------------------------

# Step 4 - Install Dependencies

``` bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan express-validator multer winston
```

------------------------------------------------------------------------

# Step 5 - Install Development Dependency

``` bash
npm install -D nodemon
```

------------------------------------------------------------------------

# Step 6 - Create Project Structure

Linux / EC2

``` bash
mkdir config controllers middleware models routes uploads
touch server.js
touch .env.example
touch Dockerfile
```

Windows PowerShell

``` powershell
mkdir config,controllers,middleware,models,routes,uploads
New-Item server.js -ItemType File
New-Item .env.example -ItemType File
New-Item Dockerfile -ItemType File
```

------------------------------------------------------------------------

# Expected Backend Structure

``` text
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── package.json
├── package-lock.json
├── server.js
├── Dockerfile
└── .env.example
```

------------------------------------------------------------------------

# Step 7 - Initialize Git

``` bash
git init
git add .
git commit -m "Phase 1 Backend Structure"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

------------------------------------------------------------------------

# Phase 1 Checklist

-   [ ] Create project folder
-   [ ] Create backend folder
-   [ ] Initialize Node.js
-   [ ] Install dependencies
-   [ ] Install nodemon
-   [ ] Create folders
-   [ ] Create server.js
-   [ ] Create Dockerfile
-   [ ] Create .env.example
-   [ ] Push to GitHub

# Hospital Management System - Phase 2

## Goal

Build a working Express backend connected to MongoDB Atlas.

------------------------------------------------------------------------

# Step 1 - Create .env.example

``` env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hospital-management

JWT_SECRET=change_this_secret
JWT_EXPIRE=7d
```

Copy it to `.env`:

``` bash
cp .env.example .env
```

------------------------------------------------------------------------

# Step 2 - Install Dependencies

``` bash
npm install
```

------------------------------------------------------------------------

# Step 3 - Create Database Configuration

File:

``` text
backend/config/database.js
```

Responsibilities: - Load `MONGODB_URI` - Connect using Mongoose - Export
`connectDB()`

------------------------------------------------------------------------

# Step 4 - Create Logger

File:

``` text
backend/config/logger.js
```

Use Winston to log: - Server startup - Database connection - Errors

------------------------------------------------------------------------

# Step 5 - Create Express Server

File:

``` text
backend/server.js
```

Responsibilities: - Load dotenv - Connect MongoDB - Enable CORS - Enable
JSON body parser - Register routes - Start server on `PORT`

------------------------------------------------------------------------

# Step 6 - Health Check Route

Create:

``` text
backend/routes/healthRoutes.js
```

Endpoint:

``` http
GET /api/health
```

Expected Response:

``` json
{
  "success": true,
  "message": "Hospital API is running"
}
```

------------------------------------------------------------------------

# Step 7 - Register Route

In `server.js`:

``` text
/ api / health
```

should point to:

``` text
routes/healthRoutes.js
```

------------------------------------------------------------------------

# Step 8 - Start Server

``` bash
npm start
```

or

``` bash
npm run dev
```

Expected Output:

``` text
MongoDB Connected
Server running on port 5000
```

------------------------------------------------------------------------

# Step 9 - Test API

``` bash
curl http://localhost:5000/api/health
```

Expected:

``` json
{
  "success": true,
  "message": "Hospital API is running"
}
```

------------------------------------------------------------------------

# Phase 2 Checklist

-   [ ] Create .env
-   [ ] Connect MongoDB Atlas
-   [ ] Create database.js
-   [ ] Create logger.js
-   [ ] Configure server.js
-   [ ] Add health route
-   [ ] Start backend
-   [ ] Verify API

------------------------------------------------------------------------


# Hospital Management System - Phase 3

## Goal

Implement authentication with JWT and create the first business APIs.

------------------------------------------------------------------------

# Features

-   User Model
-   Password Hashing (bcryptjs)
-   JWT Authentication
-   Register API
-   Login API
-   Authentication Middleware
-   Protected Routes
-   Role-Based Access (Admin, Doctor, Patient)

------------------------------------------------------------------------

# Step 1 - Create User Model

File:

``` text
backend/models/User.js
```

Fields:

-   firstName
-   lastName
-   email (unique)
-   password
-   phone
-   role
-   createdAt

Add: - bcrypt password hashing - matchPassword() method

------------------------------------------------------------------------

# Step 2 - Authentication Controller

File:

``` text
backend/controllers/authController.js
```

Implement:

-   Register
-   Login
-   Get Current User

------------------------------------------------------------------------

# Step 3 - Authentication Routes

File:

``` text
backend/routes/authRoutes.js
```

Routes:

``` http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

------------------------------------------------------------------------

# Step 4 - JWT Middleware

File:

``` text
backend/middleware/auth.js
```

Responsibilities:

-   Read Authorization header
-   Verify JWT
-   Load authenticated user
-   Reject invalid or missing tokens

------------------------------------------------------------------------

# Step 5 - Protect Routes

Example:

``` http
GET /api/auth/me
```

Requires:

``` text
Authorization: Bearer <JWT_TOKEN>
```

------------------------------------------------------------------------

# Step 6 - Register Routes in server.js

``` text
/app.use("/api/auth", authRoutes)
```

------------------------------------------------------------------------

# Step 7 - Test Register API

``` http
POST /api/auth/register
```

Sample Body:

``` json
{
  "firstName":"Nitin",
  "lastName":"Rathod",
  "email":"nitin@example.com",
  "password":"Password@123",
  "phone":"9876543210",
  "role":"admin"
}
```

------------------------------------------------------------------------

# Step 8 - Test Login

``` http
POST /api/auth/login
```

Response:

``` json
{
  "success": true,
  "token": "<JWT_TOKEN>"
}
```

------------------------------------------------------------------------

# Step 9 - Test Protected API

``` http
GET /api/auth/me
```

Header:

``` text
Authorization: Bearer <JWT_TOKEN>
```

------------------------------------------------------------------------

# Folder Structure

``` text
backend/
├── config/
├── controllers/
│   └── authController.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── server.js
└── .env
```

------------------------------------------------------------------------

# Checklist

-   [ ] User Model
-   [ ] Password Hashing
-   [ ] JWT Token
-   [ ] Register API
-   [ ] Login API
-   [ ] Auth Middleware
-   [ ] Protected Route
-   [ ] API Testing

------------------------------------------------------------------------

# Hospital Management System - Phase 4

## Goal

Implement core Hospital Management modules with CRUD APIs.

------------------------------------------------------------------------

# Modules

-   Patient Management
-   Doctor Management
-   Appointment Management

------------------------------------------------------------------------

# Step 1 - Create Models

Create files:

``` text
backend/models/
├── Patient.js
├── Doctor.js
└── Appointment.js
```

### Patient Fields

-   user
-   age
-   gender
-   bloodGroup
-   address
-   emergencyContact
-   medicalHistory

### Doctor Fields

-   user
-   specialization
-   experience
-   qualification
-   consultationFee
-   availability

### Appointment Fields

-   patient
-   doctor
-   appointmentDate
-   appointmentTime
-   reason
-   status

------------------------------------------------------------------------

# Step 2 - Create Controllers

``` text
backend/controllers/
├── patientController.js
├── doctorController.js
└── appointmentController.js
```

Each controller should support:

-   Create
-   Get All
-   Get By ID
-   Update
-   Delete

------------------------------------------------------------------------

# Step 3 - Create Routes

``` text
backend/routes/
├── patientRoutes.js
├── doctorRoutes.js
└── appointmentRoutes.js
```

Example endpoints:

## Patients

-   POST /api/patients
-   GET /api/patients
-   GET /api/patients/:id
-   PUT /api/patients/:id
-   DELETE /api/patients/:id

## Doctors

-   POST /api/doctors
-   GET /api/doctors
-   GET /api/doctors/:id
-   PUT /api/doctors/:id
-   DELETE /api/doctors/:id

## Appointments

-   POST /api/appointments
-   GET /api/appointments
-   GET /api/appointments/:id
-   PUT /api/appointments/:id
-   DELETE /api/appointments/:id

------------------------------------------------------------------------

# Step 4 - Protect Routes

Use JWT middleware.

Roles:

-   Admin
-   Doctor
-   Patient

Examples:

-   Admin → Full access
-   Doctor → View assigned appointments
-   Patient → Manage own appointments

------------------------------------------------------------------------

# Step 5 - Validation

Use express-validator for:

-   Required fields
-   Email format
-   Phone number
-   Appointment date/time
-   ObjectId validation

------------------------------------------------------------------------

# Step 6 - Error Handling

Create:

``` text
backend/middleware/errorHandler.js
```

Handle:

-   Validation errors
-   MongoDB errors
-   JWT errors
-   404
-   500

------------------------------------------------------------------------

# Step 7 - Register Routes

In server.js:

``` text
/app.use("/api/patients", patientRoutes)
/app.use("/api/doctors", doctorRoutes)
/app.use("/api/appointments", appointmentRoutes)
```

------------------------------------------------------------------------

# Step 8 - API Testing

Test with Postman:

-   Patient CRUD
-   Doctor CRUD
-   Appointment CRUD
-   Protected routes

------------------------------------------------------------------------

# Folder Structure

``` text
backend/
├── controllers/
│   ├── patientController.js
│   ├── doctorController.js
│   └── appointmentController.js
├── models/
│   ├── Patient.js
│   ├── Doctor.js
│   └── Appointment.js
├── routes/
│   ├── patientRoutes.js
│   ├── doctorRoutes.js
│   └── appointmentRoutes.js
└── middleware/
    └── errorHandler.js
```

------------------------------------------------------------------------

# Checklist

-   [ ] Patient CRUD
-   [ ] Doctor CRUD
-   [ ] Appointment CRUD
-   [ ] Route Protection
-   [ ] Validation
-   [ ] Error Handler
-   [ ] API Testing

------------------------------------------------------------------------

# Hospital Management System - Phase 5

## Goal

Implement advanced hospital modules and reporting features.

------------------------------------------------------------------------

# Features

-   Billing Module
-   Prescription Module
-   Dashboard APIs
-   File Uploads
-   Reports
-   Audit Logging

------------------------------------------------------------------------

# Step 1 - Billing Module

Create:

``` text
backend/models/Billing.js
backend/controllers/billingController.js
backend/routes/billingRoutes.js
```

Fields:

-   patient
-   appointment
-   amount
-   paymentMethod
-   paymentStatus
-   invoiceNumber
-   createdAt

Endpoints:

-   POST /api/billing
-   GET /api/billing
-   GET /api/billing/:id
-   PUT /api/billing/:id
-   DELETE /api/billing/:id

------------------------------------------------------------------------

# Step 2 - Prescription Module

Create:

``` text
backend/models/Prescription.js
backend/controllers/prescriptionController.js
backend/routes/prescriptionRoutes.js
```

Fields:

-   patient
-   doctor
-   medicines
-   dosage
-   instructions
-   followUpDate

Endpoints:

-   POST /api/prescriptions
-   GET /api/prescriptions
-   GET /api/prescriptions/:id
-   PUT /api/prescriptions/:id
-   DELETE /api/prescriptions/:id

------------------------------------------------------------------------

# Step 3 - Dashboard APIs

Create dashboard endpoints:

``` http
GET /api/dashboard/stats
```

Return:

-   Total Patients
-   Total Doctors
-   Total Appointments
-   Today's Appointments
-   Total Revenue
-   Pending Bills

------------------------------------------------------------------------

# Step 4 - File Uploads

Create:

``` text
backend/middleware/upload.js
```

Upload:

-   Profile Photo
-   Medical Report (PDF)
-   Lab Report
-   Prescription Attachment

Store in:

``` text
backend/uploads/
```

------------------------------------------------------------------------

# Step 5 - Reports

Create APIs:

-   Daily Report
-   Weekly Report
-   Monthly Report

Export support:

-   JSON
-   CSV (optional)
-   PDF (future enhancement)

------------------------------------------------------------------------

# Step 6 - Logging

Use Winston to log:

-   User Login
-   Appointment Creation
-   Billing
-   Prescription Updates
-   Errors

------------------------------------------------------------------------

# Step 7 - Route Registration

Register in `server.js`:

``` text
/app.use("/api/billing", billingRoutes)
/app.use("/api/prescriptions", prescriptionRoutes)
/app.use("/api/dashboard", dashboardRoutes)
```

------------------------------------------------------------------------

# Folder Structure

``` text
backend/
├── controllers/
│   ├── billingController.js
│   ├── prescriptionController.js
│   └── dashboardController.js
├── models/
│   ├── Billing.js
│   └── Prescription.js
├── routes/
│   ├── billingRoutes.js
│   ├── prescriptionRoutes.js
│   └── dashboardRoutes.js
├── middleware/
│   └── upload.js
└── uploads/
```

------------------------------------------------------------------------

# Checklist

-   [ ] Billing CRUD
-   [ ] Prescription CRUD
-   [ ] Dashboard API
-   [ ] File Upload
-   [ ] Reports
-   [ ] Logging

-----------------------------------------------------------------------

# Hospital Management System - Phase 6

## Goal

Containerize the application using Docker and Docker Compose for local
development and deployment.

------------------------------------------------------------------------

# Architecture

``` text
                +------------------+
                |     Frontend     |
                |  React + Vite    |
                +--------+---------+
                         |
                         |
                +--------v---------+
                | Backend API      |
                | Node.js/Express  |
                +--------+---------+
                         |
                         |
                +--------v---------+
                | MongoDB          |
                | Database         |
                +------------------+
```

------------------------------------------------------------------------

# Step 1 - Backend Dockerfile

Create:

``` text
backend/Dockerfile
```

Responsibilities:

-   Use Node.js 20 image
-   Copy source
-   Install dependencies
-   Expose port 5000
-   Start application

------------------------------------------------------------------------

# Step 2 - Frontend Dockerfile

Create:

``` text
frontend/Dockerfile
```

Responsibilities:

-   Build React application
-   Expose port 5173
-   Serve production build

------------------------------------------------------------------------

# Step 3 - .dockerignore

Create:

``` text
backend/.dockerignore
frontend/.dockerignore
```

Ignore:

``` text
node_modules
.git
.env
npm-debug.log
dist
```

------------------------------------------------------------------------

# Step 4 - Docker Compose

Create:

``` text
docker-compose.yml
```

Services:

-   backend
-   frontend
-   mongodb

Ports:

-   Backend : 5000
-   Frontend : 5173
-   MongoDB : 27017

Volumes:

-   MongoDB data
-   Source code (development)

Networks:

-   hospital-network

------------------------------------------------------------------------

# Step 5 - Environment Variables

Use:

``` text
backend/.env
```

Example:

``` env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/hospital-management
JWT_SECRET=change_me
```

------------------------------------------------------------------------

# Step 6 - Build Images

``` bash
docker compose build
```

------------------------------------------------------------------------

# Step 7 - Start Containers

``` bash
docker compose up -d
```

------------------------------------------------------------------------

# Step 8 - Verify

``` bash
docker ps
```

Expected containers:

-   backend
-   frontend
-   mongodb

------------------------------------------------------------------------

# Step 9 - View Logs

``` bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

------------------------------------------------------------------------

# Step 10 - Stop

``` bash
docker compose down
```

To remove volumes:

``` bash
docker compose down -v
```

------------------------------------------------------------------------

# Folder Structure

``` text
hospital-management-system/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

------------------------------------------------------------------------

# Checklist

-   [ ] Backend Dockerfile
-   [ ] Frontend Dockerfile
-   [ ] .dockerignore
-   [ ] docker-compose.yml
-   [ ] Build images
-   [ ] Run containers
-   [ ] Verify services

------------------------------------------------------------------------

# Hospital Management System - Phase 6

## Goal

Containerize the application using Docker and Docker Compose for local
development and deployment.

------------------------------------------------------------------------

# Architecture

``` text
                +------------------+
                |     Frontend     |
                |  React + Vite    |
                +--------+---------+
                         |
                         |
                +--------v---------+
                | Backend API      |
                | Node.js/Express  |
                +--------+---------+
                         |
                         |
                +--------v---------+
                | MongoDB          |
                | Database         |
                +------------------+
```

------------------------------------------------------------------------

# Step 1 - Backend Dockerfile

Create:

``` text
backend/Dockerfile
```

Responsibilities:

-   Use Node.js 20 image
-   Copy source
-   Install dependencies
-   Expose port 5000
-   Start application

------------------------------------------------------------------------

# Step 2 - Frontend Dockerfile

Create:

``` text
frontend/Dockerfile
```

Responsibilities:

-   Build React application
-   Expose port 5173
-   Serve production build

------------------------------------------------------------------------

# Step 3 - .dockerignore

Create:

``` text
backend/.dockerignore
frontend/.dockerignore
```

Ignore:

``` text
node_modules
.git
.env
npm-debug.log
dist
```

------------------------------------------------------------------------

# Step 4 - Docker Compose

Create:

``` text
docker-compose.yml
```

Services:

-   backend
-   frontend
-   mongodb

Ports:

-   Backend : 5000
-   Frontend : 5173
-   MongoDB : 27017

Volumes:

-   MongoDB data
-   Source code (development)

Networks:

-   hospital-network

------------------------------------------------------------------------

# Step 5 - Environment Variables

Use:

``` text
backend/.env
```

Example:

``` env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/hospital-management
JWT_SECRET=change_me
```

------------------------------------------------------------------------

# Step 6 - Build Images

``` bash
docker compose build
```

------------------------------------------------------------------------

# Step 7 - Start Containers

``` bash
docker compose up -d
```

------------------------------------------------------------------------

# Step 8 - Verify

``` bash
docker ps
```

Expected containers:

-   backend
-   frontend
-   mongodb

------------------------------------------------------------------------

# Step 9 - View Logs

``` bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

------------------------------------------------------------------------

# Step 10 - Stop

``` bash
docker compose down
```

To remove volumes:

``` bash
docker compose down -v
```

------------------------------------------------------------------------

# Folder Structure

``` text
hospital-management-system/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

------------------------------------------------------------------------

# Checklist

-   [ ] Backend Dockerfile
-   [ ] Frontend Dockerfile
-   [ ] .dockerignore
-   [ ] docker-compose.yml
-   [ ] Build images
-   [ ] Run containers
-   [ ] Verify services

----------------------------------------------------------------------

# Hospital Management System - Phase 7

## Goal

Deploy the Hospital Management System on Kubernetes.

------------------------------------------------------------------------

# Kubernetes Components

-   Namespace
-   ConfigMap
-   Secret
-   MongoDB Deployment
-   MongoDB Service
-   Backend Deployment
-   Backend Service
-   Frontend Deployment
-   Frontend Service
-   Ingress

------------------------------------------------------------------------

# Step 1 - Create Namespace

File:

``` text
kubernetes/namespace.yaml
```

Apply:

``` bash
kubectl apply -f kubernetes/namespace.yaml
```

------------------------------------------------------------------------

# Step 2 - ConfigMap

Create:

``` text
kubernetes/configmap.yaml
```

Store:

-   NODE_ENV
-   PORT
-   APP_NAME

------------------------------------------------------------------------

# Step 3 - Secret

Create:

``` text
kubernetes/secret.yaml
```

Store:

-   MONGODB_URI
-   JWT_SECRET

Create from CLI:

``` bash
kubectl create secret generic hospital-secret \
  --from-literal=MONGODB_URI="<mongodb-uri>" \
  --from-literal=JWT_SECRET="<jwt-secret>"
```

------------------------------------------------------------------------

# Step 4 - MongoDB

Files:

``` text
kubernetes/mongodb-deployment.yaml
kubernetes/mongodb-service.yaml
```

Service Type:

-   ClusterIP

Port:

-   27017

------------------------------------------------------------------------

# Step 5 - Backend

Files:

``` text
kubernetes/backend-deployment.yaml
kubernetes/backend-service.yaml
```

Deployment:

-   2 replicas
-   Liveness Probe
-   Readiness Probe

Service:

-   ClusterIP

Container Port:

-   5000

------------------------------------------------------------------------

# Step 6 - Frontend

Files:

``` text
kubernetes/frontend-deployment.yaml
kubernetes/frontend-service.yaml
```

Deployment:

-   2 replicas

Service:

-   LoadBalancer (Cloud)
-   NodePort (Minikube)

Container Port:

-   80

------------------------------------------------------------------------

# Step 7 - Ingress

File:

``` text
kubernetes/ingress.yaml
```

Routes:

-   /
-   /api

(Optional for Minikube; recommended on cloud clusters.)

------------------------------------------------------------------------

# Step 8 - Deploy

``` bash
kubectl apply -f kubernetes/
```

------------------------------------------------------------------------

# Step 9 - Verify

``` bash
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get ingress
```

------------------------------------------------------------------------

# Step 10 - Troubleshooting

Describe pod:

``` bash
kubectl describe pod <pod-name>
```

Logs:

``` bash
kubectl logs <pod-name>
```

Restart rollout:

``` bash
kubectl rollout restart deployment backend
kubectl rollout restart deployment frontend
```

------------------------------------------------------------------------

# Folder Structure

``` text
kubernetes/
├── namespace.yaml
├── configmap.yaml
├── secret.yaml
├── mongodb-deployment.yaml
├── mongodb-service.yaml
├── backend-deployment.yaml
├── backend-service.yaml
├── frontend-deployment.yaml
├── frontend-service.yaml
└── ingress.yaml
```

------------------------------------------------------------------------

# Checklist

-   [ ] Namespace
-   [ ] ConfigMap
-   [ ] Secret
-   [ ] MongoDB Deployment
-   [ ] Backend Deployment
-   [ ] Frontend Deployment
-   [ ] Services
-   [ ] Ingress
-   [ ] Verify Pods
-   [ ] Verify Services

------------------------------------------------------------------------

# Hospital Management System - Phase 8

## Goal

Build a complete CI/CD pipeline using Jenkins, Docker Hub, and
Kubernetes.

------------------------------------------------------------------------

# Architecture

GitHub -\> Jenkins -\> Build -\> Test -\> Docker Image -\> Docker Hub
-\> Kubernetes Deployment

------------------------------------------------------------------------

# Step 1 - Install Jenkins

Requirements: - Java 21 - Jenkins LTS - Git - Docker

Verify:

``` bash
java -version
jenkins --version
```

------------------------------------------------------------------------

# Step 2 - Install Plugins

-   Git
-   Pipeline
-   Docker
-   Docker Pipeline
-   Credentials Binding
-   Kubernetes CLI
-   Blue Ocean (Optional)

------------------------------------------------------------------------

# Step 3 - Configure Credentials

Add:

-   GitHub Token
-   Docker Hub Username/Password
-   Kubernetes kubeconfig (or service account)
-   MongoDB Secrets (if required)

------------------------------------------------------------------------

# Step 4 - Create Jenkinsfile

Stages:

1.  Checkout
2.  Install Dependencies
3.  Run Tests
4.  Build Backend Image
5.  Build Frontend Image
6.  Push Images to Docker Hub
7.  Deploy to Kubernetes
8.  Verify Deployment

------------------------------------------------------------------------

# Step 5 - Build

``` bash
docker build -t <dockerhub-user>/hospital-backend:latest backend
docker build -t <dockerhub-user>/hospital-frontend:latest frontend
```

------------------------------------------------------------------------

# Step 6 - Push Images

``` bash
docker push <dockerhub-user>/hospital-backend:latest
docker push <dockerhub-user>/hospital-frontend:latest
```

------------------------------------------------------------------------

# Step 7 - Kubernetes Deployment

Update image tags if required and run:

``` bash
kubectl apply -f kubernetes/
kubectl rollout status deployment/backend
kubectl rollout status deployment/frontend
```

------------------------------------------------------------------------

# Step 8 - Verify

``` bash
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl logs deployment/backend
```

------------------------------------------------------------------------

# Step 9 - Rollback

``` bash
kubectl rollout undo deployment/backend
kubectl rollout undo deployment/frontend
```

------------------------------------------------------------------------

# Pipeline Flow

``` text
GitHub
   |
Jenkins
   |
Build
   |
Test
   |
Docker Build
   |
Docker Hub
   |
Kubernetes
   |
Production
```

------------------------------------------------------------------------

# Checklist

-   [ ] Jenkins Installed
-   [ ] Plugins Installed
-   [ ] Credentials Added
-   [ ] Jenkinsfile Created
-   [ ] Docker Images Built
-   [ ] Docker Images Pushed
-   [ ] Kubernetes Deployment Successful
-   [ ] Rollback Tested

------------------------------------------------------------------------

# Next Phase

# Hospital Management System - Phase 9

## Goal

Deploy the application to AWS EC2 with a production-ready setup.

------------------------------------------------------------------------

# Production Architecture

``` text
Internet
    |
 Route53 (Optional)
    |
 NGINX Reverse Proxy
    |
+----------------------+
|      EC2 Instance    |
|----------------------|
| Frontend Container   |
| Backend Container    |
| MongoDB Atlas        |
| Docker Compose       |
+----------------------+
```

------------------------------------------------------------------------

# Step 1 - Launch EC2

Recommended:

-   Ubuntu 24.04 LTS
-   t3.medium (minimum for demo)
-   30 GB gp3 storage

Open Security Group ports:

-   22 (SSH)
-   80 (HTTP)
-   443 (HTTPS)

------------------------------------------------------------------------

# Step 2 - Install Software

Install:

-   Git
-   Node.js
-   Docker
-   Docker Compose
-   NGINX

Verify:

``` bash
git --version
node -v
docker --version
nginx -v
```

------------------------------------------------------------------------

# Step 3 - Clone Project

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd hospital-management-system
```

------------------------------------------------------------------------

# Step 4 - Configure Environment

Create:

``` text
backend/.env
```

Set:

-   MONGODB_URI
-   JWT_SECRET
-   PORT
-   NODE_ENV=production

------------------------------------------------------------------------

# Step 5 - Start Application

``` bash
docker compose up -d --build
```

Verify:

``` bash
docker ps
```

------------------------------------------------------------------------

# Step 6 - Configure NGINX

Reverse proxy:

-   `/` → Frontend
-   `/api` → Backend

Test configuration:

``` bash
sudo nginx -t
sudo systemctl reload nginx
```

------------------------------------------------------------------------

# Step 7 - Enable HTTPS

Install Certbot:

``` bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

Generate certificate:

``` bash
sudo certbot --nginx
```

Enable auto-renew check:

``` bash
sudo certbot renew --dry-run
```

------------------------------------------------------------------------

# Step 8 - Monitoring

Recommended:

-   Prometheus
-   Grafana
-   Node Exporter

Monitor:

-   CPU
-   Memory
-   Disk
-   Container Health

------------------------------------------------------------------------

# Step 9 - Logging

Collect:

-   NGINX logs
-   Backend logs
-   Docker logs

Useful command:

``` bash
docker compose logs -f
```

------------------------------------------------------------------------

# Step 10 - Backup Strategy

Back up:

-   MongoDB Atlas
-   .env
-   Jenkinsfile
-   Kubernetes manifests

Store backups securely.

------------------------------------------------------------------------

# Production Checklist

-   [ ] EC2 Ready
-   [ ] Docker Running
-   [ ] Application Running
-   [ ] MongoDB Atlas Connected
-   [ ] NGINX Configured
-   [ ] HTTPS Enabled
-   [ ] Monitoring Enabled
-   [ ] Backups Configured

------------------------------------------------------------------------

# Project Complete

At this stage the project includes:

-   React + Vite Frontend
-   Node.js + Express Backend
-   MongoDB Atlas
-   JWT Authentication
-   CRUD Modules
-   Docker
-   Docker Compose
-   Kubernetes
-   Jenkins CI/CD
-   AWS EC2 Deployment
-   HTTPS
-   Monitoring
-   Backup Strategy

Resume outcome: A complete end-to-end DevOps project suitable for
demonstrating full-stack development and deployment workflows.


# 🏥 Hospital Management System

A production-ready Hospital Management System built with the MERN stack
and modern DevOps practices.

## Features

### Authentication

-   JWT Authentication
-   Role-Based Access Control (Admin, Doctor, Patient)
-   Secure Password Hashing (bcrypt)

### Hospital Modules

-   Patient Management
-   Doctor Management
-   Appointment Management
-   Billing
-   Prescription Management
-   Dashboard & Reports

### Tech Stack

#### Frontend

-   React
-   Vite
-   Axios
-   React Router

#### Backend

-   Node.js
-   Express.js
-   MongoDB Atlas
-   Mongoose
-   JWT
-   Winston Logger

#### DevOps

-   Docker
-   Docker Compose
-   Kubernetes
-   Jenkins CI/CD
-   AWS EC2
-   NGINX

------------------------------------------------------------------------

## Project Structure

``` text
hospital-management-system/
├── backend/
├── frontend/
├── kubernetes/
├── docker-compose.yml
├── Jenkinsfile
├── README.md
└── .env.example
```

------------------------------------------------------------------------

## Prerequisites

-   Node.js 20+
-   Docker
-   Docker Compose
-   Git
-   MongoDB Atlas Account
-   Kubernetes (Minikube or EKS)
-   Jenkins (Optional)

------------------------------------------------------------------------

## Clone Repository

``` bash
git clone <repository-url>
cd hospital-management-system
```

------------------------------------------------------------------------

## Backend Setup

``` bash
cd backend
npm install
cp .env.example .env
npm start
```

------------------------------------------------------------------------

## Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## Docker

Build and start:

``` bash
docker compose up --build -d
```

Stop:

``` bash
docker compose down
```

------------------------------------------------------------------------

## Kubernetes

``` bash
kubectl apply -f kubernetes/
kubectl get pods
kubectl get svc
```

------------------------------------------------------------------------

## Jenkins CI/CD

Pipeline stages:

1.  Checkout
2.  Install Dependencies
3.  Run Tests
4.  Build Docker Images
5.  Push Images to Docker Hub
6.  Deploy to Kubernetes
7.  Verify Deployment

------------------------------------------------------------------------

## API Modules

-   Authentication
-   Patients
-   Doctors
-   Appointments
-   Billing
-   Prescriptions
-   Dashboard

------------------------------------------------------------------------

## Environment Variables

Example:

``` env
PORT=5000
NODE_ENV=development
MONGODB_URI=<mongodb-uri>
JWT_SECRET=<jwt-secret>
```

------------------------------------------------------------------------

## Deployment

-   Docker Compose
-   Kubernetes
-   AWS EC2
-   NGINX Reverse Proxy
-   HTTPS with Let's Encrypt

------------------------------------------------------------------------

## Future Improvements

-   Email Notifications
-   SMS Notifications
-   Inventory Management
-   Payment Gateway
-   Audit Logs
-   Monitoring with Prometheus & Grafana

------------------------------------------------------------------------

## Author

**Nitin Rathod**

GitHub: https://github.com/nitindrathod4-alt

LinkedIn: Add your LinkedIn profile here.

------------------------------------------------------------------------

## License

This project is released under the MIT License.
