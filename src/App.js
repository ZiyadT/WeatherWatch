import React, {Component} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Cities from './JSON_Data/city.list.json'
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import './App.css';

export default class App extends Component {
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({user: incomingUserData})
  }
  
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        token = null
      } else {
        this.setState({ user: payload.user })
      }
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.user ?
          <Dashboard setUserInState={this.setUserInState} user={this.state.user} />
        :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </div>
    )
  }
}



  // getCities =  async () =>{
  //   Cities.map(city => {
  //     console.log(city)
  //   })
  // }
