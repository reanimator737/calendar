import styled from 'styled-components';

export const Button = styled.button`
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }
`;

export const AcceptButton = styled(Button)`
  background-color: #03dac6;

  &:hover {
    background-color: #018786;
  }
`;

export const RejectButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #ba000d;
  }
`;
