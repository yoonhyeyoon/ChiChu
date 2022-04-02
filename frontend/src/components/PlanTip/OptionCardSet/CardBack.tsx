import React from 'react';
import CardContent from '@mui/material/CardContent';

type PropType = {
  name: string;
  name2: string | null;
  description: string;
};

function CardBack({ name, name2, description }: PropType) {
  return (
    <>
      <CardContent>
        <h1>{name}</h1>
        {name2 ? <p>{name2}</p> : null}
        <p>{description}</p>
      </CardContent>
    </>
  );
}

export default CardBack;
