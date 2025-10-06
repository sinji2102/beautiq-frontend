import styled from "@emotion/styled";

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeImage = styled.img`
  width: 100%;
  height: 21rem;

  background-color: ${({ theme }) => theme.colors.gray[200]}; // TODO : 이미지 변경 (임시 배경색)
`;
