import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogEditorPage from './pages/BlogEditorPage';
import AllBlogsPage from './pages/AllBlogsPage';
import BlogDetail from './pages/BlogDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/editor/:id?"
          element={
            <ProtectedRoute>
              <BlogEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <AllBlogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <BlogDetail />
            </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
