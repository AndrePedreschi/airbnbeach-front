import { useNavigate } from "react-router-dom";
import { X } from 'phosphor-react'
import "./Header.scss";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'


export function Header() {
  const { auth, user, userLogout, urlPath, setUrlPath } = useAuth();
  const navigate = useNavigate();
  
  function logout() {

    Swal.fire({
      title: 'Deseja realmente sair?',
      width: '360',
      color: '#545776',
      icon: 'question',
      focusCancel: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        userLogout()
        navigate('/home')
        setUrlPath(window.location.pathname)
      } else {
        return
      }
    })
  }

  function changeScreen(type) {

    if (type === 'login') {
      navigate('/login')
      setUrlPath(window.location.pathname)
    }
    if (type === 'createUser') {
      navigate('/createUser')
      setUrlPath(window.location.pathname)
    }
    if (type === 'home') {
      navigate('/home')
      setUrlPath(window.location.pathname)
    }
  }


  return (
    <section className="headerFull">
      <section className="logoSection">
        <div onClick={() => changeScreen('home')} className="logoImg" ></div>
        <h2 className="logoTagline">Sinta-se em casa</h2>
      </section>

      <div className="asideHolder" type={urlPath}>

        {(auth && user !== "" )&& (
          <div className="loggedIn">
            <p className="profilePicture">{user.nome[0]}{user.sobrenome[0]}</p>

            <div className="greetingAndName">
              <p className="">Olá,</p>
              <p className="greetingAndNameGreen">{user.nome} {user.sobrenome}</p>
            </div>
            <X onClick={logout} alt="Sair" weight="bold" className="btnLoggout" />
          </div>
        )}

        {!auth &&
          <div className="btnContainer">
            {urlPath !== '/createUser' &&
              <button className='btnHeader' onClick={() => changeScreen('createUser')}>Criar conta</button>
            }

            {urlPath !== '/login' &&
              <button className='btnHeader' onClick={() => changeScreen('login')}>Iniciar sessão</button>
            }
          </div>

        }

      </div>
    </section>
  );
}
