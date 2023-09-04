import { Outlet } from "react-router-dom";
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Sidebar } from './Components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  
  return (
    <>
      <Header />
      <Sidebar />

      <main className="main">
        <Outlet />
      </main>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}


