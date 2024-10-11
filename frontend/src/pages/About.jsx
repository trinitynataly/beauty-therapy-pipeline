/*
Version: 1.2
About page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/

// Import Gulia photo and hero image
import gulia from '../assets/gulia.jpg';

// Import styles
import { heroStyle } from '../styles/home.css'; // Reusing the hero style from the Home page
import { aboutContainer, guliaPhoto, sectionTitle } from '../styles/about.css';

const About = () => (
  <>
    {/* Hero Section */}
    <div className={`${heroStyle} h-96 flex items-center justify-center text-white`}>
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold">About Us</h1>
      </div>
    </div>

    {/* About Content */}
    <div className={aboutContainer}>
      <h1 className={sectionTitle}>The Face Behind the Beauty</h1>
      <div className="flex flex-col items-center gap-8">
        <div className={guliaPhoto}>
          <img src={gulia} alt="Gulia" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Hello, I&apos;m Gulia!</h2>
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
    </div>
  </>
);

// Export the About component
export default About;
