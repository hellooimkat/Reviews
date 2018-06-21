import React from 'react';
import PropTypes from 'prop-types';
import CountryFlag from './CountryFlag';

// <div key={index} className="row">
// </div>
const Top5Countries = ({ countries }, index) => {
  return countries.map(([country, visit]) => (
    <div key={country} className="country-block col-md-2 col-6 mb-4">
      <div className="text-center">
        <CountryFlag name={country} />
      </div>
      <div className="country-name   text-center">{country}</div>
      <div className="country-visit  text-center">
        {visit > 5 ? visit - (visit % 5) : 1}+ Guests
      </div>
    </div>
  ));
};

Top5Countries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.array)
};

Top5Countries.defaultProps = {
  countries: []
};

export default Top5Countries;
