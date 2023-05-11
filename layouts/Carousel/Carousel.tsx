import { Carousel } from 'flowbite-react';

type Props = {
    slides: {
        id: number;
        slide: string;
    }[];
};

const CarouselElement = ({ slides }: Props) => {
    return (
        <div className="w-layout mb-9 m-auto h-56 sm:h-64 max-sm:my-0 max-sm:px-2 xl:h-80 2xl:h-[500px]">
            <Carousel slideInterval={5000}>
                {slides.map((slide) => (
                    <img key={slide.id} src={slide.slide} alt="..." className="object-cover" />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselElement;
