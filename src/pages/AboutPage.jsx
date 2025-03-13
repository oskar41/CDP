import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const AboutPage = () => {
  const [userInput, setUserInput] = useState('');
  const [sanitizedContent, setSanitizedContent] = useState('');

  // Example 1: Whitelisting
  const handleWhitelistInput = (e) => {
    // Allow only letters, numbers and spaces
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    setUserInput(sanitized);
  };

  // Example 2: Blacklisting
  const handleBlacklistInput = (e) => {
    // Block dangerous HTML tags
    const sanitized = e.target.value.replace(/<script>|<\/script>|<iframe>|<\/iframe>/g, '');
    setUserInput(sanitized);
  };

  // Example 3: Encoding
  const handleEncodingInput = (e) => {
    const encodeHTML = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    setSanitizedContent(encodeHTML(e.target.value));
  };

  // Example 4: Using DOMPurify
  const handleDOMPurifyInput = (e) => {
    const clean = DOMPurify.sanitize(e.target.value);
    setSanitizedContent(clean);
  };

  return (
    <div>
      <h2>XSS (Cross‑site scripting)</h2>
      <p>
        SOP (Same‑Origin Policy) <br />
        CSP (Content Security Policy)  <br />
        - Stored XSS <br />
        - Reflected XSS <br />
        - DOM-Based XSS <br />
      </p>

      <hr />

      <div className="sanitization-examples">
        <h2>Input Sanitization Examples:</h2>
        
        {/* Example 1: Whitelisting */}
        <div className="example">
          <h3>1. Whitelisting</h3>
          <input
            type="text"
            value={userInput}
            onChange={handleWhitelistInput}
            placeholder="Enter text (letters and numbers only)"
          />
          <p>Result: {userInput}</p>
        </div>

        {/* Example 2: Blacklisting */}
        <div className="example">
          <h3>2. Blacklisting</h3>
          <input
            type="text"
            value={userInput}
            onChange={handleBlacklistInput}
            placeholder="Enter text (dangerous tags blocked)"
          />
          <p>Result: {userInput}</p>
        </div>

        {/* Example 3: Encoding */}
        <div className="example">
          <h3>3. Encoding</h3>
          <input
            type="text"
            onChange={handleEncodingInput}
            placeholder="Enter text for encoding"
          />
          <p>Encoded result: {sanitizedContent}</p>
        </div>

        {/* Example 4: DOMPurify */}
        <div className="example">
          <h3>4. DOMPurify</h3>
          <input
            type="text"
            onChange={handleDOMPurifyInput}
            placeholder="Enter HTML for sanitization"
          />
          <p>Sanitized result: {sanitizedContent}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;