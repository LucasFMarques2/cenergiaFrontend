import styled from "styled-components";

export const PainelContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  background-color: #fff;
  @media (max-width: 768px) {
    margin-top: 50px;
    grid-template-columns: 1fr;
    position: relative;
  }
`;

export const AsideContainer = styled.aside`
  background-color: #fff;
  padding: 1rem;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 80%;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    height: 100vh;
    transition: 0.3s;
    box-shadow: ${({ $isOpen }) => ($isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none')};
  }

  button[type="button"] {
    background-color: #ef4444;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    margin-bottom: 1rem;
    margin-top: 50px;
  }
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  color: #1a202c;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  input {
    padding: 8px;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    width: 100%;
  }
`;

export const AddButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 4px;
`;

export const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f7fafc;
  border-radius: 4px;
  margin: 4px 0;

  button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 4px;
  }
`;

export const MenuToggle = styled.button`
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 3;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ScrollableList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 4px;
`;

export const DropdownSection = styled.details`
  margin-bottom: 1rem;

  summary {
    cursor: pointer;
    padding: 8px;
    background-color: #f7fafc;
    border-radius: 4px;
    font-weight: 500;
  }
`;