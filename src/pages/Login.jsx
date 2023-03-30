import { Form } from "../Components/Form";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.scss";

export function Login() {

  return (
    <section className="loginPage">
      <Form type={'login'} />
    </section>
  )
}