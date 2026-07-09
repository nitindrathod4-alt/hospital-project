# Hospital Management System - Backend

A production-ready backend API for Hospital Management System built with Node.js, Express, MongoDB, and Mongoose.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [AWS Deployment](#aws-deployment)
- [Project Structure](#project-structure)

## Features

### Authentication & Authorization
- User registration and login with JWT
- Role-based access control (Admin, Doctor, Patient, Receptionist)
- Password change and reset functionality
- Account status management (active, inactive, suspended)

### Patient Management
- Complete patient profile management
- Medical history tracking
- Medication management
- Emergency contact information
- Blood group and allergies tracking
- Pagination and search functionality

### Doctor Management
- Doctor registration and profile management
- Specialization management
- License number verification
- Consultation fee management
- Doctor schedule management
- Doctor availability tracking
- Ratings and reviews

### Appointment Management
- Book, cancel, and reschedule appointments
- Appointment status tracking (scheduled, confirmed, completed, cancelled, no-show)
- Multiple appointment types (in-person, video, phone)
- Doctor appointment capacity management
- Patient appointment history

### Prescription Management
- Create and manage prescriptions
- Medication details with dosage and frequency
- Test recommendations
- Follow-up scheduling
- Prescription status tracking (active, expired, cancelled)

### Billing Management
- Invoice generation and management
- Multiple payment methods (credit card, debit card, cash, insurance, bank transfer)
- Payment status tracking (pending, paid, partially_paid, refunded)
- Tax and discount calculations
- Insurance claim management
- Billing dashboard with revenue statistics

### Additional Features
- Comprehensive logging and error handling
- Request validation using express-validator
- File upload capability
- Security with helmet and rate limiting
- Pagination for all list endpoints
- Professional API response formatting

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, helmet, express-rate-limit
- **Validation**: express-validator, Joi
- **File Upload**: multer
- **Logging**: winston
- **Email**: nodemailer
- **Container**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: AWS (EC2, EKS, S3)

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB v4.4 or higher
- Docker (optional)
- Docker Compose (optional)
- kubectl (for Kubernetes)
- AWS CLI (for AWS deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Environment Variables section)

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hospital-management
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/hospital-management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_FROM=noreply@hospitalmanagement.com

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# AWS Configuration (Optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=hospital-management-bucket

# Application
APP_NAME=Hospital Management System
APP_VERSION=1.0.0

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for auto-reload.

### Production Mode
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
npm run lint:fix
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Patients
- `GET /api/patients` - Get all patients (paginated)
- `GET /api/patients/:id` - Get single patient
- `POST /api/patients` - Add new patient (admin only)
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient (admin only)

### Doctors
- `GET /api/doctors` - Get all doctors (paginated)
- `GET /api/doctors/:id` - Get single doctor
- `GET /api/doctors/:id/schedule` - Get doctor schedule
- `POST /api/doctors` - Add new doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor (admin only)
- `DELETE /api/doctors/:id` - Delete doctor (admin only)

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/patient/:patientId` - Get patient appointments
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments (doctor/admin)
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `PUT /api/appointments/:id/status` - Update appointment status (doctor only)

### Prescriptions
- `POST /api/prescriptions` - Create prescription (doctor only)
- `GET /api/prescriptions/patient/:patientId` - Get patient prescriptions
- `GET /api/prescriptions/:id` - Get single prescription
- `PUT /api/prescriptions/:id` - Update prescription (doctor only)

### Billing
- `POST /api/billing` - Create billing (doctor/admin)
- `GET /api/billing/patient/:patientId` - Get patient bills
- `GET /api/billing/:id` - Get single bill
- `PUT /api/billing/:id/payment` - Process payment
- `GET /api/billing/stats/dashboard` - Get billing stats (admin only)

### Health Check
- `GET /api/health` - API health status

## Docker Setup

### Build Docker Image
```bash
docker build -t hospital-backend:1.0.0 .
```

### Run with Docker
```bash
docker run -p 5000:5000 --env-file .env hospital-backend:1.0.0
```

### Docker Compose (with MongoDB)
```bash
docker-compose up -d
```

### Stop Docker Containers
```bash
docker-compose down
```

### View Logs
```bash
docker logs -f container_id
docker-compose logs -f
```

## Kubernetes Deployment

### Prerequisites
- kubectl installed and configured
- Kubernetes cluster running (local or cloud)
- Docker image pushed to registry

### Create Namespace
```bash
kubectl create namespace hospital-system
```

### Create Secrets
```bash
kubectl create secret generic hospital-secrets \
  --from-literal=mongodb-uri="mongodb://..."\
  --from-literal=jwt-secret="your_secret_key" \
  -n hospital-system
```

### Deploy to Kubernetes
```bash
# Apply ConfigMap
kubectl apply -f k8s/configmap.yaml

# Apply Secret
kubectl apply -f k8s/secret.yaml

# Deploy MongoDB (if using MongoDB operator)
kubectl apply -f k8s/mongodb-deployment.yaml

# Deploy Backend Application
kubectl apply -f k8s/deployment.yaml

# Create Service
kubectl apply -f k8s/service.yaml

# Create Ingress (optional)
kubectl apply -f k8s/ingress.yaml
```

### Verify Deployment
```bash
kubectl get pods -n hospital-system
kubectl get services -n hospital-system
kubectl describe pod <pod-name> -n hospital-system
```

### View Logs
```bash
kubectl logs -f <pod-name> -n hospital-system
```

### Scaling
```bash
kubectl scale deployment hospital-backend --replicas=3 -n hospital-system
```

### Update Deployment
```bash
kubectl set image deployment/hospital-backend \
  hospital-backend=hospital-backend:2.0.0 \
  -n hospital-system
```

## AWS Deployment

### Option 1: EC2 Deployment

#### Launch EC2 Instance
1. Go to EC2 Dashboard
2. Launch a new instance (Ubuntu 20.04 LTS)
3. Select instance type (t2.medium or larger)
4. Configure security groups (allow ports 22, 5000, 27017)

#### SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Install Dependencies
```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb-org

# Install Git
sudo apt-get install -y git
```

#### Deploy Application
```bash
# Clone repository
git clone <repository-url>
cd hospital-management-system/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with proper values

# Start application
npm start
```

### Option 2: EKS Deployment

#### Create EKS Cluster
```bash
# Create cluster
eksctl create cluster --name hospital-backend --region us-east-1 --nodes 2

# Update kubeconfig
aws eks update-kubeconfig --name hospital-backend --region us-east-1
```

#### Push Docker Image to ECR
```bash
# Create ECR repository
aws ecr create-repository --repository-name hospital-backend --region us-east-1

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and push image
docker build -t hospital-backend:1.0.0 .
docker tag hospital-backend:1.0.0 <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:1.0.0
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:1.0.0
```

#### Update Kubernetes Manifests
Update the image URL in `k8s/deployment.yaml`:
```yaml
image: <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:1.0.0
```

#### Deploy to EKS
```bash
kubectl apply -f k8s/
```

### Option 3: Elastic Beanstalk Deployment

#### Initialize EB
```bash
eb init -p node.js-18 hospital-backend -r us-east-1
```

#### Create Environment
```bash
eb create hospital-backend-env
```

#### Deploy
```bash
eb deploy
```

#### Monitor
```bash
eb status
eb logs
```

## Project Structure

```
backend/
├── config/
│   ├── database.js           # MongoDB connection configuration
│   └── logger.js             # Winston logger configuration
├── controllers/
│   ├── authController.js     # Authentication endpoints
│   ├── patientController.js  # Patient management
│   ├── doctorController.js   # Doctor management
│   ├── appointmentController.js # Appointment management
│   ├── prescriptionController.js # Prescription management
│   └── billingController.js  # Billing management
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Global error handler
│   └── upload.js            # File upload middleware
├── models/
│   ├── User.js              # User schema
│   ├── Patient.js           # Patient schema
│   ├── Doctor.js            # Doctor schema
│   ├── Appointment.js       # Appointment schema
│   ├── Prescription.js      # Prescription schema
│   └── Billing.js           # Billing schema
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── patientRoutes.js     # Patient routes
│   ├── doctorRoutes.js      # Doctor routes
│   ├── appointmentRoutes.js # Appointment routes
│   ├── prescriptionRoutes.js # Prescription routes
│   └── billingRoutes.js     # Billing routes
├── uploads/                 # File uploads directory
├── logs/                    # Application logs
├── k8s/                     # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── secret.yaml
├── tests/                   # Test files
├── .env.example             # Environment variables template
├── .dockerignore            # Docker ignore file
├── .gitignore               # Git ignore file
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── package.json             # NPM dependencies
├── package-lock.json        # NPM lock file
├── server.js                # Application entry point
└── README.md                # This file
```

## MongoDB Models

### User Model
- firstName, lastName, email, password (hashed)
- phone, role (admin, doctor, patient, receptionist)
- profileImage, status, isEmailVerified
- lastLogin, passwordChangedAt, passwordResetToken

### Patient Model
- userId (reference to User)
- dateOfBirth, gender, blood group
- address, emergencyContact
- medicalHistory, allergies, medications
- height, weight, insurance information

### Doctor Model
- userId (reference to User)
- specialization, licenseNumber, licenseExpiry
- qualifications, experience, consultationFee
- availableDays, ratings, status
- maximumAppointmentsPerDay

### Appointment Model
- patientId, doctorId
- appointmentDate, timeSlot, duration
- reason, notes, status (scheduled, confirmed, completed, cancelled)
- appointmentType (in-person, video, phone)
- diagnosis, treatment, followUpRequired, followUpDate

### Prescription Model
- appointmentId, patientId, doctorId
- medications (array with name, dosage, frequency, duration, instructions)
- diagnosis, testRecommendations
- status (active, expired, cancelled)
- issuedBy, expiryDate

### Billing Model
- invoiceNumber, patientId, appointmentId, doctorId
- items (array with description, quantity, unitPrice, totalPrice)
- subtotal, tax, discount, totalAmount
- paymentMethod, paymentStatus, paidAmount, remainingAmount
- dueDate, paymentDate, insuranceClaim

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error message",
  "errorCode": "ERROR_CODE"
}
```

### Error Codes
- `VALIDATION_ERROR` - Validation failed
- `DUPLICATE_ENTRY` - Duplicate entry in database
- `INVALID_TOKEN` - Invalid JWT token
- `TOKEN_EXPIRED` - JWT token expired
- `INVALID_ID_FORMAT` - Invalid MongoDB ObjectId
- `SERVER_ERROR` - General server error

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **Password Hashing**: Using bcryptjs with salt rounds 10
3. **JWT Expiry**: Tokens expire in 7 days by default
4. **Rate Limiting**: 100 requests per 15 minutes per IP
5. **CORS**: Configured to allow only specified origins
6. **Helmet**: Security headers configured
7. **Input Validation**: All inputs validated before processing
8. **SQL Injection**: Using MongoDB with Mongoose prevents injection
9. **XSS Protection**: Helmet provides XSS protection
10. **HTTPS**: Use HTTPS in production

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB service is running: `sudo systemctl status mongod`
- Verify connection string in .env
- Check MongoDB credentials

### JWT Token Issues
- Verify JWT_SECRET in .env
- Check token expiry time
- Clear browser cache and try again

### Port Already in Use
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Docker Build Issues
```bash
# Clear Docker cache and rebuild
docker system prune -a
docker build --no-cache -t hospital-backend:1.0.0 .
```

### Kubernetes Pod Crashing
```bash
# Check pod logs
kubectl logs <pod-name> -n hospital-system

# Describe pod for events
kubectl describe pod <pod-name> -n hospital-system
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@hospitalmanagement.com or create an issue in the repository.

---

**Last Updated**: 2024
**Version**: 1.0.0
