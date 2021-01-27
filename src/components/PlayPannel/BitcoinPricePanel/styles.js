import styled from 'styled-components';
import { withTheme } from 'styled-components';

const PIXEL_SCALE = 4;
const scale = PIXEL_SCALE / 16;

const breakpoint = {
  up: {
    xl: 1440,
    lg: 1024,
    md: 768,
    sm: 576,
  },
  down: {
    lg: 1439,
    md: 1023,
    sm: 767,
    xs: 575,
  },
};

const color = {
  bg: '#000',
  text: '#fff',
};

const font = {
  primary: `'Roboto Mono', monospace`,
};

const fontWeight = {
  black: '900',
  bold: '700',
  semibold: '600',
  medium: '500',
  regular: '400',
  light: '300',
  extralight: '200',
};

const spacing = {
  xsmall: scale,
  small: scale * 2,
  medium: scale * 4,
  large: scale * 8,
  xlarge: scale * 16,
};

export const theme = {
  breakpoint,
  color,
  font,
  fontWeight,
  scale,
  spacing,
};

export const Svg = styled.svg`
  height: 100%;
  width: 100%;
  pointer-events: none;
  flex: 1 0 ${({ theme }) => theme.scale * 40}rem;
`;

export const PeriodButton = styled.button`
  isolation: isolate;
  perspective: 1px;
  position: relative;
  display: inline-block;
  height: ${({ theme }) => theme.spacing.large}rem;
  width: ${({ theme }) => theme.spacing.large}rem;
  margin: 0 0.5em;
  padding: 0;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.125em;
  cursor: pointer;
  appearance: none;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.text};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &::after {
    content: '';
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.color.text};
    transform-origin: 50% 50%;
    transform: ${({ active }) => (active ? 'scale3d(1, 1, 1)' : 'scale3d(1, 0, 1)')};
    transition: transform 0.2s ease;
    mix-blend-mode: difference;
  }

  &:focus {
    outline: none;

    &::before {
      opacity: ${({ active }) => (active ? 0 : 0.75)};
    }

    &:active::before {
      opacity: 0;
    }
  }
`;

export const OverviewItemButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.small}rem ${theme.spacing.medium}rem`};
  flex: 1 0 0;
  border: none;
  text-align: center;
  background: transparent;
  font-family: ${({ theme }) => theme.font.primary};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text};
  appearance: none;

  &:focus {
    outline: none;
  }
`;

export const Value = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small}rem;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.5;
`;

export const Label = styled.div`
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.3333;
  letter-spacing: 0.125em;
  text-transform: uppercase;
`;

export const OverviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 0 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.scale * 148}rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large}rem 0;
  color: ${({ theme }) => theme.color.text};
`;

export const Heading = styled.h1`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing.large * 1.5}rem;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  letter-spacing: 0.0625rem;
  text-transform: uppercase;
  text-align: center;
`;

export const PeriodText = styled.span`
  color: ${({ theme }) => theme.color.text};
  user-select: none;
  opacity: ${({ active }) => (active ? 1 : 0.75)};
  transition: opacity 0.2s ease;
`;

export const PeriodSwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  overflow: hidden;
`;
