# Hospital Management System - Frontend File Structure

## Complete Directory Tree

```
frontend/
├── public/                          # Public assets
│   └── (Add favicons, images here)
│
├── src/
│   ├── components/                  # React components
│   │   ├── Auth/                    # Authentication components
│   │   │   ├── Login.jsx            # Login page component
│   │   │   ├── Register.jsx         # Registration page component
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   │
│   │   ├── Layout/                  # Layout components
│   │   │   ├── Header.jsx           # Top navigation header
│   │   │   ├── Sidebar.jsx          # Side navigation menu
│   │   │   └── Layout.jsx           # Main layout wrapper
│   │   │
│   │   ├── Dashboard/               # Dashboard module
│   │   │   └── Dashboard.jsx        # Statistics and overview
│   │   │
│   │   ├── Patients/                # Patients management
│   │   │   ├── PatientsPage.jsx     # Main patients page
│   │   │   ├── PatientsList.jsx     # Patients table display
│   │   │   └── PatientForm.jsx      # Add/edit patient form
│   │   │
│   │   ├── Doctors/                 # Doctors management
│   │   │   ├── DoctorsPage.jsx      # Main doctors page
│   │   │   ├── DoctorsList.jsx      # Doctors table display
│   │   │   └── DoctorForm.jsx       # Add/edit doctor form
│   │   │
│   │   ├── Appointments/            # Appointments management
│   │   │   ├── AppointmentsPage.jsx # Main appointments page
│   │   │   ├── AppointmentsList.jsx # Appointments table display
│   │   │   └── AppointmentForm.jsx  # Schedule/edit appointment form
│   │   │
│   │   └── Profile/                 # User profile
│   │       └── ProfilePage.jsx      # User profile view/edit
│   │
│   ├── services/                    # API service layer
│   │   ├── api.js                   # Axios instance with interceptors
│   │   ├── authService.js           # Auth API calls
│   │   ├── patientService.js        # Patient API calls
│   │   ├── doctorService.js         # Doctor API calls
│   │   └── appointmentService.js    # Appointment API calls
│   │
│   ├── styles/                      # CSS stylesheets
│   │   ├── index.css                # Global styles & CSS variables
│   │   ├── auth.css                 # Auth pages styling
│   │   ├── layout.css               # Header & sidebar styling
│   │   ├── dashboard.css            # Dashboard styling
│   │   └── components.css           # Component styling
│   │
│   ├── App.jsx                      # Main App component with routing
│   ├── App.css                      # App wrapper styles
│   └── main.jsx                     # Vite entry point
│
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── vite.config.js                   # Vite configuration
├── Dockerfile                       # Docker build file
├── .dockerignore                    # Docker ignore patterns
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore patterns
├── README.md                        # Project documentation
└── STRUCTURE.md                     # This file
```

## File Descriptions

### Components (src/components/)

#### Auth/ - Authentication Components
- **Login.jsx** - User login form with email/password
  - Form validation
  - Error handling
  - Redirect to dashboard on success
  
- **Register.jsx** - User registration form
  - Name, email, password fields
  - Role selection (patient/doctor/admin)
  - Password confirmation validation
  
- **ProtectedRoute.jsx** - Route guard component
  - Checks authentication status
  - Redirects unauthenticated users to login

#### Layout/ - Layout Components
- **Header.jsx** - Top navigation bar
  - Hospital logo/name
  - User info display
  - Logout button
  
- **Sidebar.jsx** - Left navigation menu
  - Dashboard link
  - Patients link
  - Doctors link
  - Appointments link
  - Profile link
  - Active route highlighting
  - Toggle for mobile
  
- **Layout.jsx** - Main layout wrapper
  - Combines Header and Sidebar
  - Wraps page content

#### Dashboard/
- **Dashboard.jsx** - Main dashboard page
  - Statistics cards (patients count, doctors count, appointments count)
  - Overview information
  - Responsive grid layout

#### Patients/
- **PatientsPage.jsx** - Patients management page
  - List display
  - Add patient button
  - Modal for forms
  - Error handling
  
- **PatientsList.jsx** - Table component
  - Name, email, phone, age, gender columns
  - Edit and delete buttons
  - Empty state message
  
- **PatientForm.jsx** - Add/Edit form
  - Name, email, phone, age, gender, medical history fields
  - Form validation
  - Submit/cancel buttons

#### Doctors/
- **DoctorsPage.jsx** - Doctors management page
  - List display
  - Add doctor button
  - Modal for forms
  
- **DoctorsList.jsx** - Table component
  - Name, email, specialization, phone, license columns
  - Edit and delete buttons
  
- **DoctorForm.jsx** - Add/Edit form
  - Name, email, phone, specialization, license number, qualifications

#### Appointments/
- **AppointmentsPage.jsx** - Appointments management page
  - List display
  - Schedule appointment button
  
- **AppointmentsList.jsx** - Table component
  - Patient, doctor, date/time, reason, status columns
  - Status badge with colors
  
