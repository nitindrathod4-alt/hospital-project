# 🏥 Hospital Management System - Frontend Index

## Quick Navigation

### 📚 Documentation
- **[README.md](./README.md)** - Complete project documentation
- **[QUICK_START.md](./QUICK_START.md)** - Installation & usage guide
- **[STRUCTURE.md](./STRUCTURE.md)** - Detailed file structure

### 🚀 Getting Started
```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
```

---

## 📂 Source Code Organization

### Components (`src/components/`)

#### 🔐 Authentication (`Auth/`)
| File | Purpose |
|------|---------|
| `Login.jsx` | User login form |
| `Register.jsx` | User registration form |
| `ProtectedRoute.jsx` | Route guard component |

#### 🎨 Layout (`Layout/`)
| File | Purpose |
|------|---------|
| `Header.jsx` | Top navigation bar |
| `Sidebar.jsx` | Side navigation menu |
| `Layout.jsx` | Main layout wrapper |

#### 📊 Pages
| Feature | Page | List | Form |
|---------|------|------|------|
| Dashboard | `Dashboard/Dashboard.jsx` | - | - |
| Patients | `Patients/PatientsPage.jsx` | `PatientsList.jsx` | `PatientForm.jsx` |
| Doctors | `Doctors/DoctorsPage.jsx` | `DoctorsList.jsx` | `DoctorForm.jsx` |
| Appointments | `Appointments/AppointmentsPage.jsx` | `AppointmentsList.jsx` | `AppointmentForm.jsx` |
| Profile | `Profile/ProfilePage.jsx` | - | (inline) |

### Services (`src/services/`)

| Service | Methods |
|---------|---------|
| `api.js` | Axios config, interceptors |
| `authService.js` | register, login, logout, getCurrentUser, isAuthenticated |
| `patientService.js` | getAllPatients, getPatientById, createPatient, updatePatient, deletePatient |
| `doctorService.js` | getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor |
| `appointmentService.js` | getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByDoctor, getAppointmentsByPatient |

### Styles (`src/styles/`)

| File | Contains |
|------|----------|
| `index.css` | Global styles, CSS variables, base styles |
| `auth.css` | Login/Register page styling |
| `layout.css` | Header, Sidebar, navigation styling |
| `dashboard.css` | Dashboard and stats styling |
| `components.css` | Tables, forms, modals, badges |
| `App.css` | App wrapper styling |

### Core Files

| File | Purpose |
|------|---------|
| `App.jsx` | Main app component with routing |
| `main.jsx` | Vite entry point |

---

## 🔄 Application Flow

```
┌─────────────────────────────────────┐
│   index.html (Entry Point)          │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   main.jsx (React Mount)            │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   App.jsx (Router Setup)            │
└─┬───┬──────┬────────┬───────────┬──┘
  │   │      │        │           │
  ▼   ▼      ▼        ▼           ▼
Login Reg Dashboard Patients Doctors Appts Profile
  │     │      │        │       │      │
  └─────┴──────┴────────┴───────┴──────┴────────────────┐
         (All Protected by ProtectedRoute)              │
                                                        ▼
                                    ┌──────────────────────────────┐
                                    │   Layout (Header + Sidebar)  │
                                    └──────────────────────────────┘
```

---

## 🔐 Authentication & Authorization

### Login Flow
```
User Input → Login Component → authService.login()
    ↓
API Call (/auth/login) → Response with token
    ↓
Store token in localStorage → Navigate to Dashboard
```

### Protected Routes
```
User accesses /patients → ProtectedRoute checks token
    ├─ Token exists → Render Dashboard
    └─ Token missing → Redirect to /login
```

### API Authorization
```
Every request → api.js interceptor → Adds "Authorization: Bearer {token}"
Response 401 → Remove token → Redirect to login
```

---

## 🎯 Component Hierarchy

```
App
├── Routes
│   ├── /login → Login
│   ├── /register → Register
│   └── ProtectedRoute
│       ├── /dashboard → Layout → Dashboard
│       ├── /patients → Layout → PatientsPage
│       │   ├── PatientsList
│       │   └── PatientForm (modal)
│       ├── /doctors → Layout → DoctorsPage
│       │   ├── DoctorsList
│       │   └── DoctorForm (modal)
│       ├── /appointments → Layout → AppointmentsPage
│       │   ├── AppointmentsList
│       │   └── AppointmentForm (modal)
│       └── /profile → Layout → ProfilePage
│
Layout
├── Header
│   ├── Logo
│   ├── User Info
│   └── Logout Button
└── Sidebar
    ├── Dashboard Link
    ├── Patients Link
    ├── Doctors Link
    ├── Appointments Link
    └── Profile Link
```

---

## 📊 Data Flow

### CRUD Operations Pattern

