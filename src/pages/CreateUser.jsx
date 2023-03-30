import { Form } from "../Components/Form";
import 'react-toastify/dist/ReactToastify.css';
import "./CreateUser.scss";

export function CreateUser() {

    return (
        <section className="createUserPage">

            <Form type={'createUser'} />
        </section>
    )
}