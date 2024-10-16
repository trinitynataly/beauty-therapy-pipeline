/*
Version: 1.4
Home page for the frontend with dynamic categories.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// Import apiRequest utility function
import { apiRequest } from '../utils/api';

// Import styles
import { circleImage } from '../styles/common/images.css';
import { heroStyle, sectionDivider, dottedBlock } from '../styles/common/blocks.css';
import { secondaryButton } from '../styles/common/buttons.css';
import { sectionTitle, sectionSubTitle, boxTitle } from '../styles/common/texts.css';

// Import Gulia photo and icons
import gulia from '../assets/gulia.jpg';
import serviceHealing from '../assets/icons/healing.svg';
import serviceSpa from '../assets/icons/spa-and-relax.svg';
import serviceYoga from '../assets/icons/yoga-pose.svg';

/**
 * Home page component
 * @returns {JSX.Element} Home page content
 */
const Home = () => {
  const [categories, setCategories] = useState([]); // Categories state

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiRequest('categories', 'GET'); // Using apiRequest utility function
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
        <div className="text-center relative z-10">
          <h3 className="text-2xl font-normal pb-2">Welcome to Gulia&apos;s Beauty Therapy</h3>
          <h1 className="text-6xl font-bold">Beauty Beyond Stress</h1>
          <Link to="/services">
            <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Book a Spot</button>
          </Link>
        </div>
      </div>

      {/* Our Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <Link to={`/services/#${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <div className={`${circleImage} mb-3`}>
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className={sectionSubTitle}>{category.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Beauty by Gulia Section */}
      <section className={`py-16 ${sectionDivider}`}>
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>Why Beauty by Gulia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              <img src={serviceHealing} alt="Healing Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              <h4 className={boxTitle}>Personal Touch</h4>
              <p className="mt-2">Customized beauty treatments designed to meet your unique needs and help you feel your best.</p>
            </div>
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              <img src={serviceSpa} alt="Spa Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              <h4 className={boxTitle}>Passionate Expertise</h4>
              <p className="mt-2">With a deep love for beauty therapy, I ensure every service is delivered with care, precision, and passion.</p>
            </div>
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              <img src={serviceYoga} alt="Yoga Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              <h4 className={boxTitle}>Relaxing Experience</h4>
              <p className="mt-2">Step into a calming space where you can unwind, feel pampered, and let your inner beauty shine through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-16 ${sectionDivider}`}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className={sectionTitle}>The Face Behind the Beauty</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={`w-60 h-60 ${circleImage} mx-auto md:mx-0`}>
              <img src={gulia} alt="Gulia" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p>
                Hello! I&apos;m Gulia, a dedicated beauty therapist who truly loves helping my clients feel amazing inside and out. My passion shines through
                every treatment I offer. Whether it&apos;s a soothing facial, a luxurious body treatment, or precise waxing and tinting, I pour that love
                into every session, making sure you leave not just looking beautiful, but feeling completely rejuvenated. I can&apos;t wait to welcome you
                into my studio, where we&apos;ll work together to let your natural beauty shine like never before!
              </p>
              <Link to="/about">
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
