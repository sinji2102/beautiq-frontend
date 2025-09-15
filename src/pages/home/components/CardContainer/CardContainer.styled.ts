import styled from "@emotion/styled";

//   ${getTypography("heading1")}

export const CardContainer = styled.div`
  display: flex;
  padding: 1rem 2.4rem;
  justify-content: space-between;
  height: 14.8rem;
  gap: 2.4rem;
`;

export const Card = styled.button<{ variant?: "skin" | "makeup" }>`
  all: unset;
  display: flex;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);

  background-color: ${({ theme, variant }) =>
    variant === "skin" ? theme.colors.primary[200] : theme.colors.neutral[100]};
`;
