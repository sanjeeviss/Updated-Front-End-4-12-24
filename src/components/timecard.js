import React, { useEffect } from 'react'; // Import React and useEffect
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const QuickSlideComponent = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Set to 1 second for quick animation
            easing: 'ease-in-out', // Optional: Choose an easing function
        });
    }, []);

    return (
        <div>
            <div data-aos="slide-up">
                <h1>This will slide up quickly!</h1>
            </div>
            <div data-aos="slide-right">
                <h1>This will slide right quickly!</h1>
            </div>
            <div data-aos="slide-left">
                <h1>This will slide left quickly!</h1>
            </div>
            <div data-aos="slide-down">
                <h1>This will slide down quickly!</h1>
            </div>
        </div>
    );
};

export default QuickSlideComponent;
