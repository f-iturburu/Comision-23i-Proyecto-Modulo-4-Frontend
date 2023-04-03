import Carousel from 'react-bootstrap/Carousel';

function CarouselHome() { 
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/assets/img/Carousel1.jpg"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/assets/img/Carousel2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/assets/img/Carousel3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;