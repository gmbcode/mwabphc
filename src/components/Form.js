// src/components/Form.js
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import './Form.css';

const Form = () => {
  // Create state for all 9 input fields
  const [formData, setFormData] = useState({
    id1: '',
    id2: '',
    id3: '',
    id4: '',
    id5: '',
    id6: '',
    id7: '',
    id8: '',
    id9: ''
  });
  
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get the reCAPTCHA token
      const captchaToken = recaptchaRef.current.getValue();
      
      if (!captchaToken) {
        setStatus('Please complete the reCAPTCHA verification');
        setLoading(false);
        return;
      }
      
      // Send form data to API endpoint
      const response = await axios.post('/api/submit-form.js', {
        ...formData,
        captchaToken
      });
      
      if (response.data.success) {
        setStatus('Form submitted successfully!');
        // Reset form fields
        setFormData({
          id1: '',
          id2: '',
          id3: '',
          id4: '',
          id5: '',
          id6: '',
          id7: '',
          id8: '',
          id9: ''
        });
        // Reset reCAPTCHA
        recaptchaRef.current.reset();
      } else {
        setStatus('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Generate input fields dynamically
  const renderInputFields = () => {
    const fields = [];
    
    for (let i = 1; i <= 9; i++) {
      const fieldName = `id${i}`;
      fields.push(
        <div className="form-group" key={fieldName}>
          <label htmlFor={fieldName}>ID {i}</label>
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleChange}
            required
          />
        </div>
      );
    }
    
    return fields;
  };

  return (
    <div className="form-container">
      <h2>Mock Wing Allotment Simulator</h2>
      
      {status && (
        <div className={`status-message ${status.includes('success') ? 'success' : 'error'}`}>
          {status}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {renderInputFields()}
        
        <div className="recaptcha-container">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Form;

