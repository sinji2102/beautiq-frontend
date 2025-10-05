import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const CounterText = styled.p`
  font-size: 1.5rem;
  color: #555;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;

  &:hover {
    background-color: #e0e0e0;
  }
`;
