import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slide({ sliders }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Container>
      <SlideTitle>포스트</SlideTitle>
      <StyledSlider {...settings}>
        {sliders.map((name, image) => {
          return (
            <CardBox>
              <CardImg alt="서비스이미지" src={img} />
              <CardText>{name}</CardText>
            </CardBox>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

export default Slide;
