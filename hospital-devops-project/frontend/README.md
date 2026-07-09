# Hospital Management System - React Frontend

A complete React.js frontend for Hospital Management System with modern UI, routing, authentication, and CRUD operations.

## Features

- 🔐 **Authentication**: Login and Register with JWT tokens
- 👥 **Patients Management**: View, add, edit, and delete patient records
- 👨‍⚕️ **Doctors Management**: Manage doctor profiles and specializations
- 📅 **Appointments**: Schedule and manage appointments
- 👤 **User Profile**: View and edit user profile
- 📊 **Dashboard**: Overview with statistics
- 📱 **Responsive Design**: Mobile-friendly interface

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Patients/
│   │   │   ├── PatientsPage.jsx
│   │   │   ├── PatientsList.jsx
│   │   │   └── PatientForm.jsx
│   │   ├── Doctors/
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── DoctorsList.jsx
│   │   │   └── DoctorForm.jsx
│   │   ├── Appointments/
│   │   │   ├── AppointmentsPage.jsx
│   │   │   ├── AppointmentsList.jsx
│   │   │   └── AppointmentForm.jsx
│   │   └── Profile/
│   │       └── ProfilePage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── patientService.js
│   │   ├── doctorService.js
│   │   └── appointmentService.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── auth.css
│   │   ├── layout.css
│   │   ├── dashboard.css
│   │   └── components.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── .dockerignore
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

Build for production:

```bash
npm run build
```

## Docker

Build Docker image:

```bash
docker build -t hospital-frontend .
```

Run Docker container:

```bash
docker run -p 3000:3000 hospital-frontend
```

## Technologies Used

- **React** 18.2.0 - UI framework
- **React Router** 6.14 - Client-side routing
- **Axios** 1.4 - HTTP client
- **Vite** 4.4 - Build tool
- **CSS3** - Styling (no external CSS libraries)

## API Endpoints

The frontend expects the following API endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Patients
- `GET /patients` - Get all patients
- `GET /patients/:id` - Get patient by ID
- `POST /patients` - Create new patient
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient

### Doctors
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get doctor by ID
- `POST /doctors` - Create new doctor
- `PUT /doctors/:id` - Update doctor
- `DELETE /doctors/:id` - Delete doctor

### Appointments
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment
- `GET /appointments/doctor/:doctorId` - Get doctor appointments
- `GET /appointments/patient/:patientId` - Get patient appointments

## Features Details

### Authentication
- JWT token stored in localStorage
- Protected routes with ProtectedRoute component
- Auto logout on 401 response
- Login/Register pages with form validation

### CRUD Operations
- List view with table display
- Add new records via modal forms
- Edit existing records
- Delete records with confirmation
- Error handling and user feedback

### Styling
- Modern CSS with CSS variables
- Responsive grid and flexbox layouts
- Smooth animations and transitions
- Professional color scheme
- Mobile-friendly design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
