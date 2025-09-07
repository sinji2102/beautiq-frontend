import { IconBack, IconBeautiq,IconClose, IconHamburger } from "@assets/svgs";
import styled from "@emotion/styled";

import { getTypography } from "../../../styles/typography";

export const HeaderWrapper = styled.div`
    ${getTypography("heading3")}; 
    background-color: ${({theme}) => theme.colors.neutral[100]};
    color: ${({theme}) => theme.colors.primary[500]};  

    width: 100%;
    height: 56px;
    padding: 12px;
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
`;

// 뒤로가기 아이콘
export const BackIcon = styled(IconBack)`
    width: 32px;
    height: 32px;
    fill: ${({theme}) => theme.colors.primary[100]};
`;

// 뒤로가기 아이콘
export const BeautiqIcon = styled(IconBeautiq)`
    width: 82px;
    height: 32px;
    fill: ${({theme}) => theme.colors.primary[100]};
`;

// 햄버거 아이콘
export const HamburgerIcon = styled(IconHamburger)`
    width: 32px;
    height: 32px;
    fill: ${({theme}) => theme.colors.primary[100]};
`;

// 닫기 아이콘 -> 다른 아이콘과 크기 맞추기 위해 패딩 추가
export const CloseIcon = styled(IconClose)`
    width: 24px;
    height: 24px;
    padding: 4px;
    fill: ${({theme}) => theme.colors.primary[100]};
`;

// 닫기 아이콘
export const PlaceholderIcon = styled.div`
    width: 32px;
    height: 32px;
`;
