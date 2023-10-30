import React, { useState } from 'react';

const Creative: React.FC = () => {
  // State variables to store input values
  const [content, setContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [completion, setCompletion] = useState<string | null>(null); // Initialize with null

  // Handler function for content input
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Handler function for tone selection
  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the request data
    const requestData = {
      message: content, // Use the content from the textarea
      tone: selectedTone, // Use the selected tone
    };

    try {
      const response = await fetch('http://localhost:8888/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Send the request data to your server
      });

      if (response.ok) {
        const data = await response.json();
        const message = data.choices[0]?.message;
        setCompletion(message || null); // Set to null if message is undefined
      } else {
        console.error('API Request Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid">
      <div className="input-form">
      <h1>Creative Enhancer</h1>
      <p>Our randomization functionality produces enhanced and creative content</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Enter Content:</label>
          <textarea
            className="input-content"
            id="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="form-group">
          <div className="input-tone">
            <label htmlFor="tone">Select Tone:</label>
            <select id="tone" value={selectedTone} onChange={handleToneChange}>
              <option value="">Select a tone</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>

      
    </div>

    <div className="completion">
        {completion !== null && (
          <p>{completion.content}</p>
        )}
      </div>
    </div>
  );
};

export default Creative;
