import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className="AuthPage overflow-hidden">
      <div className="justify-between h-28 border-b-2 border-black sm:flex">
          <h1 className='text-5xl font-bold mx-24 mt-2 text-slate-300 sm:my-auto'>WeatherWatch</h1>
        <div className='my-auto'>
          <h3
            className='mx-24 mt-2 p-2 text-slate-300 font-semibold cursor-pointer hover:text-orange-300 sm:mt-0'
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