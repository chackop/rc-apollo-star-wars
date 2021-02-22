import styled from "styled-components";

export const CustomTheme = {
  colors: {
    primary: "black",
    secondary: "yellow",
  },
};

interface StyledWrapperProps {
  primeTheme: boolean;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;

  background: ${({ primeTheme, theme }) =>
    primeTheme ? theme.colors.primary : "inherit"};
  color: ${({ primeTheme, theme }) =>
    primeTheme ? theme.colors.secondary : "inherit"};
`;
