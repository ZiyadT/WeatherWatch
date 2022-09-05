import React, {useState, useEffect} from 'react'
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App(props) {
  const [user, setUser] = useState(null)

  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData)
  }
  
  useEffect(() => {
      let token = localStorage.getItem('token')
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem('token')
          token = null
        } else {
          setUser(payload.user)
        }
      }
    }, []
  )

  return (
      <div className="App">
        {user ?
          <Dashboard setUserInState={setUserInState} user={user} />
        :
          <AuthPage setUserInState={setUserInState}/>
        }
      </div>
    )
}



  // getCities =  async () =>{
  //   Cities.map(city => {
  //     console.log(city)
  //   })
  // }
