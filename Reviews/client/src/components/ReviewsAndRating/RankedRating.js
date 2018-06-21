import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RankedRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankedFeatures: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rankedFeatures: nextProps.rankedFeatures });
  }

  render() {
    const { rankedFeatures } = this.state;
    let colClass = this.props.sidebar ? "col-md-6" : "col-md-3";
    return (
      <div className="row" id="rankedRating">
        {rankedFeatures.map(each => (
          <div className={colClass} key={each._id}>
            <div className="row d-flex justify-content-between px-3 my-1">
              <div>{each.feature}</div>
              <div className="rating">{each.rating.toFixed(1)}</div>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: (each.rating/10*100)+'%',
                  ariaValuenow: '25',
                  ariaValuemin: '0',
                  ariaValuemax: '100'
                }}
              />
            </div>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

RankedRating.propTypes = {
  rankedFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string,
      rating: PropTypes.number
    })
  ).isRequired
};

const mapStateToProps = state => ({
  rankedFeatures: state.rankedFeatures
});

export default connect(
  mapStateToProps,
  {}
)(RankedRating);
