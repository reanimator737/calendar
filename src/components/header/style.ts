import styled from 'styled-components';
import { Input } from '../base/inputs/style';
import { Button } from '../base/buttons/style';

export const YearPicker = styled(Input)`
  height: 40px;
  font-weight: 500;
  padding: 0 8px;
  max-width: 80px;
`;

export const Container = styled.div`
  grid-area: time;
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const FunctionalButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding-left: 24px;

  & ${Button} {
    height: max-content;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
