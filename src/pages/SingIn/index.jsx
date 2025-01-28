import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { SignInContainer, Input, Button, Title, FormContainer } from "./style";
import logo from '../../assets/logo.svg'

export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ matricula, password });
      navigate("/painel");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Erro ao fazer login.");
    }
  };

  return (
    <SignInContainer>
      <FormContainer>
        <img src={logo} alt="" />
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
        </form>
        <Link to='/'>Voltar</Link>
      </FormContainer>
    </SignInContainer>
  );
}
