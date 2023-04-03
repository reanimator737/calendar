import styled, { css } from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  font-weight: 500;
`;

export const SelectInput = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border: none;
  min-width: 130px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  appearance: none;
  cursor: pointer;
`;

export const SelectArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  pointer-events: none;
`;

export const SelectOptionList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 10;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
      animation: slide-down 0.2s ease-out;
    `} @keyframes slide-down {
    from {
      transform: translateY(-4px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const SelectOptionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e0e0e0;
  }
`;
