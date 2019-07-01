import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, DatePicker, Icon, Card, Button } from 'antd'
const axios = require('axios');
class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      country: "",
      birth: "",
      errors: {},
      loginVal: false
    };
  }
    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };
    onChangePassword = e => {
        this.setState({ password: e.target.value });
    };
    onChangeCountry = e => {
        this.setState({ country: e.target.value });
    };
    onChangeBirth = (date, dateString) => {
        this.setState({ birth: new Date(dateString) });
    };

    redirectToLogin = () => {
        if (this.state.loginVal) {
            return <Redirect to="/login" />
        }
        else {
            return <span></span>
        }        
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            country: this.state.country,
            birth: this.state.birth
        };
        this.setState({errors: {}})
        console.log(newUser)
        axios
        .post("http://localhost:5000/createAccount", newUser)
        .then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors)
                    this.setState({errors: res.data.errors})
                }
                else {
                    this.setState({loginVal:true})
                    this.redirectToLogin()
                }
            }
        )
            .catch(err => { // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                console.log(err)
            }
        )

    };
    render() {
        const { errors } = this.state;
    return (
        <center><br/>
        {this.redirectToLogin()}
        <h1 style={{color:"blue"}}>Make Todos. Then React.</h1>    
        <Card title = "Create Account" style = {{width: '35%'}}>
        <Form onSubmit = {this.onSubmit}className="container">
            <Form.Item required hasFeedback validateStatus={errors.email ? "error": ""} help = {errors.email}>
                <Input required onChange={this.onChangeEmail}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder = 'Email'
                />
            </Form.Item>
            <Form.Item required hasFeedback validateStatus={errors.password ? "error": ""} help={errors.password}>
                <Input required onChange={this.onChangePassword}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type = 'password'
                    placeholder = 'Password'
                />
            </Form.Item>
            <Form.Item>
                <Input onChange={this.onChangeCountry}
                    prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder = 'Country'
                    error={errors.country}
                />
            </Form.Item>
            <Form.Item >
                <DatePicker placeholder="Birthdate" onChange={this.onChangeBirth} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Create Account
            </Button>
            <br/><h3>
                Already have an account? 
                <Link to="/login">  Log in</Link>
            </h3>
        </Form>
        </Card></center>
        );
    }
}
export default CreateAccount;