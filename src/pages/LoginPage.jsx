import React, { Component, SyntheticEvent } from 'react'
import {httpRequest} from '../utils/axios'

export class LoginPage extends Component {

    state = {
        username:"",
        password:""
    }


    handleChange = (event)=> {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submit button working')
        console.log(this.state)
       try {
           await httpRequest.post('/registration', this.state)
        }catch(err){
            console.log(err)
       }
    }

    render() {

        console.log(this.state);
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
               <input onChange={this.handleChange}type="text" name="username" defaultValue="Provide a username" />
               <br />
               <input onChange={this.handleChange} type="text" name="password" defaultValue="Provide passwords" />
               <br />
               <button>Create a new user</button>
               <button>Sign In</button>
            </form>   
          </div>
        )
    }
}

export default LoginPage
