/*
Version: 1.2
Home page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/
// Import product images
import bodyTreatments from '../assets/services/body-treatments.jpg';
import facials from '../assets/services/facials.jpg';
import faceWaxing from '../assets/services/face-waxing.jpg';
import bodyWaxing from '../assets/services/body-waxing.jpg';
import tinting from '../assets/services/tinting.jpg';

// Import Link component
import { Link } from 'react-router-dom';

// Import gulia photo
import gulia from '../assets/gulia.jpg';

// Import styles
import { heroStyle, servicesImage, circleImage } from '../styles/home.css';

/**
 * Home page component
 * @returns {JSX.Element} Home page content
 */
const Home = () => {
  const services = [
    { name: 'Body Treatments', image: bodyTreatments },
    { name: 'Facials', image: facials },
    { name: 'Face Waxing', image: faceWaxing },
    { name: 'Body Waxing', image: bodyWaxing },
    { name: 'Tinting', image: tinting },
  ];
  return (
    <>
      {/* Hero Section */}
      <div className={`${heroStyle} h-96 flex items-center justify-center text-white`}>
        {/* Hero container */}
        <div className="text-center relative z-10">
          {/* Hero subtitle */}
          <h3 className="text-2xl font-normal pb-2">Welcome to Gulnara’s Beauty Therapy</h3>
          {/* Hero title */}
          <h1 className="text-6xl font-bold">Beauty Beyond Stress</h1>
          {/* Hero CTA button */}
          <button className="mt-6 bg-pink-700 text-white text-lg font-bold h-12 px-20 py-2 rounded-full">Book a spot</button>
        </div>
      </div>    
      {/* Our Services Section */}
      <section className="py-16">
        {/* Container */}
        <div className="container mx-auto px-4">
          {/* Section title */}
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Loop all services */}
            {services.map((service, index) => (
              <div key={index} className="text-center">
                {/* Service image */}
                <div className={servicesImage}>
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                {/* Service name */}
                <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Beauty by Gulia Section */}
      <section className="py-16 bg-gray-50">
        {/* Container */}
        <div className="container mx-auto px-4">
        {/* Section title */}
          <h2 className="text-4xl font-bold text-center mb-12">Why Beauty by Gulia</h2>
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className="text-xl font-semibold">Personal Touch</h4>
              {/* Feature description */}
              <p className="mt-2">Customized beauty treatments designed to meet your unique needs and help you feel your best.</p>
            </div>
            {/* Feature 2 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className="text-xl font-semibold">Passionate Expertise</h4>
              {/* Feature description */}
              <p className="mt-2">With a deep love for beauty therapy, I ensure every service is delivered with care, precision, and passion.</p>
            </div>
            {/* Feature 3 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className="text-xl font-semibold">Relaxing Experience</h4>
              {/* Feature description */}
              <p className="mt-2">Step into a calming space where you can unwind, feel pampered, and let your inner beauty shine through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        {/* Container */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          {/* Section title */}
          <div className={`w-80 h-80 ${circleImage} mx-auto md:mx-0`}>
            {/* Gulia photo */}
            <img src={gulia} alt="Gulia" className="w-full h-full object-cover rounded-full" />
          </div>
          {/* About block */}
          <div className="flex-1 text-center md:text-left">
            {/* About title */}
            <h2 className="text-3xl font-bold">The Face Behind the Beauty</h2>
            {/* About text */}
            <p className="mt-4">
              Hello! I&apos;m Gulia, a dedicated beauty therapist who truly loves helping my clients feel amazing inside and out. My passion shines through
              every treatment I offer. Whether it&apos;s a soothing facial, a luxurious body treatment, or precise waxing and tinting, I pour that love
              into every session, making sure you leave not just looking beautiful, but feeling completely rejuvenated. I can&apos;t wait to welcome you
              into my studio, where we&apos;ll work together to let your natural beauty shine like never before!
            </p>
            <Link to="/about">
              <button className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full cursor-pointer">Learn more</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
