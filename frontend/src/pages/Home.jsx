/*
Version: 1.3
Home page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/
// Import product images
import bodyTreatments from '../assets/services/body-treatments.jpg';
import facials from '../assets/services/facials.jpg';
import faceWaxing from '../assets/services/face-waxing.jpg';
import bodyWaxing from '../assets/services/body-waxing.jpg';
import tinting from '../assets/services/tinting.jpg';

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import Link component
import { Link } from 'react-router-dom';
// Import image styles
import { circleImage } from '../styles/common/images.css';
// Import block styles
import { heroStyle } from '../styles/common/blocks.css';
// Import button styles
import { secondaryButton } from '../styles/common/buttons.css';
// Import text styles
import { sectionTitle, sectionSubTitle, boxTitle } from '../styles/common/texts.css';
// Import Gulia photo
import gulia from '../assets/gulia.jpg';

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
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Welcome | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Welcome to Beauty by Gulia, where we offer a range of beauty treatments to help you feel your best. Book a spot today!" />
      </Helmet>
      {/* Hero Section */}
      <div className={`${heroStyle} flex items-center justify-center text-white`}>
        {/* Hero container */}
        <div className="text-center relative z-10">
          {/* Hero subtitle */}
          <h3 className="text-2xl font-normal pb-2">Welcome to Gulia&apos;s Beauty Therapy</h3>
          {/* Hero title */}
          <h1 className="text-6xl font-bold">Beauty Beyond Stress</h1>
          {/* Hero CTA button */}
          <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Book a Spot</button>
        </div>
      </div>    
      {/* Our Services Section */}
      <section className="py-16">
        {/* Container */}
        <div className="container mx-auto px-4">
          {/* Section title */}
          <h2 className={sectionTitle}>Our Services</h2>
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Loop all services */}
            {services.map((service, index) => (
              <div key={index} className="text-center">
                {/* Service image */}
                <div className={`${circleImage} mb-3`}>
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                {/* Service name */}
                <h3 className={sectionSubTitle}>{service.name}</h3>
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
        <h2 className={sectionTitle}>Why Beauty by Gulia</h2>
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className={boxTitle}>Personal Touch</h4>
              {/* Feature description */}
              <p className="mt-2">Customized beauty treatments designed to meet your unique needs and help you feel your best.</p>
            </div>
            {/* Feature 2 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className={boxTitle}>Passionate Expertise</h4>
              {/* Feature description */}
              <p className="mt-2">With a deep love for beauty therapy, I ensure every service is delivered with care, precision, and passion.</p>
            </div>
            {/* Feature 3 */}
            <div className="max-w-xs mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
              {/* Feature title */}
              <h4 className={boxTitle}>Relaxing Experience</h4>
              {/* Feature description */}
              <p className="mt-2">Step into a calming space where you can unwind, feel pampered, and let your inner beauty shine through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        {/* Container */}
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section title */}
          <h2 className={sectionTitle}>The Face Behind the Beauty</h2>
          {/* Section grid */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo Column */}
            <div className={`w-60 h-60 ${circleImage} mx-auto md:mx-0`}>
              {/* Gulia photo */}
              <img src={gulia} alt="Gulia" className="w-full h-full object-cover rounded-full" />
            </div>
            {/* Text Column */}
            <div className="flex-1 text-center md:text-left">
              {/* About text */}
              <p>
                Hello! I&apos;m Gulia, a dedicated beauty therapist who truly loves helping my clients feel amazing inside and out. My passion shines through
                every treatment I offer. Whether it&apos;s a soothing facial, a luxurious body treatment, or precise waxing and tinting, I pour that love
                into every session, making sure you leave not just looking beautiful, but feeling completely rejuvenated. I can&apos;t wait to welcome you
                into my studio, where we&apos;ll work together to let your natural beauty shine like never before!
              </p>
              {/* Link to about page */}
              <Link to="/about">
                {/* Learn more button */}
                <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
