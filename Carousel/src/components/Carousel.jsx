/* eslint-disable react/prop-types */
import { useState } from "react";
import carouselData from "./carouselData";

function Carousel() {
  const [curr, setCurr] = useState(0);

  const previousImage = curr === 0 ? carouselData.length - 1 : curr - 1;
  const nextImage = curr === carouselData.length - 1 ? 0 : curr + 1;

  const arr = [previousImage, curr, nextImage];
  function prevSlider() {
    setCurr((curr) => (curr === 0 ? carouselData.length - 1 : curr - 1));
  }

  function nextSlider() {
    setCurr((curr) => (curr === carouselData.length - 1 ? 0 : curr + 1));
  }
  console.log(arr);
  //   useEffect(() => {
  //     if (!autoSlide) return;
  //     const slideInterval = setInterval(nextSlider, autoSlideInterval)
  //     return () => clearInterval(slideInterval);
  //   },[autoSlide, autoSlideInterval, curr])

  return (
    <div className="max-w-7xl border mx-auto pt-6 relative">
      <div className="overflow-hidden relative p-8">
        <div
          className="flex gap-8 transition-transform ease-out duration-500000"
          //   style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {arr.map((actualIdx, idx) => {
            const { imageUrl, title, description } = carouselData[actualIdx];
            console.log(carouselData[actualIdx]);
            return (
              <CarouselContainer
                key={idx}
                img={imageUrl}
                title={title}
                description={description}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <button
            onClick={prevSlider}
            className="text-4xl font-bold bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-600 transition"
          >
            &lt;
          </button>
          <button
            onClick={nextSlider}
            className="text-4xl font-bold bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-600 transition"
          >
            &gt;
          </button>
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {carouselData.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full ${
              curr === idx ? "bg-zinc-800" : "bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselContainer({ img, title, description }) {
  return (
    <div className="flex-shrink-0 border rounded-lg overflow-hidden shadow-lg w-[400px] bg-white p-4">
      <img
        className="h-56 w-full object-cover rounded-lg"
        src={img}
        alt={title}
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default Carousel;
