import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios';
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(JSON.stringify({user, pwd}), 
      {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true
      } );
    console.log(JSON.stringify(response?.data));
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    setUser('');
    setPwd('');
    setSuccess(true);
    } catch (err) {

    }
    
  }

  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        ></input>
      
      <div>
      <input
          type="password"
          id="password"
          ref={userRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        ></input>
      </div>
      <button>LOGIN</button>
      </form>
    </section>
    )}
    </>
  );
};
export default Login;
