import { useState } from "react";

export default function LoginForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
    setError("")
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
    setError("")
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
       // 1. POST our new user info to the server
       const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, })
      })

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      setError("Sign Up Failed - Try Again");
    }
  };

  return (
    <div className='w-1/2 my-24 mx-auto flex justify-between bg-transparent'>
      <h1 className='ml-auto my-auto text-9xl'>☀️</h1>
      <div className="my-48 mr-auto w-80" onSubmit={handleSubmit}>
        <form autoComplete="off">
          <div className='my-6 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Email</label>
            <input type="text" name="email" value={email} onChange={handleChangeEmail} required className='bg-cyan-300 px-2' />
          </div>
          <div className='my-6 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Password</label>
            <input type="password" name="password" value={password} onChange={handleChangePassword} required className='bg-cyan-300 px-2' />
          </div>
          <button type="submit" className='text-lg text-slate-300 font-semibold hover:text-orange-300'>LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
    );
}