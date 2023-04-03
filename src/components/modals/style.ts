import styled from 'styled-components';
import { Container as Label } from '../base/label/style';

export const Container = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .react-colorful {
    height: 150px;
    width: 100%;
  }

  label {
    color: #f44336;
    margin-bottom: 4px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

export const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;

  & ${Label} {
    padding: 4px;
  }
`;

export const DeleteText = styled.a`
  font-weight: 500;
  position: absolute;
  right: -8px;
  top: -8px;
  cursor: pointer;

  color: #f44336;

  &:hover {
    color: #ba000d;
  }
`;
