# CareerConnect Client

A modern React-based job portal application built with TailwindCSS.

## Features

### Authentication
- User registration with role selection (Candidate/Company)
- JWT-based login/logout
- Protected routes based on user roles

### For Candidates
- **Profile Management**: Create and edit professional profiles
- **Resume Upload**: Upload PDF/DOCX resumes with parsing
- **Job Search**: Advanced search with filters (skills, location, salary, etc.)
- **Job Applications**: Apply to jobs and track application status
- **Application History**: View all applications with status tracking

### For Companies
- **Job Posting**: Create and manage job listings
- **Applicant Management**: View and manage job applicants
- **Company Dashboard**: Centralized management interface

### General Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern UI**: Clean, professional interface
- **Real-time Updates**: Application status tracking
- **Search & Filters**: Advanced job search capabilities

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: TailwindCSS with custom components
- **Routing**: React Router v6
- **HTTP Client**: Axios with credentials support
- **State Management**: React Context API
- **Authentication**: JWT stored in HTTP-only cookies

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── JobFilterSidebar.jsx
│   ├── ResumeUploader.jsx
│   └── ApplicationStatusBadge.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── JobSearch.jsx
│   ├── JobDetails.jsx
│   ├── Profile.jsx
│   └── Applications.jsx
├── context/            # React Context providers
│   └── AuthContext.js
├── services/           # API service layer
│   └── api.js
└── utils/              # Utility functions
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install TailwindCSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## API Integration

The application is designed to work with a backend API. All API calls are configured in `src/services/api.js` with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### Jobs
- `GET /jobs` - Get jobs with filters
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create job (companies only)
- `POST /jobs/:id/apply` - Apply to job

### Applications
- `GET /applications/my` - Get user's applications
- `PATCH /applications/:id` - Update application status

### Profile
- `PUT /profile` - Update user profile
- `POST /profile/resume` - Upload resume

## Mock Data

The application includes mock data for development and testing:
- Sample job listings with realistic data
- Mock user profiles and applications
- Placeholder company information

## Key Components

### JobCard
Displays job information in a card format with:
- Job title, company, and location
- Salary range and posting date
- Required skills as tags
- Apply button and job type indicators

### JobFilterSidebar
Advanced filtering options including:
- Location search
- Experience level selection
- Job type checkboxes
- Salary range inputs
- Skills selection

### ResumeUploader
Drag-and-drop resume upload with:
- File validation (PDF/DOCX, max 5MB)
- Upload progress indication
- Parsed resume data display
- Current resume preview

### ApplicationStatusBadge
Visual status indicators for applications:
- Color-coded status badges
- Icons for different statuses
- Consistent styling across the app

## Styling Guidelines

### TailwindCSS Classes
- **Primary Colors**: `primary-50` to `primary-700`
- **Cards**: `card` class for consistent styling
- **Buttons**: `btn-primary` and `btn-secondary` classes
- **Inputs**: `input-field` class for form elements

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible grid layouts
- Collapsible navigation for mobile

## Development Notes

### Authentication Flow
1. User registers/logs in
2. JWT token stored in HTTP-only cookie
3. All API requests include credentials
4. Auth context manages user state
5. Protected routes check authentication

### State Management
- React Context for global state (auth, user)
- Local state for component-specific data
- API calls with error handling
- Loading states for better UX

### Error Handling
- Try-catch blocks for API calls
- User-friendly error messages
- Fallback to mock data when API fails
- Form validation with error display

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Toast notifications
- [ ] Job recommendations
- [ ] Advanced resume parsing
- [ ] Real-time chat/messaging
- [ ] Email notifications
- [ ] Social media integration
- [ ] Advanced analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.