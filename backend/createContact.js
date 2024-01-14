const axios = require('axios');

const intercomApiUrl = 'https://api.intercom.io/contacts';
const accessToken = 'dG9rOjdlNjM2ZTA2XzU2MTlfNGRjMl84ZWQzXzY5MmI5MGI0OTk4YToxOjA='; // Replace with your actual access token

const createContact = async () => {
  try {
    const response = await axios.post(intercomApiUrl, {
      email: 'kaustubhpathak64@yahoo.com',
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Contact created successfully:', response.data);
  } catch (error) {
    console.error('Error creating contact:', error.response ? error.response.data : error.message);
  }
};

module.exports = createContact;
