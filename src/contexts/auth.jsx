import axios from "axios"
import { useState, useEffect } from "react"
import { createContext, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider(props) {
  const [urlPath, setUrlPath] = useState(window.location.pathname);
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

  //método 3
  /* //Testando interceptor de rotas
  // declare a request interceptor
  axios.interceptors.request.use(config => {
    // perform a task before the request is sent

    if (config.method == "post") {
      console.log("Enviando um post");
    }
    if (config.method == "get") {
      console.log("Enviando um get");
    }
    if (config.method == "delete") {
      console.log("Enviando um delete");
    }
    if (config.method == "patch") {
      console.log("Enviando um patch");
    }

    console.log(config);

    //método 3
    config.headers.Authorization = 'teste 3';

    return config;
  }, error => {
    // handle the error
    return Promise.reject(error);
  }); */

  return (

    <AuthContext.Provider value={{ auth, saveToken, deleteToken, user, userLogout, saveUser, urlPath, setUrlPath }}>
      {props.children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  return context

}
