import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReviewsOnPage } from '../../actions/sidebarActions';

class Pagination extends Component {
  render() {
    // state props
    const {
      maxPageIndex,
      minPageIndex,
      currentPageIndex,
      hostelId,
      sortBy,
      isEnglish
    } = this.props;
    // action props
    const { fetchReviewsOnPage } = this.props;

    const handleFetchPrevPage = () => {
      fetchReviewsOnPage(currentPageIndex - 1, hostelId, sortBy, isEnglish);
    };

    const handleFetchNextPage = () => {
      fetchReviewsOnPage(currentPageIndex + 1, hostelId, sortBy, isEnglish);
    };

    const handleFetchFirstPage = () => {
      fetchReviewsOnPage(1, hostelId, sortBy, isEnglish);
    };

    const handleFetchLastPage = () => {
      fetchReviewsOnPage(maxPageIndex, hostelId, sortBy, isEnglish);
    };

    const renderPagination = () => {
      let pagination = [];
      const maxPageCount = maxPageIndex >= 5 ? 5 : maxPageIndex;
      let leftPage = currentPageIndex - 1;
      let rightPage = currentPageIndex + 1;
      pagination.push(
        <li className="page-item active" key={currentPageIndex}>
          <span
            className="page-link"
          >
            {currentPageIndex}
          </span>
        </li>
      );
      let pageCount = 1;

      while (pageCount < maxPageCount) {
        if (rightPage <= maxPageIndex) {
          (rightPage => {
            pagination.push(
              <li className="page=item" key={rightPage}>
                <span
                  className="page-link"
                  onClick={() =>
                    fetchReviewsOnPage(rightPage, hostelId, sortBy, isEnglish)
                  }
                >
                  {rightPage}
                </span>
              </li>
            );
          })(rightPage);
          pageCount++;
          rightPage++;
        }
        if (leftPage >= minPageIndex) {
          (leftPage => {
            pagination.unshift(
              <li className="page=item" key={leftPage}>
                <span
                  className="page-link"
                  onClick={() =>
                    fetchReviewsOnPage(leftPage, hostelId, sortBy, isEnglish)
                  }
                >
                  {leftPage}
                </span>
              </li>
            );
          })(leftPage);
          pageCount++;
          leftPage--;
        }
      }
      return pagination;
    };

    const prevButtonClassName = `page-item ${this.props.currentPageIndex <= 1 &&
      ' disabled'}`;

    const nextButtonClassName = `page-item ${this.props.currentPageIndex ===
      this.props.maxPageIndex && ' disabled'}`;

    return (
      <div id="pagination" className="container d-flex justify-content-center">
        {/* for mobile devices */}
        <nav
          aria-label="..."
          id="pagination-mobile"
          className="d-block d-sm-none"
        >
          <ul className="pagination">
            <li className={prevButtonClassName}>
              <a className="page-link" onClick={() => handleFetchPrevPage()}>
                <i className="fa fa-chevron-left" aria-hidden="true" />
              </a>
            </li>
            <span className="btn btn-pagination mx-2">
              {currentPageIndex} of {maxPageIndex}
            </span>
            <li className={nextButtonClassName}>
              <a className="page-link" onClick={() => handleFetchNextPage()}>
                <i className="fa fa-chevron-right" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        {/* large screen device */}
        <nav aria-label="..." className="d-none d-sm-block">
          <ul className="pagination">
            <li className={prevButtonClassName}>
              <span
                className="page-link"
                onClick={() => handleFetchFirstPage()}
              >
                First
              </span>
            </li>
            <li className={prevButtonClassName}>
              <span className="page-link" onClick={() => handleFetchPrevPage()}>
                &lt;
              </span>
            </li>

            {renderPagination()}

            {/* next last */}
            <li className={nextButtonClassName}>
              <span className="page-link" onClick={() => handleFetchNextPage()}>
                &gt;
              </span>
            </li>
            <li className={nextButtonClassName}>
              <span className="page-link" onClick={() => handleFetchLastPage()}>
                Last
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ sidebarReducer, overviewReviews }) => ({
  minPageIndex: sidebarReducer.minPageIndex,
  maxPageIndex: sidebarReducer.maxPageIndex,
  sortBy: sidebarReducer.sortBy,
  isEnglish: sidebarReducer.isEnglish,
  currentPageIndex: sidebarReducer.pageNum,
  hostelId: overviewReviews.id
});

export default connect(
  mapStateToProps,
  { fetchReviewsOnPage }
)(Pagination);
