import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import { IconBack as RawBackIcon, IconClose as RawCloseIcon } from "../../assets/svgs";

export const Screen = styled.div`
  min-height: 100vh;
  background: #fff;
`;

export const HeaderBar = styled.header`
  height: 5.6rem;
  padding: 0 1.2rem;
  display: grid;
  grid-template-columns: 3.6rem 1fr 3.6rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral[100]};

  .title {
    text-align: center;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary[500]};
    ${getTypography("heading3")}
  }
  .nav {
    width: 3.6rem; height: 3.6rem;
    display: grid; place-items: center;
    border: none; background: transparent;
    cursor: pointer;
  }
`;

export const BackIcon = styled(RawBackIcon)`width:2.4rem;height:2.4rem;`;
export const CloseIcon = styled(RawCloseIcon)`width:2.2rem;height:2.2rem;`;

export const Body = styled.main`
  padding: 1.2rem 1.6rem 2.4rem;
  max-width: 36rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PreviewWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 28.8rem;
  height: 28.8rem;
  border-radius: 0.8rem;
  overflow: hidden;
  display: grid;
  place-items: center;
  background:
    linear-gradient(45deg, #eee 25%, transparent 25% 50%, #eee 50% 75%, transparent 75%) 0 0/20px 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
  ${getTypography("body2NormalSemi")}
`;

export const OriginalPeekBtn = styled.button`
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.88);
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0.95;

  &:active { transform: scale(0.98); }
`;

export const PeekIcon = styled.span`
  display: inline-block;
  width: 1.6rem; height: 1.6rem;
  border-left: 0.16rem solid #fff;
  border-right: 0.16rem solid #fff;
  transform: skewX(-12deg);
`;

export const Caption = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  ${getTypography("body2NormalSemi")}
  strong { color: ${({ theme }) => theme.colors.primary[600]}; font-weight: 800; }
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

export const SecondaryBtn = styled.button`
  height: 5.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.primary[300]};
  background: ${({ theme }) => theme.colors.primary[0]};
  color: ${({ theme }) => theme.colors.primary[400]};
  font-weight: 800;
  ${getTypography("body2NormalSemi")}
`;

export const PrimaryBtn = styled.button`
  height: 5.2rem;
  border-radius: 0.8rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.primary[0]};
  font-weight: 800;
  ${getTypography("body2NormalSemi")}
`;

export const SaveBar = styled.div` margin-top: 0.4rem; `;
export const SaveBtn = styled.button`
  width: 100%;
  height: 5.6rem;
  border-radius: 0.8rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.primary[0]};
  font-weight: 800;
  ${getTypography("body1NormalSemi")}
`;
