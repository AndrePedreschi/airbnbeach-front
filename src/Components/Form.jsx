import { useState } from "react";
import axios from "axios";
import './Form.scss'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from 'phosphor-react'
import { useAuth } from "../contexts/auth";

export function Form({ type }) {

    const { saveToken, saveUser, user, urlBase } = useAuth();
    const navigate = useNavigate();

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!+¨:=/@|#\$%\^&\*])(?=.*[0-9]).{8,}$");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirnPassword, setConfirnPassword] = useState("");
    const [show, setShow] = useState(false);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    function cleanForm() {
        if (type === 'login') {
            setEmail('')
            setPassword('')
        } else {
            setFirstName('')
            setSurname('')
            setEmail('')
            setPassword('')
            setConfirnPassword('')
        }
    }

    function changeVisibility() {
        setShow(!show)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        let url;
        if (type === 'login') {
            url = `${urlBase}/auth/login`
        } else {
            url = `${urlBase}/auth/register`
        }

        let data;
        if (type === 'login') {
            data = {
                email: email,
                senha: password
            }
        } else {
            data = {
                nome: firstName,
                sobrenome: surname,
                email: email,
                senha: password
            }
        }

        axios.post(url, data).then((response) => {

            if (type === 'login') {

                saveToken(response.data.token)

                axios.get(`${urlBase}/auth/search?email=${email}`)
                    .then(
                        (response) => {

                            saveUser(response.data)
                            //saveUser(...user, {role:adimin})
                            toast.success("Usuário logado com sucesso")
                            navigate('/home')
                        }, (error) => {
                            if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
                        })
            } else {
                toast.success("Usuário criado com sucesso")
                navigate('/login')
            }

        }, (error) => {

            if (type === 'login') {
                //if (error.status == 404) return setStatus({ type: 'loginError', message: 'Usuário não encontrado' });
                //if (error.status == 404) return setStatus({ type: 'loginError', message: 'Usuário ou senha não encontrados.' });
                if (error.request.status == 403) return toast.error('Usuário não encontrado');
                if (error.status == 404) return toast.error('Usuário ou senha não encontrados');
                if (error.code === 'ERR_NETWORK') return toast.error('Infelizmente não foi possivel logar. Por favor, tente novamente mais tarde.');
            } else {
                //if (error.status == 403) return toast.error('Usuário não encontrado');
                if (error.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
                if (error.code === 'ERR_NETWORK') return toast.error('Infelizmente não foi possivel registrar. Por favor, tente novamente mais tarde.');
            }
        });

        cleanForm();
    }

    function validate(input) {

        switch (input) {
            case 'firstName':
                if (firstName === '') return setStatus({ type: 'firstNameError', message: 'Este campo é obrigatório' });
                if (firstName.length < 4) return setStatus({ type: 'firstNameError', message: 'O nome precisa ter mais de 3 letras' });
                if (firstName == undefined || firstName === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;
            case 'surname':
                if (surname === '') return setStatus({ type: 'surnameError', message: 'Este campo é obrigatório' });
                if (surname.length < 4) return setStatus({ type: 'surnameError', message: 'O sobrenome precisa ter mais de 3 letras' });
                if (surname == undefined || surname === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;
            case 'email':
                if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
                if (email == undefined || email === null) return setStatus({ type: 'emailError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;
            case 'password':
                if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                if (type === 'login') {
                    if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                    if (password == undefined || password === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                } else {
                    if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                    if (!password.match(strongRegex)) return setStatus({ type: 'passwordError', message: 'A senha deve conter pelo menos um número, 7 letras, letra maiúscula múscula e um caracter especial (!@#$%¨&*()/+|:)' });
                    if (confirnPassword !== '' && confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
                    if (password == undefined || password === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                }
                break;
            case 'confirnPassword':
                if (confirnPassword === '') return setStatus({ type: 'confirnPasswordError', message: 'Este campo é obrigatório' });
                if (confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
                if (confirnPassword == undefined || confirnPassword === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;
            default:
                if (type === 'login') {
                    if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
                    if (email == undefined || email === null) return setStatus({ type: 'emailError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                    if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                    if (password == undefined || password === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                } else {
                    if (firstName === '') return setStatus({ type: 'firstNameError', message: 'Este campo é obrigatório' });
                    if (firstName.length < 4) return setStatus({ type: 'firstNameError', message: 'O nome precisa ter mais de 3 letras' });
                    if (firstName == undefined || firstName === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                    if (surname === '') return setStatus({ type: 'surnameError', message: 'Este campo é obrigatório' });
                    if (surname.length < 4) return setStatus({ type: 'surnameError', message: 'O sobrenome precisa ter mais de 3 letras' });
                    if (surname == undefined || surname === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                    if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
                    if (email == undefined || email === null) return setStatus({ type: 'emailError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                    if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                    if (!password.match(strongRegex)) return setStatus({ type: 'passwordError', message: 'A senha deve conter pelo menos um número, 7 letras, letra maiúscula múscula e um caracter especial (!@#$%¨&*()/+|:)' });
                    if (password == undefined || password === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                    if (confirnPassword === '') return setStatus({ type: 'confirnPasswordError', message: 'Este campo é obrigatório' });
                    if (confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
                    if (confirnPassword == undefined || confirnPassword === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                }
                break;
        }
        setStatus({
            type: '',
            message: ''
        })
        return true;
    }

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            {type && type === "createUser" && <h1>Criar conta</h1>}
            {type && type === "login" && <h1>Iniciar Sessão</h1>}
            {type && type === "createUser" &&
                <div className="containerInputs">
                    <div className="errorContainer">
                        <div className="inputs">
                            <label htmlFor="firstName" className="text-small">Nome</label>
                            <input
                                className="text-small"
                                type="text"
                                placeholder="Primeiro nome"
                                name="firstName"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onBlur={() => validate('firstName')}
                            />
                        </div>
                        {status.type === 'firstNameError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'surnameError' ? <p className="text-small errorSpace" style={{ color: '#ffffff00' }}>{status.message}</p> : ""}
                    </div>

                    <div className="errorContainer">
                        <div className="inputs">
                            <label htmlFor="surname" className="text-small">Sobrenome</label>
                            <input
                                className="text-small"
                                type="text"
                                placeholder="Último nome"
                                name="surname"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                onBlur={() => validate('surname')}
                            />
                        </div>
                        {status.type === 'surnameError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'firstNameError' ? <p className="text-small errorSpace" style={{ color: '#ffffff00' }}>{status.message}</p> : ""}
                    </div>
                </div>
            }

            <div className="inputs">
                <label htmlFor="email" className="text-small">Email</label>
                <input
                    className="text-small"
                    type="email"
                    placeholder="Email que mais usa"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => validate('email')}
                />
            </div>
            {status.type === 'emailError' ? <p className="text-small errorMsg">{status.message}</p> : ""}

            <div className="inputs">
                <label htmlFor="password" className="text-small">Senha</label>
                <input
                    className="text-small"
                    type={show ? 'text' : 'password'}
                    placeholder="Digite a sua senha"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => validate('password')}
                />
                <div className="icontainer">
                    {
                        show ?
                            <Eye size={24} className="iconStyle" onClick={changeVisibility} /> :
                            <EyeSlash size={24} className="iconStyle" onClick={changeVisibility} />
                    }
                </div>
            </div>
            {status.type === 'passwordError' ? <p className="text-small errorMsg">{status.message}</p> : ""}

            {type && type === "createUser" &&
                <>
                    <div className="inputs">
                        <label htmlFor="confirnPassword" className="text-small">Confirmar senha</label>
                        <input
                            className="text-small"
                            type={show ? 'text' : 'Password'}
                            placeholder="Confirme a sua senha"
                            name="confirnPassword"
                            id="confirnPassword"
                            value={confirnPassword}
                            onChange={(e) => setConfirnPassword(e.target.value)}
                            onBlur={() => validate('confirnPassword')}
                        />
                    </div>
                    {status.type === 'confirnPasswordError' ? <p className="text-small errorMsg" style={{ alignSelf: 'flex-end' }}>{status.message}</p> : ""}
                </>
            }

            {type && type === "createUser" &&
                <>
                    <button className="btn" type="submit"> Criar conta </button>
                    <p className="text-small">
                        Já tem uma conta?
                        <Link to={'/login'} className='linkStyle'>Iniciar sessão</Link>
                    </p>
                </>
            }

            {type && type === "login" &&
                <>
                    <button className="btn" type="submit"> Entrar </button>
                    <p className="text-small">
                        Ainda não tem conta?
                        <Link to={'/createUser'} className='linkStyle'>Registre-se.</Link>
                    </p>
                </>
            }

        </form>
    )
}