- **AppointmentForm.jsx** - Schedule/Edit form
  - Patient ID, doctor ID, date/time, reason, status, notes

#### Profile/
- **ProfilePage.jsx** - User profile page
  - View mode with user info
  - Edit mode with form
  - Avatar display
  - Role badge

### Services (src/services/)

- **api.js** - Axios configuration
  - Base URL configuration
  - Request interceptors (auth token)
  - Response interceptors (401 handling)
  
- **authService.js** - Authentication service
  - register(userData)
  - login(email, password)
  - logout()
  - getCurrentUser()
  - isAuthenticated()
  
- **patientService.js** - Patient CRUD
  - getAllPatients()
  - getPatientById(id)
  - createPatient(data)
  - updatePatient(id, data)
  - deletePatient(id)
  
- **doctorService.js** - Doctor CRUD
  - getAllDoctors()
  - getDoctorById(id)
  - createDoctor(data)
  - updateDoctor(id, data)
  - deleteDoctor(id)
  
- **appointmentService.js** - Appointment CRUD
  - getAllAppointments()
  - getAppointmentById(id)
  - createAppointment(data)
  - updateAppointment(id, data)
  - deleteAppointment(id)
  - getAppointmentsByDoctor(doctorId)
  - getAppointmentsByPatient(patientId)

### Styles (src/styles/)

- **index.css** - Global styles
  - CSS variables (colors, shadows, etc.)
  - Reset styles
  - Base button styles
  - Utility classes
  
- **auth.css** - Authentication styling
  - Login/register forms
  - Auth container
  - Form styling
  
- **layout.css** - Layout styling
  - Header styling
  - Sidebar styling
  - Navigation
  - Responsive breakpoints
  
- **dashboard.css** - Dashboard styling
  - Stats cards
  - Grid layouts
  - Info sections
  
- **components.css** - Component styling
  - Tables
  - Forms
  - Modals
  - Badges and status indicators
  - Profile sections

### Configuration Files

- **package.json** - NPM dependencies and scripts
  - React 18.2
  - React Router 6
  - Axios
  - Vite
  
- **vite.config.js** - Vite build configuration
  - React plugin
  - Dev server config
  - API proxy setup
  
- **index.html** - HTML entry point
  - Root div for React
  - Script tag for main.jsx
  
- **Dockerfile** - Docker build file
  - Multi-stage build
  - Node build stage
  - Serve production stage
  
- **.env.example** - Environment template
  - VITE_API_URL
  
- **.gitignore** - Git ignore patterns
- **.dockerignore** - Docker ignore patterns

## Component Relationships

```
App.jsx
├── Routes
│   ├── /login → Login
│   ├── /register → Register
│   └── Protected Routes (ProtectedRoute)
│       ├── /dashboard → Layout → Dashboard
│       ├── /patients → Layout → PatientsPage → PatientsList + PatientForm
│       ├── /doctors → Layout → DoctorsPage → DoctorsList + DoctorForm
│       ├── /appointments → Layout → AppointmentsPage → AppointmentsList + AppointmentForm
│       └── /profile → Layout → ProfilePage
└── Layout
    ├── Header (user info, logout)
    └── Sidebar (navigation)
```

## API Integration Flow

1. **Authentication**
   - Login → authService → api → store token in localStorage

2. **Protected Routes**
   - ProtectedRoute checks localStorage for token
   - Redirects to login if not authenticated

3. **Data Fetching**
   - Components call service methods
   - Services use axios api instance
   - API interceptors add token to requests
   - Handle responses and errors

4. **CRUD Operations**
   - List: Service.getAll() on component mount
   - Add: Form submit → Service.create() → Refresh list
   - Edit: Pre-fill form → Service.update() → Refresh list
   - Delete: Confirmation → Service.delete() → Refresh list

## Styling System

### CSS Variables (Global)
- `--primary-color`: #3498db (blue)
- `--secondary-color`: #2ecc71 (green)
- `--danger-color`: #e74c3c (red)
- `--warning-color`: #f39c12 (orange)
- `--dark-color`: #2c3e50 (dark)
- `--light-color`: #ecf0f1 (light)
- `--border-color`: #bdc3c7 (border)
- `--shadow`: 0 2px 8px rgba(0, 0, 0, 0.1)
- `--shadow-lg`: 0 4px 16px rgba(0, 0, 0, 0.15)

### Responsive Breakpoints
- Mobile: < 600px
- Tablet: 600px - 768px
- Desktop: > 768px

## Getting Started

1. Install dependencies: `npm install`
2. Copy .env.example to .env
3. Update API URL in .env if needed
4. Run dev server: `npm run dev`
5. Build: `npm run build`

## Development Tips

- All components are functional components with React Hooks
- State management using useState
- Side effects with useEffect
- Custom hooks can be added in src/hooks/
- Services are singleton-like objects
- Styling is modular and component-based
- No external UI libraries used
