import React from 'react';
import { Avatar } from '@mui/material';
import {
  Container,
  Profile,
  AvatarDiv,
  ProfileName,
  CompanyName,
  ProductName,
} from './styles';

export type CompanyProfileType = {
  logo_img: string;
  company_name: string;
  product_name: string;
};

function CompanyProfile(props: CompanyProfileType) {
  return (
    <Container>
      <Profile>
        <AvatarDiv>
          <Avatar
            src={props.logo_img}
            alt={props.company_name}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          />
        </AvatarDiv>
        <ProfileName>
          <CompanyName>{props.company_name}</CompanyName>
          <ProductName>{props.product_name}</ProductName>
        </ProfileName>
      </Profile>
    </Container>
  );
}

export default CompanyProfile;
