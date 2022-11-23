import { Button, Container, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useRegisterUserMutation } from "../features/apiSlice";

const StyledRegisterPage = styled('div')`
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



const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  const [registerUser, response] = useRegisterUserMutation();
  const { isLoading, isSuccess } = response;

  console.log('responseee: ', response.isLoading);

  const handleRegister = () => {
    const user = {
      name: username,
      email: email,
      password: password,
      avatar: avatar,
    }

    registerUser({data: user});
  }

  return (
    <StyledRegisterPage>
      <Container maxWidth={'sm'}>
        <Paper className="login-box">
          <TextField value={username} onChange={(e) => setUsername(e.target.value)} className="input-field"  label="Name" variant="outlined" />
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} className="input-field"  label="Email" variant="outlined" />
          <TextField type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field"  label="Password" variant="outlined" />
          <TextField value={avatar} onChange={(e) => setAvatar(e.target.value)} className="input-field"  label="Avatar (URL Adress)" variant="outlined" />
          <Button onClick={handleRegister} className="button" size="large" fullWidth variant="contained">
            {isLoading ? 'Loading...' : 'Register'}
          </Button>
          {isSuccess && <div>User was created!</div>}
        </Paper>
      </Container>
    </StyledRegisterPage>
  )
}

export default RegisterPage;