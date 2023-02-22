import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { spacing } from '@mui/system';
import Button from '@mui/material/Button'

const Login = (props: {setUsername: (username: string) => void }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let option;
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      if(username==="" || username===undefined) {
        option = (
            <div id="lowerText">
            <p id="warningText">Invalid Username and Password</p>
            </div>
        )
        return;
      }
      else {
        option = (
          <div id="lowerText">
            <p id="warningText">Invalivdgband Password</p>
          </div>
        )
      }
      const response = await fetch('http://localhost:8000/api/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
              username,
              password
          })
      })

      const data = await response.json();
      if(response.status === 200) {
          navigate("/");
          props.setUsername(username);
      } else {
        option = (
          <div id="lowerText">
          <p id="warningText">{data.message}</p>
          </div>
      )
      }
  }
    return (
      <div className="main">
      <div id="mainloginbox">
      <form onSubmit={submit}>
        <p id="promptedlogintext">Login to your Codir account</p>
        <TextField 
          sx={{ml: 9 , mb: 2, mt: -1}} 
          id="loginusernamebox" 
          label="Username" 
          type="Username" 
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          sx={{ ml: 9 , mb: 0.5}}
          id="loginpasswordbox"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <div id="lowerText">
        </div>
        <Button variant="contained" color="primary" className="boxMargin" id="loginbox" type="submit">LOGIN</Button>
      </form>
      {option}
      </div>
    </div>
      );
}

export default Login;