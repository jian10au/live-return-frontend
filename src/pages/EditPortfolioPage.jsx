import React, { Component } from 'react';
import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';

import FormContainerPortfolio from '../components/porfolios/FormContainerPortfolio';
import PortfolioForm from '../components/porfolios/PortfolioForm';

class EditPortfolioPage extends Component {
  state = {
    displayInvestmentForm: false,
  };

  render() {
    return (
      <div>
        <Navigation />
        <FormContainerPortfolio
          parentState={this.state}
          {...this.props}
          submitRoute={`portfolios/${this.props.match.params.id}`}
          render={(onChange, onSubmit, state) => (
            <PortfolioForm
              onChange={onChange}
              onSubmit={onSubmit}
              state={state}
            />
          )}
        />
      </div>
    );
  }
}

export default EditPortfolioPage;

// async componentDidMount() {
//   const { authToken } = this.props;
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };
//   config.headers['x-auth-token'] = authToken;

//   const response = await httpRequest.get(
//     `/portfolios/${this.props.match.params.id}`,
//     config
//   );
//   this.setState({
//     name: response.data.name,
//     description: response.data.description,
//   });
// }

// handleChange = (event) => {
//   this.setState({ [event.target.name]: event.target.value });
// };

// handleSubmit = async (event) => {
//   const { authToken } = this.props;
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };
//   config.headers['x-auth-token'] = authToken;

//   event.preventDefault();
//   try {
//     const response = await httpRequest.put(
//       `/portfolios/${this.props.match.params.id}`,
//       this.state,
//       config
//     );
//     this.props.history.push('/user/portfolios');
//   } catch (err) {
//     console.log(err);
//   }
// };

{
  /* <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Portfolio Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
            defaultValue={this.state.name}
            required
          />
          <br />

          <br />

          <label htmlFor="description">Description</label>
          <textarea
            onChange={this.handleChange}
            type=""
            name="description"
            id="description"
            defaultValue={this.state.description}
            required
          />
          <br />
          <button>Confirm</button>
        </form> */
}
