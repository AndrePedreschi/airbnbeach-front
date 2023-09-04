import { Form } from "../Components/Form";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.scss";
import { Loading } from "../Components/Loading";
import { useAuth } from "../contexts/auth";

export function Login() {
  const { loading } = useAuth();
  
  return (
    <section className="loginPage">
      <Loading loading={loading} />
      <Form type={'login'} />
    </section>
  )
}