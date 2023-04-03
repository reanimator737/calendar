import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BackDrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalWrap = styled.div`
  position: relative;
  min-width: clamp(200px, calc(100% - 40px), 424px);
  min-height: 170px;
  z-index: 100;
  opacity: 0;
  transform: translate(0, -75vh);
  border-radius: 24px;
  padding: 24px;
  transition: all 200ms linear;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  &.close {
    opacity: 0;
    transform: translate(0, 75vh);
  }
`;
