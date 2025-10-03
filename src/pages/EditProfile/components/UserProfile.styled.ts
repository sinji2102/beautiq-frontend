import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
`;

export const ProfileImage = styled.img`
  display: flex;
  width: 8rem;
  height: 8rem;

  border-radius: 50%;
`;

export const ImageChangeButton = styled.button`
  all: unset;

  ${getTypography("body2Long")};
  color: ${({ theme }) => theme.colors.primary[600]};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const InfoTitle = styled.span`
  display: flex;
  width: 100%;
  padding: 1rem 0;

  color: ${({ theme }) => theme.colors.black};

  ${getTypography("body1NormalSemi")};
`;

export const InfoText = styled.span`
  color: ${({ theme }) => theme.colors.gray[600]};

  ${getTypography("body2Long")};
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.7rem 0;

  color: ${({ theme }) => theme.colors.black};

  ${getTypography("body2Long")};
`;
