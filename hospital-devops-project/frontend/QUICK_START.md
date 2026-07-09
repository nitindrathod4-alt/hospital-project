# Hospital Management System Frontend - Quick Start Guide

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn
- Backend API running on http://localhost:5000

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run Development Server
```bash
npm run dev
```

Access the app at: **http://localhost:3000**

---

## 📁 Folder Structure at a Glance

```
src/
├── components/         ← All React components
│   ├── Auth/          ← Login, Register, route protection
│   ├── Layout/        ← Header, Sidebar, main layout
│   ├── Dashboard/     ← Statistics overview
│   ├── Patients/      ← Patient list, form, page
│   ├── Doctors/       ← Doctor list, form, page
│   ├── Appointments/  ← Appointment list, form, page
│   └── Profile/       ← User profile page
├── services/          ← API service layer
│   ├── api.js        ← Axios configuration
│   └── *Service.js   ← Domain-specific services
└── styles/           ← CSS stylesheets
```

---

## 🔐 Authentication Flow

### Login
1. User enters email and password
2. Clicks "Login"
3. authService.login() sends request
4. Token received and stored in localStorage
5. User redirected to dashboard

### Protected Routes
- ProtectedRoute checks if token exists
- If no token → redirect to login
- If token → allow access
- 401 response → clear token & redirect to login

### Logout
- Click logout button
- Token removed from localStorage
- Redirected to login page

---

## 📊 Dashboard

**Features:**
- Total patients count
- Total doctors count
- Total appointments count
- Welcome message

**Data Source:** Fetches from all resources on component mount

---

## 👥 Patients Management

### List View
```
Column Headers: Name | Email | Phone | Age | Gender | Actions
Actions: Edit | Delete
```

### Add Patient
- Click "+ Add Patient" button
- Fill form with patient details
- Submit to create

### Edit Patient
- Click "Edit" in table row
- Modify details
- Click "Update Patient"

### Delete Patient
- Click "Delete" in table row
- Confirm deletion
- Patient removed

**Form Fields:**
- Name (required)
- Email (required)
- Phone
- Age
- Gender (Male/Female/Other)
- Medical History

---

## 👨‍⚕️ Doctors Management

### List View
```
Column Headers: Name | Email | Specialization | Phone | License | Actions
```

### Add Doctor
- Click "+ Add Doctor" button
- Fill form with doctor details
- Submit to create

### Edit Doctor
- Click "Edit" in table row
- Modify details
- Click "Update Doctor"

### Delete Doctor
- Click "Delete" in table row
- Confirm deletion
- Doctor removed

**Form Fields:**
- Name (required)
- Email (required)
- Phone
- Specialization
- License Number
- Qualifications

---

## 📅 Appointments Management

### List View
```
Column Headers: Patient | Doctor | Date & Time | Reason | Status | Actions
Status Colors: Scheduled (blue) | Completed (green) | Cancelled (red)
```

### Schedule Appointment
- Click "+ Schedule Appointment" button
- Fill form with:
  - Patient ID
  - Doctor ID
  - Date & Time
  - Reason
  - Status
  - Notes
- Submit to schedule

### Edit Appointment
- Click "Edit" in table row
- Modify details
- Click "Update Appointment"

### Delete Appointment
- Click "Delete" in table row
- Confirm deletion
- Appointment removed

**Status Options:**
- Scheduled
- Completed
- Cancelled
- No-Show

---

## 👤 User Profile

### View Profile
- Click "Profile" in sidebar
- See user information:
  - Avatar (first letter of name)
  - Full name
  - Email
  - Role (patient/doctor/admin)
  - Phone (if available)

### Edit Profile
- Click "Edit Profile" button
- Modify:
  - Name
  - Phone
- Email is read-only
- Click "Save Changes"

---

## 🎨 Styling System

