import axios from "axios"
import { useState, useEffect } from "react"
import { createContext, useContext } from "react"


const AuthContext = createContext()

export function AuthProvider(props) {
  const [homeProducts, setHomeProducts] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  const [urlBase, setUrlBase] = useState('http://18.117.145.11:8080');
  //const [urlBase, setUrlBase] = useState('http://18.191.176.59:8080');
  //const [urlBase, setUrlBase] = useState('https://airbnbeach-back.onrender.com');

  const authLocalStorage = localStorage.getItem('auth')
  const userLocalStorage = JSON.parse(localStorage.getItem('user'))

  const [auth, setAuth] = useState(authLocalStorage === null ? '' : authLocalStorage)
  const [user, setUser] = useState(userLocalStorage === null ? '' : userLocalStorage)



  function saveToken(tokenReceived) {
    if (tokenReceived !== auth) {
      setAuth(tokenReceived)
      localStorage.setItem('auth', tokenReceived)
    }
  }

  function deleteToken() {
    localStorage.removeItem('auth')
  }

  /* function compareToken() {
    let token = localStorage.getItem('auth')

    if (
      auth === token &&
      auth.replace(/\s/g, '').length > 0 &&
      auth !== undefined &&
      auth !== null &&
      auth !== ''
    ) {
      return true
    } else {
      return false
    }
  } */

  function saveUser(userReceived) {
    if (userReceived !== user) {
      setUser(userReceived)
      localStorage.setItem('user', JSON.stringify(userReceived))
    }
  }

  function userLogout() {
    setUser('');
    setAuth('');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  }

  //metodos para gerar o autorization automatiamente em cada requisição
  //método 1
  //axios.defaults.headers.common['Authorization'] = `Bearer ${auth}`

  //método 2
  //axios.defaults.headers.common['Auth_Token'] = 'teste 2'

  function initialProducts(){
    axios.get(`${urlBase}/produtos`).then(
      (response) => {
        setHomeProducts(response.data);
      },
      (error) => {
          //if (error.status == 404) return toast.error('Usuário não encontrado');
          if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
      }
  )
  }

  axios.interceptors.request.use(function (config) {
    setLoading(true)
    return config
  }, function (error) {

    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    setLoading(false)
    return response;
  }, function (error) {

    return Promise.reject(error);
  });

  function loadingWait(time) {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, time);
  }



  return (

    <AuthContext.Provider value={{ auth, saveToken, deleteToken, user, userLogout, saveUser, urlPath, setUrlPath, urlBase, loading, loadingWait, initialProducts, homeProducts }}>
      {props.children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  return context

}
