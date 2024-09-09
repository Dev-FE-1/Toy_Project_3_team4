import { css } from '@emotion/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import youtubeImage from '@/assets/images/onboarding1.png';
import floatingImage from '@/assets/images/onboarding2.png';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '@/styles/theme';

const OnboardingSwiper = () => {
  const contents = [
    {
      title: (
        <>
          내 취향을 공유하고 <br /> 새로운 영상을 발견해 보세요
        </>
      ),
      image: youtubeImage,
    },
    {
      title: (
        <>
          내 취향의 영상을 모아 <br /> 플리를 만들 수 있어요
        </>
      ),
      image: floatingImage,
    },
  ];

  return (
    <Swiper
      css={swiperStyle}
      centeredSlides={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
    >
      {contents.map(({ title, image }, index) => (
        <SwiperSlide key={index}>
          <h2>{title}</h2>
          <img src={image} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const swiperStyle = css`
  width: 100%;

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 24px;
      text-align: center;
    }

    img {
      width: 240px;
      height: 240px;
      margin-bottom: 50px;
    }
  }

  .swiper-pagination-bullet {
    background-color: ${theme.colors.gray};
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: ${theme.colors.primary};
  }
`;

export default OnboardingSwiper;
