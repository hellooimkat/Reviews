import React from 'react';
import Header from './Header';
import RankedRating from './RankedRating';
import Filter from './Filter';
import Pagination from './Pagination';
import ReviewPage from './ReviewPage';

const Sidebar = () => (
  <div id="sidebar">
    <div
      className="modal left fade show"
      id="sidebarModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container">

              <Header />
              <RankedRating />
              <Filter />
              <ReviewPage />
              <Pagination />
            </div>
          </div>
          {/*
              <div className="modal-footer pt-5">
                <div className="container">
                  <Pagination />
                </div>
              </div>
            */}
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
