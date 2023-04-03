import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px 0 16px;
  transition: all 0.15s ease-in;
  font-size: 0.9rem;

  & .icon {
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s ease-in;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);

    & .icon {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

export const PureContainer = styled(Container)`
  cursor: pointer;
`;

export const Icon = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
  padding: 4px 8px;
`;

export const CheckBox = styled.div`
  display: flex;
  cursor: pointer;
  gap: 4px;
  align-items: center;
  margin-right: auto;
`;

export const Square = styled.div<{ bgColor: string; checked: boolean }>`
  width: 20px;
  height: 20px;
  font-size: 1.2rem;
  color: ${({ checked }) => (checked ? 'white' : 'transparent')};
  border: 2px solid ${({ bgColor }) => bgColor};
  background-color: ${({ bgColor, checked }) => (checked ? bgColor : 'transparent')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease-in;
`;
