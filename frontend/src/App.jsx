import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// App pages
import Dashboard from './pages/app/Dashboard';
import DSATracker from './pages/app/DSATracker';
import JobTracker from './pages/app/JobTracker';
import Notes from './pages/app/Notes';

// Landing page
import Landing from './pages/Landing';

// 404
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '8px',
                fontSize: '13px',
              },
            }}
          />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/dsa" element={
              <ProtectedRoute><DSATracker /></ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute><JobTracker /></ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute><Notes /></ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;