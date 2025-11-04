import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const UserProfileWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 2.4rem;
`;

export const ProfileImage = styled.img`
  width: 6.7rem;
  height: 6.7rem;
  margin: 0 1rem;

  background-image: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: start;
  padding: 1rem;
`;

export const UserName = styled.p`
  all: unset;
  ${getTypography("body1NormalSemi")};
`;

export const Text = styled.p`
  all: unset;
  ${getTypography("caption1Semi")};
`;
