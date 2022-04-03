import React from 'react';
import CardContent from '@mui/material/CardContent';
import { Symptom } from './styles';

type PropType = {
  symptom: string;
  image: string;
};

function CardFront({ symptom, image }: PropType) {
  return (
    <>
      <CardContent>
        <img src={image} />
        <Symptom>{symptom}</Symptom>
      </CardContent>
    </>
  );
}

export default CardFront;
