import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 8px;
`;

export const LoadComp = styled.div<{ delay: number }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  transform: scale(0.75);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 15px #f5f5f5;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 15px #3f51b5;
    animation: pulse 1.5s ${(props) => props.delay}ms infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.75);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
