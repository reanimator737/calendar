import styled from 'styled-components';
import { Button as ButtonBase } from '../base/buttons/style';

export const MenuContainer = styled.div`
  border-right: 1px solid gray;
  grid-area: menu;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
`;

export const Button = styled(ButtonBase)`
  margin: 0 16px;
`;
