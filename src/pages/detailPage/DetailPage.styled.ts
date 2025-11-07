import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const ScoreBoardWrapper = styled.div`
  display: flex;
  // width: full;
  padding: 1.2rem 2.4rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ScoreBoardContainer = styled.div<{score: number}>`
  ${getTypography("caption1Medi")};

  display: flex;
  box-sizing: border-box;
  width: 32.7rem;
  padding: 1rem 1.6rem;
  justify-content: space-between;

  color: ${({theme, score})=>
    score > 80? theme.colors.primary[500]
    : score > 60
      ? theme.colors.primary[700]
      :theme.colors.primary[900] 
  };
  border-radius: 16px;
  background-color: ${({theme, score})=>
    score > 80? theme.colors.neutral[100]
    : score > 60
      ? theme.colors.neutral[200]
      :theme.colors.neutral[300] 
  };
`;

export const ScoreBoardLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const ScoreBoardRight = styled.div`
  ${getTypography("caption2Medi")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ScoreBoardRightTop = styled.div<{score: number}>`
  display: flex;
  padding: 2px 16px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 40px;
  color: ${({theme, score})=>
    score > 80? theme.colors.primary[500]
    : score > 60
      ? theme.colors.primary[700]
      :theme.colors.white
  };
  background: ${({theme, score})=>
    score > 80? theme.colors.primary[100]
    : score > 60
      ? theme.colors.primary[300]
      :theme.colors.primary[600] 
  };
`;

export const ScoreBoardRightBottom = styled.div``;
