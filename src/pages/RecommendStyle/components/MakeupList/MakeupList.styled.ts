import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 2.4rem;
`;

export const ItemCard = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 6.4rem;
  padding: 0.4rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.neutral[100]};
  box-shadow: 0 0.2rem 0.6rem rgb(0 0 0 / 5%);
  border-radius: 0.8rem;
`;

export const ImageName = styled.div`
  width: 120px;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.primary[500]};
  white-space: nowrap;
  text-align: start;
  text-overflow: ellipsis;

  ${getTypography("caption1Medi")}
`;

export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.2rem;
  justify-content: end;
`;

export const Keyword = styled.span`
  padding: 0.2rem 0.8rem;

  color: ${({ theme }) => theme.colors.gray[600]};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  border-radius: 0.4rem;

  ${getTypography("caption2Medi")}
`;
