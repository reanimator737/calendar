import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ArrowContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  > * {
    &:first-child {
      transform: rotate(180deg);
    }
  }

  svg {
    padding: 8px;
    border-radius: 50%;
    width: 24px;

    & path {
      fill: rgb(95, 99, 104);
    }

    &:hover {
      background: rgba(95, 99, 104, 0.1);
    }
  }
`;
