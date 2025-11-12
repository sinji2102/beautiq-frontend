import styled from "@emotion/styled";

export const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 2.4rem;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1.6rem;

  background-color: ${({ theme }) => theme.colors.neutral[100]};
`;
