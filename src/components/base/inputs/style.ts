import styled from 'styled-components';

export const Input = styled.input`
  padding: 16px 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 3px 1px rgba(25, 118, 210, 0.3);
  }

  &.error {
    border-color: #f44336;

    &:focus {
      box-shadow: 0 0 3px 1px rgba(244, 67, 54, 0.3);
    }
  }
`;