### Color Variables
```css
--primary-color: #3498db       /* Main blue */
--secondary-color: #2ecc71     /* Green */
--danger-color: #e74c3c        /* Red */
--warning-color: #f39c12       /* Orange */
--dark-color: #2c3e50          /* Dark */
--light-color: #ecf0f1         /* Light */
```

### Responsive Design
- Mobile: < 600px
- Tablet: 600px - 768px
- Desktop: > 768px

### Layout
- Header: Fixed at top
- Sidebar: Collapsible on mobile
- Main content: Scrollable
- Modals: Overlay on content

---

## 🔧 API Service Structure

### authService
```javascript
authService.register(userData)     // Create account
authService.login(email, password)  // Login
authService.logout()                // Logout
authService.getCurrentUser()        // Get logged-in user
authService.isAuthenticated()       // Check if logged in
```

### patientService
```javascript
patientService.getAllPatients()     // GET /patients
patientService.getPatientById(id)   // GET /patients/:id
patientService.createPatient(data)  // POST /patients
patientService.updatePatient(id, data)  // PUT /patients/:id
patientService.deletePatient(id)    // DELETE /patients/:id
```

### doctorService
```javascript
doctorService.getAllDoctors()       // GET /doctors
doctorService.getDoctorById(id)     // GET /doctors/:id
doctorService.createDoctor(data)    // POST /doctors
doctorService.updateDoctor(id, data)    // PUT /doctors/:id
doctorService.deleteDoctor(id)      // DELETE /doctors/:id
```

### appointmentService
```javascript
appointmentService.getAllAppointments()  // GET /appointments
appointmentService.getAppointmentById(id)    // GET /appointments/:id
appointmentService.createAppointment(data)   // POST /appointments
appointmentService.updateAppointment(id, data)  // PUT /appointments/:id
appointmentService.deleteAppointment(id)    // DELETE /appointments/:id
appointmentService.getAppointmentsByDoctor(id)  // GET /appointments/doctor/:id
appointmentService.getAppointmentsByPatient(id) // GET /appointments/patient/:id
```

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t hospital-frontend .
```

### Run Docker Container
```bash
docker run -p 3000:3000 hospital-frontend
```

Access at: http://localhost:3000

### Docker Compose (Optional)
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:5000/api
    depends_on:
      - backend
```

---

## 🛠️ Development Scripts

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint (if configured)
```

---

## 📝 Common Tasks

### Add a New Page
1. Create component in `src/components/FeatureName/`
2. Import in `App.jsx`
3. Add route in App.jsx
4. Add navigation link in Sidebar.jsx

### Add a New API Service
1. Create `featureService.js` in `src/services/`
2. Use `api` instance from `api.js`
3. Export service object with methods
4. Import in components as needed

### Customize Styling
1. Edit CSS files in `src/styles/`
2. Update CSS variables for global colors
3. Add component-specific styles to relevant CSS file

### Handle Form Validation
1. Add validation logic in form handlers
2. Show error messages to users
3. Disable submit button during submission

---

## 🐛 Troubleshooting

### "API not found" Error
- Check backend is running on http://localhost:5000
- Verify VITE_API_URL in .env is correct
- Check backend CORS settings

### "Token expired" Error
- Clear localStorage and re-login
- Check token expiry time on backend
- Verify JWT secret matches

### "Module not found" Error
- Run `npm install` to install dependencies
- Clear node_modules and reinstall if persistent
- Check imports have correct paths

### Styles not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check CSS file imports in components

---

## 📚 Additional Resources

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Vite Docs: https://vitejs.dev
- Axios Docs: https://axios-http.com

---

## 💡 Tips & Best Practices

1. **State Management**: Use useState for local state, consider Context API for global state
2. **Error Handling**: Always handle errors in service calls
3. **Loading States**: Show loading indicators during async operations
4. **User Feedback**: Display success/error messages to users
5. **Validation**: Validate forms on client-side before submission
6. **Security**: Never store sensitive data in localStorage (except auth token)
7. **Performance**: Use lazy loading for images and components
8. **Testing**: Add tests as the project grows
