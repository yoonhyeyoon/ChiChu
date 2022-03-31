import React, { Component } from 'react';

import {
  SlideTitle,
  Container,
  StyledSlider,
  CardBox,
  CardImg,
  CardText,
} from './styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type PropType = {
  postList: {
    name: string;
    img: string;
  }[];
};

function PostCarousel(props: PropType) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  console.log(props);

  return (
    <Container>
      <SlideTitle>포스트</SlideTitle>
      <StyledSlider {...settings}>
        {/* {props.map((name, img) => {
          return (
            <CardBox>
              <CardImg alt="서비스이미지" src={img} />
              <CardText>{name}</CardText>
            </CardBox>
          );
        })} */}
      </StyledSlider>
    </Container>
  );
}

export default PostCarousel;
