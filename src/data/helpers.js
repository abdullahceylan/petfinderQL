const { castArray } = require('lodash/fp');
const axios = require('axios');

module.exports = {
  makeIterable: data => (data ? castArray(data) : []),
  // Do network request
  doRequest: (endpoint, params) => {
    console.log(endpoint, JSON.stringify(params));
    return axios.get(endpoint, {
      params
    });
  },
  // Get pet status
  getStatus: status => {
    switch (status) {
      case 'A':
        return 'Adoptable';
      case 'H':
        return 'Hold';
      case 'P':
        return 'Pending';
      case 'X':
        return 'Adopted/Removed';
    }
    return size;
  },
  // Get pet size
  getSize: size => {
    switch (size) {
      case 'S':
        return 'Small';
      case 'M':
        return 'Medium';
      case 'L':
        return 'Large';
      case 'XL':
        return 'Extra Large';
    }
    return size;
  },
  // Get pet size
  getGender: gender => {
    switch (gender) {
      case 'F':
        return 'Female';
      case 'M':
        return 'Male';
    }
    return size;
  }
};
