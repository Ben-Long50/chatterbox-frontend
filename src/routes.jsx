import App from './App';
import ErrorPage from './components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import MainLayout from './components/MainLayout';
import Chat from './components/Chat';
import ProfilePage from './components/ProfilePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route index path="signin" element={<SigninForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="chats/:chatName" element={<Chat />} />
        <Route path="users/:username" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

export default router;
