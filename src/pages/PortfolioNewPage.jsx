import React, { Component } from 'react';
import { Navigation } from '../components/Navigation';
import FormContainerPortfolio from '../components/porfolios/FormContainerPortfolio';
import PortfolioForm from '../components/porfolios/PortfolioForm';
import { fetchUserProfile } from '../actions/userActions';

const pflCreationRoute = 'portfolios';

// ideally, I can create a customisable implementation for the handle submit when I compose the
// the behaviour;
// but here if we implement a new handle submit function.
// since the handle submit function will go the send the state out.
// i need to capture the state at a level higher the shared component;
// but the only change function only deal with the data at the component level;
// I need to create a new onChange at a higher level which defy the purpose of write the onchange function
// for once and share it among the different page

export class PortfolioNewPage extends Component {
  state = {
    name: '',
    description: '',
  };

  render() {
    return (
      <div>
        <Navigation />
        <FormContainerPortfolio
          {...this.props}
          submitRoute={pflCreationRoute}
          render={(onChange, onSubmit, state) => (
            <PortfolioForm
              onChange={onChange}
              // I am overwrite the onSubmit
              onSubmit={onSubmit}
              state={state}
            />
          )}
        />

        <h2>Provide details to create a new portfolio in here</h2>
      </div>
    );
  }
}

export default PortfolioNewPage;

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
//     const response = await httpRequest.post(
//       '/portfolios',
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
            placeholder="Provide name"
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
            placeholder="Provide description"
            required
          />
          <br />
          <button>Confirm</button>
        </form> */
}
