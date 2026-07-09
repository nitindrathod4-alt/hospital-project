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
