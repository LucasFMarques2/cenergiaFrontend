import styled from "styled-components";

export const SignInContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.COLORS.gray_800};


  `;

export const FormContainer = styled.div`
  background: ${({theme}) => theme.COLORS.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
    width: 90%;
  }

  > a{
    margin-top: 10px;
    text-decoration: none;
  } 
`;

export const Title = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.gray_800};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.ORANGE};
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.COLORS.blue_400};
  color: ${({ theme }) => theme.COLORS.white};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.ORANGE_DARK};
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

