import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
  min-height: 100vh;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ExportButton = styled.button`
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ChartCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 15px;
    text-align: center;
  }
`;
