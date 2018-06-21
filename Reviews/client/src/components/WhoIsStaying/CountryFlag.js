import React, { Component } from 'react';
import axios from 'axios';
class CountryFlag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLink: ''
    };
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/name/' + this.props.name)
      .then(res => {
        this.setState({
          imgLink: `http://www.countryflags.io/${
            res.data[0].alpha2Code
          }/flat/64.png`
        });
        // this.setState({ imgLink: res.data[0].flag })
        // return axios.get()
      })
      .catch(err => console.error('Error loading failed:', err));
  }

  render() {
    return <img className="img-fluid" src={this.state.imgLink} />;
  }
}

export default CountryFlag;
