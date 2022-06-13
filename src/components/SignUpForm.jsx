import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password })
      })
      if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
    
      let token = await fetchResponse.json()
      localStorage.setItem('token', token)

      const userDoc = JSON.parse(atob(token.split('.')[1])).user
      this.props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className='w-1/2 my-24 mx-auto flex justify-between h-full'>
        <h1 className='ml-auto my-auto text-9xl pb-12'>🌤️</h1>
        <div className="my-48 mr-auto w-80">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className='my-3 flex justify-between'>
              <label className='mx-4 text-lg text-slate-300 font-semibold'>Username</label>
              <input className='bg-cyan-300 px-2' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className='my-3 flex justify-between'>
              <label className='mx-4 text-lg text-slate-300 font-semibold'>Email</label>
              <input className='bg-cyan-300 px-2' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className='my-3 flex justify-between'>
              <label className='mx-4 text-lg text-slate-300 font-semibold'>Password</label>
              <input className='bg-cyan-300 px-2' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className='my-3 flex justify-between'>
              <label className='mx-4 text-lg text-slate-300 font-semibold'>Confirm</label>
              <input className='bg-cyan-300 px-2' type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button className='text-lg text-slate-300 font-semibold hover:text-orange-300' type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <p className="error-message text-rose-500 font-semibold text-lg">&nbsp;{this.state.error}</p>
        </div>
      </div>
    );
  }
}