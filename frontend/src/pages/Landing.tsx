import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import Banner from '../components/Landing/Banner';
import LandingFirst from '../components/Landing/LandingFirst';

function Landing() {
  const [isScroll, setIsScroll] = useState(false);

  const onScrollEvent = () => {
    if (window.pageYOffset > 0) {
      setIsScroll(true);
    }
    if (window.pageYOffset === 0) {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('mousewheel', onScrollEvent);
    return () => {
      // TODO: 메모리 누수 방지
      window.removeEventListener('mousewheel', onScrollEvent);
    };
  }, []);
  return (
    <div>
      <Header
        isScrollBackground={isScroll}
        isScrollShadow={isScroll}
        isScrollTransition={isScroll}
      />
      <Banner />
      <LandingFirst />
    </div>
  );
}

export default Landing;
