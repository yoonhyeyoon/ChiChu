import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@material-ui/core';

type PropType = {
  text1: string;
  text2: string;
  img: string;
  articlenum?: number;
};

export default function CarouselCard(props: PropType) {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <a
          href=""
          style={{ textDecoration: 'none' }}
          onClick={() => {
            navigate(`./${props.articlenum}`, {
              state: { articlenum: props.articlenum },
            });
          }}
        >
          <CardContent>
            <CardMedia
              style={{ height: '250px', paddingTop: '2%' }}
              component="img"
              image={props.img}
              alt="Pancakes"
            />
            <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
              보험안내서
            </Typography>
            <Typography variant="h5" component="div">
              {props.text1}
              <br />
              {props.text2}
            </Typography>
          </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
}
