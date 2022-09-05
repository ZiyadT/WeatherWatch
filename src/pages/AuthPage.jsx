import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className="AuthPage">
      <div className="flex justify-between h-28 border-b-2 border-black">
          <h1 className='text-5xl font-bold mx-24 my-auto text-slate-300'>WeatherWatch</h1>
        <div className='my-auto'>
          <h3
            className='mx-24 p-2 text-slate-300 font-semibold cursor-pointer animate-bounce hover:text-orange-300'
            onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "SIGN UP" : "LOG IN"}
          </h3>
        </div>
      </div>
      {showLogin ? (
        <LoginForm setUserInState={props.setUserInState} />
      ) : (
        <SignUpForm setUserInState={props.setUserInState} />
      )}
    </main>
  );
}