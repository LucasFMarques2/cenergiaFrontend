import { useState, useEffect } from "react";
import {
  HomeContainer,
  AsideContainer,
  ContentContainer,
  ToggleButton,
  CloseButton,
  ButtonLogin,
} from "./styles";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { Formulario } from "./components/formulario";


export function Home() {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
 

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setIsAsideOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <HomeContainer>
      {!isAsideOpen && (
        <ToggleButton onClick={toggleAside}>Abrir Menu</ToggleButton>
      )}

      <AsideContainer $isOpen={isAsideOpen}>
        <CloseButton onClick={toggleAside}>×</CloseButton>
        <img src={logo} alt="Logo" />
        <ButtonLogin as={Link} to="/login">Painel admin</ButtonLogin>
      </AsideContainer>

      <ContentContainer>
        <h4>Pesquisa sobre internet</h4>
        <Formulario/>
      </ContentContainer>
    </HomeContainer>
  );
}
