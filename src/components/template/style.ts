import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 15% 85%;
  grid-template-rows: 10% 90%;
  grid-template-areas:
    'time time'
    'menu calendar';
`;
