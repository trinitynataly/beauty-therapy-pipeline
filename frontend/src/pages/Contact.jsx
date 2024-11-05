/*
Version: 1.5
Contact page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import Link component from React Router
import { Link } from 'react-router-dom';
// Import block styles
import { contactStyle } from '../styles/common/blocks.css';
// Import section title styles
import { sectionTitle } from '../styles/common/texts.css';
// Import contact text styles
import { contactText } from '../styles/common/texts.css';
// Import form styles
import { inputField } from '../styles/common/forms.css';
// Import button styles
import { primaryButton, secondaryButton } from '../styles/common/buttons.css';

/**
 * Contact page component
 * @returns {JSX.Element} Contact page content
 */
const Contact = () => (
  // Return the JSX for the Contact page
  <>
    {/* Meta tags */}
    <Helmet>
      {/* Page title */}
      <title>Contact Us | Beauty by Gulia</title>
      {/* Meta description */}
      <meta
        name="description"
        content="Contact Beauty by Gulia for all your beauty needs. We offer a range of services including facials, waxing, and makeup."
      />
    </Helmet>
    {/* Hero Section */}
    <div className={`${contactStyle} h-96 flex items-center justify-center text-white`}>
      {/* Hero container */}
      <div className="text-center relative z-10">
        {/* Hero subtitle */}
        <h3 className="text-2xl font-normal pb-2">Let&apos;s Create Your Moment of Bliss</h3>
        {/* Hero title */}
        <h1 className="text-6xl font-bold">Contact Us</h1>
        {/* Hero CTA button with link to services */}
        <Link to="/services">
          {/* Button */}
          <button className={`${secondaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Book a Spot</button>
        </Link>
      </div>
    </div>

    {/* Contact Content */}
    <section className="py-16">
      {/* Contact container */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Column 1: Contact Information and Form */}
        <div className="flex flex-col">
          <div>
            {/* Section title */}
            <h1 className={`${sectionTitle} text-left `}>Get in Touch</h1>
            {/* Section description */}
            <p className="mb-4">
              We love hearing from our clients! If you have any questions, need help booking an appointment, or just want to chat, feel free to reach out.
            </p>
            {/* Section instructions */}
            <p className="mb-8">
              You can use the form below to contact us, or reach us directly via phone or email. We can&apos;t wait to hear from you!
            </p>
          </div>
          {/* Contact Form */}
          <form className="w-full max-w-lg flex flex-col gap-4">
            {/* Your Name Field */}
            <input
              type="text"
              placeholder="Your Name"
              className={`${inputField} w-full`}
            />
            {/* Your Email Field */}
            <input
              type="email"
              placeholder="Your Email"
              className={`${inputField} w-full`}
            />
            {/* Your Message Field */}
            <textarea
              rows="5"
              placeholder="Your Message"
              className={`${inputField} w-full`}
            ></textarea>
            {/* Submit Button */}
            <button
              type="submit"
              className={`${primaryButton} mt-6 text-lg font-bold h-12 px-20 py-2 rounded-full`}
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Column 2: Contact Details and Map */}
        <div className="flex flex-col items-center md:items-start">
          {/* Section title */}
          <h1 className={`${sectionTitle} text-left`}>Contact Details</h1>
          {/* Contact Information */}
            <div className="text-center md:text-left">
              {/* Email */}
              <p><span className={`${contactText}`}>Email:</span> Gulia@beautybygulia.com</p>
              {/* Phone */}
              <p><span className={`${contactText}`}>Phone:</span> 0477 547 398</p>
              {/* Location */}
              <p><span className={`${contactText}`}>Location:</span> Aspendale, Melbourne</p>
            </div>
          {/* Google Map */}
          <div className="w-full h-96 mt-6">
            {/* Google Map iframe */}
            <iframe
              title="Aspendale Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.342153917102!2d145.0956393153187!3d-38.0244671797156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66f492d9c42ab%3A0xa1760d99f47a0b2f!2sAspendale%2C%20Victoria!5e0!3m2!1sen!2sau!4v1697477753269!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </>
);

// Export the Contact component
export default Contact;