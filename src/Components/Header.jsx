import { Link, useNavigate } from "react-router-dom";
import { DotsThreeOutlineVertical, CaretUp, CalendarCheck, SignOut, PlusCircle } from 'phosphor-react'
import "./Header.scss";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'
import { useEffect, useRef, useState } from 'react';



export function Header() {
  const { auth, user, userLogout, urlPath, setUrlPath, initialProducts } = useAuth();
  const navigate = useNavigate();
  const [isNovaDivVisible, setIsNovaDivVisible] = useState(false);
  const novaDivRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  useEffect(() => {
    const novaDiv = novaDivRef.current;
    if (windowWidth < 414) {
      novaDiv.style.opacity = 0;
      novaDiv.style.animationDuration = '0.5s'
      novaDiv.style.transitionTimingFunction = 'ease-in';
      novaDiv.style.animationFillMode = 'both';
      novaDiv.style.animationName = 'fadeOut';

      setTimeout(() => {
        novaDiv.style.display = 'none'
      }, 500);

      novaDiv.addEventListener('transitionend', function handleTransitionEnd() {
        novaDiv.removeEventListener('transitionend', handleTransitionEnd);
      }, 1)

      setIsNovaDivVisible(false)
    } else {
      return
    }
  }, [windowWidth])


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
      initialProducts()
      navigate('/home')
      setUrlPath(window.location.pathname)
    }
  }

  useEffect(() => {
    const novaDiv = novaDivRef.current;

    if (isNovaDivVisible) {
      novaDiv.style.opacity = 1;
      novaDiv.style.display = 'block'
      novaDiv.style.pointerEvents = 'all';
      novaDiv.style.transitionDelay = '0s';
      novaDiv.style.animationDuration = '0.5s'
      novaDiv.style.transitionTimingFunction = 'ease-in';
      novaDiv.style.animationFillMode = 'both';
      novaDiv.style.animationName = 'fadeIn';

    } else {
      setTimeout(() => {
        novaDiv.style.opacity = 0;
        novaDiv.style.animationDuration = '0.5s'
        novaDiv.style.transitionTimingFunction = 'ease-in';
        novaDiv.style.animationFillMode = 'both';
        novaDiv.style.animationName = 'fadeOut';

        setTimeout(() => {
          novaDiv.style.display = 'none'
        }, 500);

        novaDiv.addEventListener('transitionend', function handleTransitionEnd() {
          novaDiv.removeEventListener('transitionend', handleTransitionEnd);
        }, 1)
      });
    }
  }, [isNovaDivVisible]);

  function toggleDiv() {
    const novaDiv = novaDivRef.current;
    const icon = document.getElementById("novaDivIcon");
    const iconClass = isNovaDivVisible ? "" : "";
    icon.setAttribute("class", `btnMenuHeader icon ${iconClass}`);
    icon.setAttribute("aria-expanded", `${isNovaDivVisible}`);

    setIsNovaDivVisible(!isNovaDivVisible);

    novaDiv.addEventListener('transitionend', function handleTransitionEnd() {
      if (!isNovaDivVisible) {
        novaDiv.removeEventListener('transitionend', handleTransitionEnd);
      }
    });
  }


  return (
    <section className="headerFull">
      <section className="logoSection">
        <div onClick={() => changeScreen('home')} className="logoImg" ></div>
        <h2 className="logoTagline">Sinta-se em casa</h2>
      </section>

      <div className="asideHolder" type={urlPath}>

        {(auth && user !== "") && (
          <div className="loggedIn">
            <p className="profilePicture">{user.nome[0]}{user.sobrenome[0]}</p>

            <div className="greetingAndName">
              <p className="">Olá,</p>
              <p className="greetingAndNameGreen">{user.nome} {user.sobrenome}</p>
            </div>
            <DotsThreeOutlineVertical
              id="novaDivIcon"
              size={36}
              onClick={toggleDiv}
              color="var(--coral-light)"
              className="btnMenuHeader"
              weight="fill"
            />
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
      <div ref={novaDivRef} className="nova-div">
        <div className="linksMenuHeaderHolder">
          {/* {user.papel === "ADMIN" && */}
            <Link to={`/administrador`} className="text-normal estiloIcone" onClick={toggleDiv}><PlusCircle size={32} color="white" /> Cadastrar local</Link>
          {/* } */}
          {/* {user.papel !== "ADMIN" && */}
            <Link to={`/reservas`} className="text-normal estiloIcone" onClick={toggleDiv}> <CalendarCheck size={32} color="white" /> Ver reservas</Link>
          {/* } */}
          <Link onClick={() => { logout(); toggleDiv() }} className="text-normal estiloIcone"><SignOut size={32} color="white" /> Sair</Link>
          <Link className="text-normal estiloIcone" onClick={toggleDiv}> <CaretUp size={32} color="white" /> Fechar menu</Link>
        </div>
      </div>
    </section>
  );
}