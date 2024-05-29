import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NailSizeOptions = () => {
    const [nailSizeOptions, setNailSizeOptions] = useState([]);
    const [newOption, setNewOption] = useState({ name: '', description: '' });
  
    useEffect(() => {
      fetchNailSizeOptions();
    }, []);
  
    const fetchNailSizeOptions = async () => {
      try {
        const response = await axios.get('/nail_sizes');
        setNailSizeOptions(response.data);
      } catch (error) {
        console.error('Error fetching nail size options:', error);
      }
    };
    const handleInputChange = (e) => {
        setNewOption({ ...newOption, [e.target.name]: e.target.value });
      };
      
      const handleCreateOption = async () => {
        try {
          const response = await axios.post('/nail_sizes', newOption);
          setNailSizeOptions([...nailSizeOptions, response.data]);
          setNewOption({ name: '', description: '' });
        } catch (error) {
          console.error('Error creating nail size option:', error);
        }
      };
      
    
  return (
    <div>
      <h2>Nail Size Options</h2>
      <ul>
        {nailSizeOptions.map((option) => (
          <li key={option.id}>
            <h3>{option.name}</h3>
            <p>{option.description}</p>
          </li>
        ))}
      </ul>
      <h3>Create New Nail Size Option</h3>
      <input
        type="text"
        name="name"
        value={newOption.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={newOption.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button onClick={handleCreateOption}>Create</button>
    </div>
  );
  
    // ... (add logic for creating a new nail size option)
  };
  
  export default NailSizeOptions;

