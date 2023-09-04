import { useState } from "react";
import "swiper/css/bundle";
import "./Carousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay, Pagination, Keyboard, Mousewheel, Zoom, EffectFade, Thumbs } from "swiper";


export function Carousel(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [imgs, setImages] = useState(props.imgs.map((item) => (
        item.url
    )));


    return (
        <section className="carouselSection">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    type: "fraction",
                }}
                loop={true}

                effect={"fade"}
                spaceBetween={10}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Autoplay, Pagination, Mousewheel, Keyboard, Zoom, EffectFade, Thumbs]}
                className="carousel"
            >
                {imgs && imgs.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} />
                    </SwiperSlide>
                ))}

            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs"
            >
                {imgs && imgs.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}