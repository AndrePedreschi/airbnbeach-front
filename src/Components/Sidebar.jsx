import "./Sidebar.scss";
import { useState, useEffect } from "react";
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo, X, CalendarCheck, SignOut, PlusCircle } from 'phosphor-react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'

export function Sidebar() {
  const { user, auth, userLogout, urlPath, setUrlPath } = useAuth();
  const navigate = useNavigate();
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [animation, setAnimation] = useState("");


  useEffect(() => {
    setUrlPath(window.location.pathname)
  }, [urlPath])

  function toggleSidebar() {
    if (!sidebarDisplay) {
      setSidebarDisplay(true);
      setAnimation("active")
    } else {
      setSidebarDisplay(false)
      setAnimation("none");
    }

    setTimeout(() => { setUrlPath('') }, 1)
  };

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
        toggleSidebar()
      } else {
        return
      }
    })
  }


  return (
    <section className="sideSection">
      <div className={`hamburger ${sidebarDisplay ? "active" : ""}`} onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <aside className={`sidebar ${animation}`}>
        <nav className="sidebarNav1">
          <X size={32} onClick={toggleSidebar} color="white" weight="bold" className="btnFechar" />

          {(auth && user) &&
            <div className="loggedIn">
              <p className="profilePicture">{user.nome[0]}{user.sobrenome[0]}</p>

              <div className="greetingAndName">
                <p className="greeting">Olá,</p>
                <p className="greetingAndNameCoral">{user.nome} {user.sobrenome}</p>
              </div>

              <div className="linksMenuHeaderHolder">
               {/*  {user.papel === "ADMIN" && */}
                  <div className="itensMenuHeader">
                    <Link to={`/administrador`} className="text-normal itensMenuHeader" onClick={toggleSidebar}>Cadastrar local <PlusCircle size={32} color="var(--grey-darkest)" /></Link>
                  </div>
               {/*  } */}

                {/* {user.papel !== "ADMIN" && */}
                  <div className="itensMenuHeader">
                    <Link to={`/reservas`} className="text-normal itensMenuHeader" onClick={toggleSidebar}>Ver reservas <CalendarCheck size={32} color="var(--grey-darkest)" />
                    </Link>
                  </div>
               {/*  } */}

                <div className="itensMenuHeader" onClick={logout}>
                  <Link className="text-normal itensMenuHeader" onClick={toggleSidebar}>Sair <SignOut size={32} color="var(--grey-darkest)" /></Link>

                </div>
              </div>


              {/* <p className="loggoutText" onClick={logout} >Deseja <a href="#" className="loggoutLink">encerrar a sessão</a>?</p> */}
            </div>
          }

          {!auth &&
            <div className="loggedOut">
              <h2 type={urlPath} className="h2Menu">MENU</h2>

              <ul className="menu">

                {urlPath !== '/createUser' && <li className="menu-item"><Link to={'/createUser'} className="menu-link" onClick={toggleSidebar}>Criar conta</Link></li>}

                {(urlPath !== '/createUser' && urlPath !== '/login') && <hr className="hrStyle1" />}

                {urlPath !== '/login' && <li className="menu-item"><Link to={'/login'} className="menu-link" onClick={toggleSidebar}>Fazer login</Link></li>}

              </ul>
            </div>
          }

          <div className="socialMidia">
            {auth && <hr className="hrStyle2" />}
            <a href="#" className="socialMediaIcon" ><FacebookLogo size={28} weight="fill" /></a>
            <a href="#" className="socialMediaIcon" ><LinkedinLogo size={25} weight="bold" /></a>
            <a href="#" className="socialMediaIcon" ><TwitterLogo size={24} weight="fill" /></a>
            <a href="#" className="socialMediaIcon" ><InstagramLogo size={25} /></a>
          </div>

        </nav>

      </aside>
    </section>
  );
}