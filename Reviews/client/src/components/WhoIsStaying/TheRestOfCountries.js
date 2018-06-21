import React from 'react';

const TheRestOfCountries = ({ countries }) => (
  <div className="other-country-block col-md-2 col-6">
    <div className="other-country d-flex flex-column justify-content-center mx-auto">
      <div className="other-country-flag btn">
        <i className="fa fa-flag" aria-hidden="true" />
      </div>
    </div>
    <div className="country-name text-center">Other</div>
    <div className="country-visit text-center">
      {countries.length} Other nationalities
    </div>
  </div>
);

export default TheRestOfCountries;
