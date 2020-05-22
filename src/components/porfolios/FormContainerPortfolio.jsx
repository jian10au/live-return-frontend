import React, { Component } from 'react';
import { httpRequest } from '../../src/utils/axios';
import { connect } from 'react-redux';

class FormContainerPortfolio extends Component {
  state = {
    name: '',
    description: '',
  };

  async componentDidMount() {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;
    if (this.props.match.params) {
      const response = await httpRequest.get(
        `/portfolios/${this.props.match.params.id}`,
        config
      );

      this.setState({
        name: response.data.name,
        description: response.data.description,
      });
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    console.log(event.target);
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    if (this.props.match.params) {
      console.log('you are going to update because the param exists');
      try {
        const response = await httpRequest.put(
          `/${this.props.submitRoute}`,
          this.state,
          config
        );
        console.log(response.data);
        this.props.history.push('/user/portfolios');
      } catch (err) {
        console.log(err.message);
      }
    }

    try {
      const response = await httpRequest.post(
        `/${this.props.submitRoute}`,
        this.state,
        config
      );
      console.log(response.data);
      this.props.history.push('/user/portfolios');
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div>{this.props.render(this.onChange, this.onSubmit, this.state)}</div>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(FormContainerPortfolio);
