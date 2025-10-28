import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

interface ActionButtonProps {
  $type: "logout" | "withdraw";
}

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 0;
`;

export const ActionButton = styled.button<ActionButtonProps>`
  all: unset;

  ${getTypography("body2Long")};

  ${({ $type, theme }) => {
    switch ($type) {
      case "logout":
        return `
              color: ${theme.colors.gray[600]};
            `;
      case "withdraw":
        return `
              color: ${theme.colors.primary[700]};
            `;
    }
  }}
`;

export const Divider = styled.div`
  width: 0.1rem;
  height: 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray[600]};
`;
