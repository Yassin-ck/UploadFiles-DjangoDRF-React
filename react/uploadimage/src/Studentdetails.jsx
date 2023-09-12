import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Studentdetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    image: null,
  });
  const [data, setData] = useState([]); // Combined state for fetched and posted data

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('age', formData.age);
    form.append('image', formData.image);

    try {
      const response = await axios.post('http://127.0.0.1:9000/', form);

      // Handle the response as needed
      console.log(response.data);

      // Append the posted data to the existing data state
      setData([...data, response.data]);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const getHandler = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:9000/');

      // Handle the GET response as needed
      const fetchedData = await response.data;

      // Combine the fetched data with existing data
      setData([...data, ...fetchedData]);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {data.map((item) => (
        <div key={item.id}>
          <h1>ID: {item.id}</h1>
          <h1>Name: {item.name}</h1>
          <h1>Age: {item.age}</h1>
          <img src={`http://127.0.0.1:9000${item.image}`} alt={`Image for ${item.name}`} />
          </div>
      ))}
    </div>
  );
};

export default Studentdetails;
