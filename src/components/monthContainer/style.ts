import styled from 'styled-components';
import { Container as CardContainer } from '../card/style';

export const Container = styled.div<{ animate: boolean }>`
  grid-area: calendar;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);

  & ${CardContainer} {
    overflow-x: hidden;

    & > * {
      animation: ${({ animate }) => (animate ? `fadeIn 0.5s ease-in-out` : '')};
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0.25;
      transform: translateX(100%);
    }

    60% {
      opacity: 0.75;
      transform: translateX(0);
    }

    to {
      opacity: 1;
    }
  }
`;
