import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/custom/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />
  }
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  )
}

export default App