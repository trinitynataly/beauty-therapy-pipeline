/*
Version: 1.6
Home page for the frontend with dynamic categories.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import { Helmet } from 'react-helmet-async'; // Import the Helmet component from React Helmet
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { apiRequest } from '../utils/api'; // Import the apiRequest utility function

// Import styles
import { circleImage } from '../styles/common/images.css'; // Import the circleImage style
import { heroStyle, sectionDivider, dottedBlock } from '../styles/common/blocks.css'; // Import the heroStyle, sectionDivider, and dottedBlock styles
import { secondaryButton } from '../styles/common/buttons.css'; // Import the secondaryButton style
import { sectionTitle, sectionSubTitle, boxTitle } from '../styles/common/texts.css'; // Import the sectionTitle, sectionSubTitle, and boxTitle styles

// Import Gulia photo and icons
import gulia from '../assets/gulia.jpg'; // Import the Gulia photo
import serviceHealing from '../assets/icons/healing.svg'; // Import the healing icon 
import serviceSpa from '../assets/icons/spa-and-relax.svg'; // Import the spa icon
import serviceYoga from '../assets/icons/yoga-pose.svg'; // Import the yoga icon

/**
 * Home page component
 * @returns {JSX.Element} Home page content
 */
const Home = () => {
  const [categories, setCategories] = useState([]); // Categories state

  // Fetch categories from the backend
  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        // Fetch categories from the backend
        const response = await apiRequest('categories', 'GET');
        // Set the categories in the state
        setCategories(response);
      } catch (error) {
        // Log any errors to the console
        console.error('Error fetching categories:', error);
      }
    };

    // Call the fetchCategories function
    fetchCategories();
  }, []);

  // Return the JSX for the Home page
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
        <div className="container mx-auto">
          {/* Hero content */}
          <div className="text-center relative z-10">
            {/* Hero subtitle */}
            <h3 className="text-2xl font-normal pb-2">Welcome to Gulia&apos;s Beauty Therapy</h3>
            {/* Hero main title */}
            <h1 className="text-6xl font-bold">Beauty Beyond Stress</h1>
            {/* Hero CTA button with link to services */}
            <Link to="/services">
              {/* Button */}
              <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Browse our Services</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <section className="py-16">
        {/* Services container */}
        <div className="container mx-auto px-4">
          {/* Section title */}
          <h2 className={sectionTitle}>Our Services</h2>
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Map the categories array to create the service blocks */}
            {categories.map((category) => (
              // Create a service block for each category
              <div key={category.id} className="text-center">
                {/* Link to the category services with the category name as the anchor */}
                <Link to={`/services/#${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  {/* Category image in a circle */}
                  <div className={`${circleImage} mb-3`}>
                    {/* Category image */}
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  {/* Category name */}
                  <h3 className={sectionSubTitle}>{category.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Beauty by Gulia Section */}
      <section className={`py-16 ${sectionDivider}`}>
        {/* Why Beauty by Gulia container */}
        <div className="container mx-auto px-4">
          {/* Section title */}
          <h2 className={sectionTitle}>Why Beauty by Gulia</h2>
          {/* Why Beauty by Gulia grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Touch block */}
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              {/* Healing icon */}
              <img src={serviceHealing} alt="Healing Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              {/* Feature title */}
              <h4 className={boxTitle}>Personal Touch</h4>
              {/* Feature description */}
              <p className="mt-2">Customized beauty treatments designed to meet your unique needs and help you feel your best.</p>
            </div>
            {/* Passionate Expertise block */}
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              {/* Spa icon */}
              <img src={serviceSpa} alt="Spa Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              {/* Feature title */}
              <h4 className={boxTitle}>Passionate Expertise</h4>
              {/* Feature description */}
              <p className="mt-2">With a deep love for beauty therapy, I ensure every service is delivered with care, precision, and passion.</p>
            </div>
            {/* Relaxing Experience block */}
            <div className={`max-w-xs mx-auto text-center bg-white ${dottedBlock}`}>
              {/* Yoga icon */}
              <img src={serviceYoga} alt="Yoga Icon" className="w-24 h-24 mt-3 mb-3 mx-auto" />
              {/* Feature title */}
              <h4 className={boxTitle}>Relaxing Experience</h4>
              {/* Feature description */}
              <p className="mt-2">Step into a calming space where you can unwind, feel pampered, and let your inner beauty shine through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-16 ${sectionDivider}`}>
        {/* About container */}
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section title */}
          <h2 className={sectionTitle}>The Face Behind the Beauty</h2>
          {/* About content */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Gulia photo in a circle */}
            <div className={`w-60 h-60 ${circleImage} mx-auto md:mx-0`}>
              {/* Gulia photo image */}
              <img src={gulia} alt="Gulia" className="w-full h-full object-cover rounded-full" />
            </div>
            {/* About text container */}
            <div className="flex-1 text-center md:text-left">
              {/* About text */}
              <p>Hello! I&apos;m Gulia, a dedicated beauty therapist who truly loves helping my clients feel amazing inside and out. My passion shines through
                every treatment I offer. Whether it&apos;s a soothing facial, a luxurious body treatment, or precise waxing and tinting, I pour that love
                into every session, making sure you leave not just looking beautiful, but feeling completely rejuvenated. I can&apos;t wait to welcome you
                into my studio, where we&apos;ll work together to let your natural beauty shine like never before!</p>
              {/* About CTA button with link to about page */}
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

// Export the Home component
export default Home;
