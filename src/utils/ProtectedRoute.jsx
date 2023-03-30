import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

export function ProtectedRoute({
    redirectPath = '/home',
    msg,
    type = 'swal',
    role = 'user',
    children,
}) {
    const { auth, user } = useAuth();

    if (role === 'user') {
        if (!auth) {
            {
                type === 'toast' ? toast.error(msg) :

                    Swal.fire({
                        title: msg,
                        width: '360',
                        color: '#545776',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 4000
                    })
            }

            return <Navigate to={redirectPath} replace />;
        }
    }


    if (role === 'admin') {
        if (!auth || user.role !== 'administrador') {
            {
                type === 'toast' ? toast.error(msg) :

                    Swal.fire({
                        title: msg,
                        width: '360',
                        color: '#545776',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 4000
                    })
            }

            return <Navigate to={redirectPath} replace />;
        }

    }
    
    return children;
}