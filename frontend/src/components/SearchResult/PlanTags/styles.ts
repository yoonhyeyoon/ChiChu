import { styled } from '@mui/system';

type props = {
  istag: string | null;
};

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

export const PlanTagButton = styled('button')<props>`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${props => (props.istag ? blue[400] : blue[200])};
  opacity: ${props => (props.istag ? 1 : 0.6)};
  padding: 11px 20px;
  border-radius: 0.9rem;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${props => (props.istag ? blue[400] : blue[400])};
  }
`;
