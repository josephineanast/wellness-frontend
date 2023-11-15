import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginStart, loginSuccess, loginFailure } from "../features/authSlice";
import { loginUser } from "../api/auth";

const Title = styled.h3`
  text-align: center;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  border-radius: 10px;
  padding: 30px;
  font-family: sans-serif;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputLabel = styled.label`
  font-weight: 600;
  color: #151717;
`;

const Input = styled.input`
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1.5px solid #2d79f3;
  }
`;

const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputWithToggle = styled.input`
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1.5px solid #2d79f3;
  }
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 45%;
  transform: translateY(-50%);
  color: #2d79f3;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  border: none;
  color: white;
  background: #151717;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #252727;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const user = await loginUser({ email, password });
      dispatch(loginSuccess(user));
      const userRole = user.user.role;
      navigate(`/${userRole}-admin`);
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <>
      <Title>Log in to your account</Title>
      <Form onSubmit={handleSubmit}>
        <InputLabel>Email</InputLabel>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputLabel>Password</InputLabel>
        <PasswordInput>
          <InputWithToggle
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </PasswordToggle>
        </PasswordInput>

        <SubmitButton type="submit">Sign In</SubmitButton>
      </Form>
    </>
  );
}
