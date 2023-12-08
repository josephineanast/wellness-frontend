import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  registerStart,
  registerFailure,
  registerSuccess,
} from "../features/authslice";
import { registerUser } from "../api/auth";

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

const Select = styled.select`
  // Styles for your select
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

const LoginLink = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 0.8rem;
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("company");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerStart());

    try {
      const user = await registerUser({
        name: name,
        email: email,
        password: password,
        role: role,
      });
      dispatch(registerSuccess({ user }));
      navigate(`/login`);
    } catch (err) {
      dispatch(registerFailure(err.message));
    }
  };

  return (
    <>
      <Title>Create an account</Title>
      <Form onSubmit={handleSubmit}>
        <InputLabel>Name</InputLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="company">Company</option>
          <option value="vendor">Vendor</option>
        </Select>

        <SubmitButton type="submit">Register</SubmitButton>
        <LoginLink>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginLink>
      </Form>
    </>
  );
}
