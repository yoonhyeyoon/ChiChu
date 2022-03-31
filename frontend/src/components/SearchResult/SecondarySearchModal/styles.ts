import styled from 'styled-components';

export const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
};

export const ModalTitle = styled('span')`
  font-family: NotoSansKRMedium;
  font-size: 1.3rem;
  margin: 5px 8px;
`;
