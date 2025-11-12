import { IconGoogleRound, IconKakaoRound } from "@assets/svgs";
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

export const InfoInput = styled.input`
  all: unset;
  display: flex;

  color: ${({ theme }) => theme.colors.black};
  text-align: right;

  ${getTypography("body2Long")};

  :focus {
    width: 30%;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

// TODO : 디자인 확정 후 수정 필요
export const SaveButton = styled.button`
  all: unset;

  align-items: end;
  margin-top: 1.2rem;

  color: ${({ theme }) => theme.colors.primary[700]};

  ${getTypography("body2Long")};
`;

export const LoginInfo = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const KakaoIcon = styled(IconKakaoRound)`
  width: 2rem;
  height: 2rem;
`;

export const GoogleIcon = styled(IconGoogleRound)`
  width: 1.6rem;
  height: 1.6rem;
`;
