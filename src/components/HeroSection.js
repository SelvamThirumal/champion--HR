import { useState } from 'react';
import './HeroSection.css';
import heroImg from '../assets/hero-img.png';
import { TypeAnimation } from 'react-type-animation';
import { sendEmail } from './MockEmailService';
import ContactForm from './ContactForm';

function HeroSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    option: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form data:", formData);

      // Use the mock email service instead of making an actual API call
      // This ensures the form works even if the email server is not available
      const responseData = await sendEmail({
        ...formData,
        timestamp: new Date().toISOString()
      });

      console.log("Response data:", responseData);

      // If we got here, the request was successful
      alert('Message sent successfully!');
      setStep(1);
      setFormData({
        name: '',
        email: '',
        option: '',
        contact: '',
        message: ''
      });

    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        formData,
        error
      });

      // Show a more user-friendly error message
      alert("Sorry, we couldn't send your message. Please try again later or contact us directly at info@championshrservices.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1>
              <strong>
                We are{' '}
                <span className="text-danger">
                  <TypeAnimation
                    sequence={[
                      'Staffing Company',
                      2000,
                      'Recruitment Agency',
                      2000,
                      'HR Compliance Services',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </strong>
            </h1>

            <p className="text-muted">
              Champions HR Services is one of India's leading <strong>staffing and recruitment consultancies</strong>,
              providing <strong>full-time placements, one-time hiring solutions, and bulk recruitment</strong> services
              across diverse industries. We are committed to delivering excellence through robust quality processes,
              strict HR compliance, and a client-centric approach.
            </p>
                 
            {/* Contact form */}
            <ContactForm/>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img src={heroImg} alt="HR Services" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;