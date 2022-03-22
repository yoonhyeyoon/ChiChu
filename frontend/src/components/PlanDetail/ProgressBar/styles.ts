import styled from 'styled-components'

export const Parentdiv  = styled.div`
  height: ${height};
  width: '80%';
  backgroundColor: 'whitesmoke';
  borderRadius: 40;
  margin: 20;
`;

export const Childdiv = styled.div`
  height: '100%';
  width: ${progress}%;
  backgroundColor: ${bgcolor};
  borderRadius:40;
  textAlign: 'right;
`;

export const Progresstext = styled.span`
  padding: 10;
  color: 'black';
  fontWeight: 900;
`;