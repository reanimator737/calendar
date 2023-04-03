import styled from 'styled-components';
import { SmallText } from '../base/text/style';

export const DayOfWeek = styled(SmallText)`
  color: gray;
  display: none;
  text-align: center;
`;

export const DateInfo = styled(SmallText)`
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  border-right: 1px solid gray;
  overflow-y: auto;
  gap: 4px;
  border-top: 1px solid gray;

  &.firstRow {
    border-top: 0;

    & > ${DayOfWeek} {
      display: inline;
    }
  }

  & div {
    width: 100%;
  }
`;

export const Holiday = styled.div`
  background-color: #018786;
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  padding: 4px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
|
`;
