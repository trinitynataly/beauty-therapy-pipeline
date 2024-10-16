/*
Version: 1.4
About page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import Link component from React Router
import { Link } from 'react-router-dom';
// Import image styles
import { circleImage } from '../styles/common/images.css';
// Import text styles
import { sectionTitle, sectionSubTitle } from '../styles/common/texts.css';
// Import button styles
import { secondaryButton } from '../styles/common/buttons.css';
// Import block styles
import { aboutStyle } from '../styles/common/blocks.css';
// Import Gulia photo
import gulia from '../assets/gulia.jpg';

const About = () => (
  <>
    {/* Helmet component */}
    <Helmet>
        {/* Page title */}
        <title>About Us | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Learn more about Gulia, the beauty therapist behind Beauty by Gulia. Find out what drives her passion for beauty treatments and how she helps her clients feel amazing." />
      </Helmet>
    {/* Hero Section */}
    <div className={`${aboutStyle} flex items-center justify-center text-white`}>
    <div className="text-center relative z-10">
          {/* Hero subtitle */}
          <h3 className="text-2xl font-normal pb-2">Discover the Beauty of You</h3>
          {/* Hero title */}
          <h1 className="text-6xl font-bold">Where Passion Meets Care</h1>
          {/* Hero CTA button */}
          <Link to="/services">
            <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Book a Spot</button>
          </Link>
        </div>
    </div>

    {/* About Content */}
    <section className="py-16">
      <h1 className={sectionTitle}>The Face Behind the Beauty</h1>
        <div className="flex flex-col items-center gap-8">
          <div className={`${circleImage} w-80 h-80`}>
            <img src={gulia} alt="Gulia" className="w-full h-full object-cover" />
          </div>
          <div className="text-center max-w-2xl">
            <h2 className={sectionSubTitle}>Hello, I&apos;m Gulia!</h2>
            <p>
            I&apos;ve always felt that beauty is about more than just appearances — it&apos;s about feeling wonderful from the inside out.
            I absolutely love what I do, and that passion drives me every day as I help my clients feel relaxed, confident, and radiant through body treatments, facials, waxing, and tinting.
            Becoming a beauty therapist wasn&apos;t just a career choice; it was my soul&apos;s calling. Nothing makes me happier than creating a space where my clients can unwind and feel taken care of.
            When I&apos;m not at my studio, you can usually find me practicing yoga or dreaming about my next adventure in India — a place that has captured my heart.
            And above all, I love spending time with my two beautiful daughters, who inspire me every single day.
            Summary: I&apos;m Gulia, a beauty therapist who loves making my clients feel amazing. Outside of work, I enjoy yoga, India, and my two wonderful daughters.
            </p>
          </div>
        </div>
    </section>
  </>
);

// Export the About component
export default About;
