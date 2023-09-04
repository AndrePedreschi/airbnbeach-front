import { Form } from "../Components/Form";
import 'react-toastify/dist/ReactToastify.css';
import "./CreateUser.scss";
import { Loading } from "../Components/Loading";
import { useAuth } from "../contexts/auth";

export function CreateUser() {
    const { loading } = useAuth();
    
    return (
        <section className="createUserPage">
            <Loading loading={loading} />
            <Form type={'createUser'} />
        </section>
    )
}