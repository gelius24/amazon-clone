import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bottom-0 bg-gradient-to-t from-gray-100 to-transparent z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            src="https://links.papareact.com/gi1"
            loading="lazy"
            alt="banner pic"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/6ff"
            loading="lazy"
            alt="banner pic"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/7ma"
            loading="lazy"
            alt="banner pic"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
