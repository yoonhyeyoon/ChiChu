import { styled } from '@mui/system';

export const SceneCard = styled('div')`
width: 200px;
height: 260px;
background-color:white;
border: 1px solid black;
}
`;

export const Container = styled('div')`
margin-top: 50px;
display: grid;
grid-template-columns: 250px 250px 250px;
gap: 30px;
text-align:center;
margin-bottom: 60px;
}
`;
export const Box = styled('div')`
width: 300px;
height: 260px;
}
`;

export const Description = styled('p')`
  font-size: 14px;
  font-family: NotoSansKRLight;
`;
export const OptionName = styled('h3')`
  font-size: 17px;
  font-family: NotoSansKRBold;
`;
export const FindText = styled('h3')`
  font-size: 13px;
  font-family: NotoSansKRLight;
  color: #3399ff;
  cursor: pointer;
`;
export const Symptom = styled('h2')`
  font-size: 18px;
  font-family: NotoSansKRBold;
  word-wrap: break-word;
`;
