import React, {Component} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default class AuthPage extends Component {
  state = {
    showLogin: true,
  };

  render() {
    return (
      <main className="AuthPage">
        <div className="flex justify-between h-28 border-b-2 border-black">
            <h1 className='text-5xl font-bold mx-24 my-auto text-slate-300'>WeatherWatch</h1>
          <div className='my-auto'>
            <h3
              className='mx-24 p-2 text-slate-300 font-semibold cursor-pointer animate-bounce hover:text-orange-300'
              onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? "SIGN UP" : "LOG IN"}
            </h3>
          </div>
        </div>
        {/* Another ternary operator! */}
        {/* If showLogin is true, show the login form. If false, show the signup form */}
        {this.state.showLogin ? (
          <LoginForm setUserInState={this.props.setUserInState} />
        ) : (
          <SignUpForm setUserInState={this.props.setUserInState} />
        )}
      </main>
    );
  }
}