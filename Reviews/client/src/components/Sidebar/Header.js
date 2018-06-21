import React from 'react';

const SidebarHeader = () => (
  <div id="sidebarHeader">
    <nav className="navbar navbar-expand-md fixed-top">
      <div className="container d-flex justify-content-between">
        <div className="navbar-brand" href="#">
          <div className="container">Reviews & Ratings</div>
        </div>
        <div
          className="close align-items-center"
          data-dismiss="modal"
          aria-label="Close"
        >
          &times;
        </div>
      </div>
    </nav>
    <div className="d-flex justify-content-between mt-5 pt-2" />
    <div>
      The rating percentage is calculated from customers who booked within the
      last 6 months. All ratings and reviews are based on the feedback and
      opinions of the customers who submitted them and do not express the
      opinions of Hostelworld.com. This way, you get an up-to-the-minute opinion
      of just how good a hostel really is.
    </div>
    <a id="guideLines" href="https://www.hostelworld.com/reviewguidelines">
      <div>Read our review guidelines</div>
    </a>
  </div>
);

export default SidebarHeader;
