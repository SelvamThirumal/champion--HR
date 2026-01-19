import './HeroSection.css';
import heroImg from '../assets/hero-img.png';
import { TypeAnimation } from 'react-type-animation';
import ContactForm from './ContactForm';

function HeroSection() {
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