```
Component (PatientsPage)
    ↓
Call Service (patientService.getAllPatients())
    ↓
Service uses axios (api instance)
    ↓
API Interceptor adds token header
    ↓
Backend API response
    ↓
Handle response/error in Component
    ↓
Update state (setPatients)
    ↓
Re-render with new data
```

### Form Submission Pattern

```
User fills form → handleSubmit()
    ↓
Validate form data
    ↓
Call service (create/update/delete)
    ↓
Service makes API request
    ↓
Handle response → Show success/error message
    ↓
Refresh data (re-fetch list)
    ↓
Close modal/form
```

---

## 🎨 Styling Architecture

### CSS Organization
- **Global Variables** (index.css) - Colors, shadows, etc.
- **Page/Component Styles** - Specific CSS files for each section
- **Responsive Design** - Mobile-first approach with breakpoints

### Color Scheme
```
Primary:   #3498db (Blue)     → Main actions, links
Secondary: #2ecc71 (Green)    → Success, completed
Danger:    #e74c3c (Red)      → Delete, error
Warning:   #f39c12 (Orange)   → Warning, attention
Dark:      #2c3e50 (Dark)     → Text, headings
Light:     #ecf0f1 (Light)    → Backgrounds, borders
```

### Responsive Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 768px
- **Desktop**: > 768px

---

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start Vite dev server on port 3000
```

### Production
```bash
npm run build        # Create optimized build in dist/
npm run preview      # Preview production build locally
```

### Docker
```bash
docker build -t hospital-frontend .    # Build image
docker run -p 3000:3000 hospital-frontend  # Run container
```

---

## 📝 Configuration Files Explained

| File | Purpose | Key Configs |
|------|---------|-------------|
| `package.json` | Project metadata & dependencies | React, Router, Axios, Vite |
| `vite.config.js` | Build configuration | Dev server, proxy, build output |
| `index.html` | HTML entry point | Root div, script tag |
| `.env.example` | Environment template | API URL |
| `Dockerfile` | Container build | Multi-stage build, Node + Serve |

---

## 🔗 API Endpoints Expected

### Authentication
```
POST /auth/login       - User login
POST /auth/register    - User registration
```

### Patients
```
GET    /patients       - List all
GET    /patients/:id   - Get one
POST   /patients       - Create
PUT    /patients/:id   - Update
DELETE /patients/:id   - Delete
```

### Doctors
```
GET    /doctors        - List all
GET    /doctors/:id    - Get one
POST   /doctors        - Create
PUT    /doctors/:id    - Update
DELETE /doctors/:id    - Delete
```

### Appointments
```
GET    /appointments            - List all
GET    /appointments/:id        - Get one
POST   /appointments            - Create
PUT    /appointments/:id        - Update
DELETE /appointments/:id        - Delete
GET    /appointments/doctor/:id      - Get by doctor
GET    /appointments/patient/:id     - Get by patient
```

---

## 💡 Development Tips

### Add New Component
1. Create folder in `src/components/FeatureName/`
2. Create component file(s)
3. Create corresponding CSS file(s)
4. Import in `App.jsx`
5. Add route and sidebar link

### Add New Service
1. Create `featureService.js` in `src/services/`
2. Import `api` from `./api`
3. Create methods using `api.get/post/put/delete()`
4. Export service object
5. Import and use in components

### Debug API Calls
- Open browser DevTools (F12)
- Go to Network tab
- Look for API calls
- Check headers for Authorization token
- View request/response in detail

### Test Styles
- Use browser DevTools Elements tab
- Inspect and modify CSS live
- Copy working styles back to CSS files

---

## 📦 Project Stats

| Metric | Count |
|--------|-------|
| React Components | 21 |
| Service Modules | 5 |
| CSS Files | 6 |
| Configuration Files | 8 |
| Documentation Files | 3 |
| Total Files | 35+ |
| Lines of Code | 2000+ |

---

## 🆘 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install` to install dependencies

### Issue: API connection error
**Solution**: Check backend is running and VITE_API_URL is correct

### Issue: Token not sent with requests
**Solution**: Check `api.js` interceptor and token in localStorage

### Issue: Styles not applying
**Solution**: Hard refresh browser (Ctrl+Shift+R) and check CSS import

### Issue: Form not submitting
**Solution**: Check browser console for errors, verify API endpoint

---

## 📞 Support & Resources

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com
- **Vite**: https://vitejs.dev

---

## ✅ Checklist Before Deployment

- [ ] Install dependencies (`npm install`)
- [ ] Update `.env` with correct API URL
- [ ] Test login/register functionality
- [ ] Test all CRUD operations
- [ ] Test responsive design on mobile
- [ ] Check for console errors
- [ ] Build project (`npm run build`)
- [ ] Test production build locally
- [ ] Build Docker image if using Docker
- [ ] Update backend API URL if needed

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Ready for Production ✅
