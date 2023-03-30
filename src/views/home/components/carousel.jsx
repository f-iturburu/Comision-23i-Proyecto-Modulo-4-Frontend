import Carousel from 'react-bootstrap/Carousel';

function CarouselHome() { 
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/src/assets/img/prueba1.jpg"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/src/assets/img/carodef3.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcarousel"
          src="/src/assets/img/prueba1.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;