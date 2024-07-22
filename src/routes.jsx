import App from './components/App';
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
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route path="signup" element={<SignupForm />} />
        <Route index path="signin" element={<SigninForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="chats/global" replace />} />
        <Route path="chats/:chatName" element={<Chat />} />
        <Route path="users/:username" element={<ProfilePage />} />
      </Route>
    </Route>,
  ),
);

export default router;
