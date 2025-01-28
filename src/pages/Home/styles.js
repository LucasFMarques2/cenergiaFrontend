import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ $isAsideOpen }) =>
    $isAsideOpen ? "250px 1fr" : " 250px 1fr"};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  }
`;

export const AsideContainer = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.COLORS.gray_100};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  z-index: 2;
  align-items: center;
  background-color: white; 
  position: relative;

  > img {
    width: 150px;
    margin-top: 50px;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-bottom: 1rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  margin-top: 35px;

  color: ${({theme}) =>theme.COLORS.blue_400};

  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ $isAsideOpen }) =>
    $isAsideOpen && window.innerWidth <= 768 ? "translateX(250px)" : "none"};
  opacity: ${({ $isAsideOpen }) =>
    $isAsideOpen && window.innerWidth <= 768 ? 0.5 : 1};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.button`
  background: ${({ theme }) => theme.COLORS.blue_400};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
`

export const ButtonLogin = styled(ButtonContainer)`
    margin-top: 70px;
    padding: 10px  30px;
`

export const ToggleButton = styled(ButtonContainer)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 3;

  @media (min-width: 769px) {
    display: none;
  }
`;
