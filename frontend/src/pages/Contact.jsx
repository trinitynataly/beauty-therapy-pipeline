/*
Version: 1.3
Contact page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import block styles
import { heroStyle } from '../styles/common/blocks.css';
// Import text styles
import { sectionTitle } from '../styles/common/texts.css';
// Import form styles
import { inputField } from '../styles/common/forms.css';

const Contact = () => (
  <>
    {/* Meta tags */}
    <Helmet>
      <title>Contact Us | Beauty by Gulia</title>
      <meta
        name="description"
        content="Contact Beauty by Gulia for all your beauty needs. We offer a range of services including facials, waxing, and makeup."
      />
    </Helmet>
    {/* Hero Section */}
    <div className={`${heroStyle} h-96 flex items-center justify-center text-white`}>
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold">Contact Us</h1>
      </div>
    </div>

    {/* Contact Content */}
    <section className="py-16">
      <h1 className={sectionTitle}>Get in Touch</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="text-center max-w-lg">
          <p className="mb-4">
            We love hearing from our clients! If you have any questions, need help booking an appointment, or just want to chat, feel free to reach out.
          </p>
          <p className="mb-8">
            You can use the form below to contact us, or reach us directly via phone or email. We can&apos;t wait to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <form className="w-full max-w-lg flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className={`${inputField} w-full`}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`${inputField} w-full`}
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className={`${inputField} w-full`}
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="text-center mt-8">
          <p><strong>Email:</strong> Gulia@beautybygulia.com</p>
          <p><strong>Phone:</strong> 0477 547 398</p>
          <p><strong>Location:</strong> Aspendale</p>
        </div>
      </div>
    </section>
  </>
);

// Export the Contact component
export default Contact;
