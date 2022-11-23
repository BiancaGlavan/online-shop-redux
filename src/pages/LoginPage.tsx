import { Button, Container, Paper, TextField } from "@mui/material";
import {  styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLoginUserMutation } from "../features/apiSlice";
import { login } from "../features/authSlice";

const StyledLoginPage = styled('div')`
  .login-box {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 50px;
  }

  .input-field {
    margin: 10px 0;
  }

  .button {
    margin-top: 30px;
  }
`;


const LoginPage = () => {
  const [loginUser, response] = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: loginResponse, isSuccess, isLoading } = response;
  const authState = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const currentUser = {
      email: email,
      password: password,
    }

    loginUser({data: currentUser});
  }

  useEffect(() => {
    if(isSuccess) {
      dispatch(login(loginResponse.access_token));
      navigate('/');
    }
  }, [isSuccess, loginResponse]);

  useEffect(() => {
    if(authState.isAuth) {
      navigate('/');
    }
  }, [authState]);

  return (
    <StyledLoginPage>
      <Container maxWidth={'sm'}>
        <Paper className="login-box">
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" label="Email" variant="outlined" />
          <TextField type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" label="Password" variant="outlined" />
          <Button onClick={handleLogin} className="button" size="large" fullWidth variant="contained">Login</Button>
        </Paper>
      </Container>
    </StyledLoginPage>
  )
}

export default LoginPage;