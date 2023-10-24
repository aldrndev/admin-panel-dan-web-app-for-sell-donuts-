import React, { useState, useEffect } from 'react';

const slides = [
  'https://cdn.app.jcodelivery.com/img/banner/banner-231004.webp',
  'https://cdn.app.jcodelivery.com/img/banner/banner-230519.jpg',
  'https://cdn.app.jcodelivery.com/img/banner/banner-hampers23.jpg',
];

const Carousell = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-10 shadow-lg">
      <div id="default-carousel" className="relative w-full">
        <div className="relative h-56 overflow-hidden md:h-96">
          <div className="absolute duration-700 ease-in-out top-0 w-full h-full">
            <img
              src={slides[currentSlide]}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Carousel slide"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousell;
