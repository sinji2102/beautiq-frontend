import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const FaceButtonWrapper = styled.div`
  display: grid;
  padding: 1.2rem 2.4rem;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  grid-template-rows: repeat(2, auto);   /* 2행 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

export const FaceButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  
  gap: 1.0rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const FaceButton = styled.button<{ $isActive: boolean }>`
  ${getTypography("caption1Medi")};

  display: flex;
  width: 7.4rem;
  height: 2.7rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  border-radius: 0.8rem;
  border: 0.1rem solid;
  border-color:${({ theme }) => theme.colors.primary[400]};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[400] : theme.colors.white};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray[800]};
  
  box-shadow: 0.1rem 0.2rem 0.1rem 0 rgba(0, 0, 0, 0.25);; 
`;

export const FaceTitle = styled.div`
  ${getTypography("body2NormalSemi")};

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.07px;

  color: ${({theme}) => theme.colors.black};
`;

export const ScoreBoardWrapper = styled.div`
  display: flex;
  // width: full;
  padding: 1.2rem 2.4rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ScoreBoardContainer = styled.div`
  ${getTypography("caption1Medi")};

  display: flex;
  box-sizing: border-box;
  width: 32.7rem;
  padding: 1rem 1.6rem;
  justify-content: space-between;

  color:${({ theme }) => theme.colors.primary[500]};
  border-radius: 16px;
  background-color:${({ theme }) => theme.colors.neutral[100]};
`;

export const ScoreBoardLeft = styled.div`
  display:flex;
  align-items: center;
  background-color:${({ theme }) => theme.colors.neutral[100]};
`;

export const ScoreBoardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background-color:${({ theme }) => theme.colors.neutral[100]};
`;

export const ScoreBoardRightTop = styled.div`
  display: flex;
  padding: 2px 16px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 40px;
  background:${({ theme }) => theme.colors.primary[100]};
`;

export const ScoreBoardRightBottom = styled.div`
  background-color:${({ theme }) => theme.colors.neutral[100]};
`;
