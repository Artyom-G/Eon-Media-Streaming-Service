import React, { useRef } from "react";
import "./Carousel.scss";

const Carousel = ({ children }) => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="carousel-container">
            <button className="scroll-button left" onClick={scrollLeft}>&#8249;</button>
            <div className="carousel" ref={carouselRef}>
                {children}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>&#8250;</button>
        </div>
    );
};

export default Carousel;
