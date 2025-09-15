import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 31.1rem;
  padding: 3.2rem 1.6rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.6rem;
  box-sizing: border-box;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
`;

export const Title = styled.h2`
  ${getTypography("heading4")}
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const Comment = styled.p`
  ${getTypography("caption1Medi")}
  color: ${({ theme }) => theme.colors.gray[400]};
  margin: 0;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 0.8rem;

  & > button {
    flex: 1;
  }
`;
