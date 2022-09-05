import { useState } from "react";

export default function SignUpForm(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleChangeName = (evt) => {
    setName(evt.target.value)
    setError("")
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
    setError("")
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
    setError("")
  }

  const handleChangeConfirm = (evt) => {
    setConfirm(evt.target.value)
    setError("")
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password })
      })
      if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
    
      let token = await fetchResponse.json()
      localStorage.setItem('token', token)

      const userDoc = JSON.parse(atob(token.split('.')[1])).user
      props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      setError("Sign Up Failed - Try Again");
    }
  };

  const disable = password !== confirm;
  return (
    <div className='w-1/2 my-24 mx-auto flex justify-between h-full'>
      <h1 className='ml-auto my-auto text-9xl pb-12'>🌤️</h1>
      <div className="my-48 mr-auto w-80">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className='my-3 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Username</label>
            <input className='bg-cyan-300 px-2' type="text" name="name" value={name} onChange={handleChangeName} required />
          </div>
          <div className='my-3 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Email</label>
            <input className='bg-cyan-300 px-2' type="email" name="email" value={email} onChange={handleChangeEmail} required />
          </div>
          <div className='my-3 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Password</label>
            <input className='bg-cyan-300 px-2' type="password" name="password" value={password} onChange={handleChangePassword} required />
          </div>
          <div className='my-3 flex justify-between'>
            <label className='mx-4 text-lg text-slate-300 font-semibold'>Confirm</label>
            <input className='bg-cyan-300 px-2' type="password" name="confirm" value={confirm} onChange={handleChangeConfirm} required />
            </div>
          <button className='text-lg text-slate-300 font-semibold hover:text-orange-300' type="submit" disabled={disable}>SIGN UP</button>
        </form>
        <p className="error-message text-rose-500 font-semibold text-lg">&nbsp;{error}</p>
      </div>
    </div>
  )
}