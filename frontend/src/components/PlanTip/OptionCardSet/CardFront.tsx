import React from 'react';
import CardContent from '@mui/material/CardContent';

type PropType = {
  symptom: string;
  image: string;
};

function CardFront({ symptom, image }: PropType) {
  return (
    <>
      <CardContent>
        <img src={image} />
        <h1>{symptom}</h1>
      </CardContent>
    </>
  );
}

export default CardFront;
