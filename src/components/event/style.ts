import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  flex-direction: column;
  padding: 4px;
  background: white;
  color: black;
  height: 35px;
  border: 1px solid gray;
  border-radius: 4px;
  justify-content: center;

  &.visible {
    display: flex;
  }

  &:last-of-type {
    margin-bottom: 12px;
  }
`;

export const LabelRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  max-width: 75%;
  gap: 4px;
  justify-content: flex-end;
`;

export const Label = styled.div<{ background: string }>`
  max-width: 10%;
  height: 4px;
  background: ${(props) => props.background};
`;
