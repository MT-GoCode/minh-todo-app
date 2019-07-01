import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, DatePicker, Icon, Card, Button } from 'antd'
import { Redirect } from 'react-router-dom'
const axios = require('axios');
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      todoVal: false
    };
  }
    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };
    onChangePassword = e => {
        this.setState({ password: e.target.value });
    };
    redirectToTodo = () => {
        if (this.state.todoVal) {
            return <Redirect to="/todo" />
        }
        else {
            return <span></span>
        }
        // this.state.loginVal?  : <span></span>
        
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.setState({errors: {}})
        console.log(userData)
        axios
        .post("http://localhost:5000/login", userData)
        .then(res => {
            if (res.data.errors) {
                console.log(res.data.errors)
                this.setState({errors: res.data.errors})
            }
            else {
                this.setState({todoVal: true})
                this.redirectToTodo()
                window.localStorage.setItem('user', this.state.email);
            }
        })
        .catch(err =>
        this.setState({errors: err})
        ) 
    };
    render() {
        const { errors } = this.state;
    return (
        <center><br/>
        {this.redirectToTodo()}
        <h1 style={{color:"blue"}}>Make Todos. Then React.</h1>   
        <Card title = "Login" style = {{width: '35%'}}>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
                Login
            </Button>
            <br/><h3>
                Need to create an account? 
                <Link to="/">  Register</Link>
            </h3>
        </Form>
        </Card></center>
        );
    }
}
export default Login;