import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';
import injectSheet from 'react-jss'
import { createUseStyles } from 'react-jss'
import List from 'antd/es/list';
import Button from 'antd/es/button'
import {Input, Icon, Checkbox, Layout, Card, Radio } from 'antd'
const axios = require("axios")

const styles = {
  containerComp: {
    marginRight: 'auto',
    marginLeft:'auto',
    width: "75%"
  }
}

const TodoCont = ({classes, children}) => (
  <div className={classes.containerComp}>
    {children}
  </div>
)
const TodoContainer = injectSheet(styles)(TodoCont)

class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
    }
    remove = () => {
        this.props.removeTodo(this.props.todo.placer);
    };
    complete = () => {
        this.props.completeTodo(this.props.todo.placer);
    };
    uncomplete = () => {
        this.props.uncompleteTodo(this.props.todo.placer)
    }
    onChange = e => {
        e.preventDefault()
        if (this.props.todo.completedDate) {
            this.uncomplete()
        }
        else if (this.props.todo.completedDate == null) {
            this.complete()
        }
    }
    render() {
        return (
            
            <List.Item
                actions={
                [
                
                <Checkbox style = {{align: "left"}} 
                    checked = {this.props.todo.completedDate ? true : false}
                    onChange={this.onChange}>
                </Checkbox>,
                <Icon
                    type="close-circle"
                    theme="filled"
                    onClick={this.remove}
                />
                ]}>
                
                <span style = {{color: this.props.todo.completedDate ? 'grey' : 'blue', float:'left'}}>{this.props.todo.content}</span>({this.props.todo.tag})
            </List.Item>
        )
    }
}
export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typingTodo: '',
            typingTag: '',
            todos:[],
            todoType: 'all'
        }
        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getCurrent = this.getCurrent.bind(this);
        this.toggleState = this.toggleState.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/todoOp/${this.state.todoType}/${window.localStorage.getItem('user')}`)
        .then((todos)=>{
            console.log(todos)
            this.setState({todos: todos.data})
        })
    }
    getAll () {
        console.log('getting all')
        this.setState({todoType: 'all'})
        this.getNewSet()
    }
    getCurrent () {
        this.setState({todoType: 'current'})
        console.log('getting current')
        this.getNewSet()
    }

    onChangeTodo = e => {
        this.setState({typingTodo: e.target.value})
    }

    onChangeTag = e => {
        this.setState({typingTag: e.target.value})
    }

    getNewSet () {
        if (this.state.todoType == 'all') {
            axios.get(`http://localhost:5000/todoOp/all/${window.localStorage.getItem('user')}`)
            .then((todos)=>{
                console.log(todos)
                this.setState({todos: todos.data})
            })
            
            console.log('NEW TODOTYPE IS    ' + this.state.todoType)
        }
        else if (this.state.todoType == 'current') {
            axios.get(`http://localhost:5000/todoOp/current/${window.localStorage.getItem('user')}`)
            .then((todos)=>{
                console.log(todos)
                this.setState({todos: todos.data})
            })
            
            console.log('NEW TODOTYPE IS ' + this.state.todoType)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.todoType !== prevState.todoType) {
          this.getNewSet()
        }
    }
    toggleState () {
        if (this.state.todoType == 'current') {
            this.setState({todoType: 'all'}) 
            
        }
        if (this.state.todoType == 'all') {
            this.setState({todoType: 'current'})
        }
        
        console.log(this.state.todoType)
    }

    completeTodo = placer => {
        axios.post("http://localhost:5000/todoOp/complete", 
        {user: window.localStorage.getItem('user'),
            placer: placer, completedDate: new Date()
        })
        .then(()=> {
            console.log(`Completed Todo ${this.state.todos.filter(obj => {
                return obj.placer === placer
              })} !`)
              this.getNewSet()
        })
      };
    
    uncompleteTodo = placer => {
        axios.post("http://localhost:5000/todoOp/uncomplete", 
        {user: window.localStorage.getItem('user'),
            placer: placer, completedDate: new Date()
        })
        .then(()=> {
            console.log(`Uncompleted Todo ${this.state.todos.filter(obj => {
                return obj.placer === placer
              })} !`)
              this.getNewSet()
        })
      };

    removeTodo = placer => {
        axios.post("http://localhost:5000/todoOp/delete", 
        {user: window.localStorage.getItem('user'),
            placer: placer
        })
        .then(()=> {
            console.log(`Removed Todo !`)
            this.getNewSet()
        })
        
      };

    displayShowButton () {
        return <Radio.Group onChange = {this.toggleState} value = {this.state.todoType}><Radio
        checked  value = {'all'}>Show All</Radio>
        <Radio value = {'current'}
        >Show Current Only</Radio></Radio.Group>
    }

    handleInput = e => {
        let newID = Math.random().toString(36).substring(7)
        e.preventDefault();
        e.target.value = ''
        const todo = {
            placer: newID,
            content: this.state.typingTodo,
            tag: this.state.typingTag,
            createdDate: new Date()
        }
        axios
        .post("http://localhost:5000/todoOp/add", {user: window.localStorage.getItem('user'), todo: todo})
        .then((res)=>{
            console.log(res)//`Added todo ${res} !`)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        const newTodos = this.state.todos.concat(todo)
        this.setState({
            todos: newTodos,
        });
    }
  render () {
    let tags = this.state.tags
    const space = '  '
    return (
    <div><center><Card style = {{width :'60%', height: "100%"}}>
        <h2>Welcome, {window.localStorage.getItem('user')}!</h2><br/>

        <form onSubmit={this.handleInput}>
            <Input style={{width: "35%"}} onChange = {this.onChangeTodo} placeholder = " What toDo?" />
            <Input style={{width: "25%"}}  onChange = {this.onChangeTag} placeholder = "Enter Tags"/> 
            {space} <Button type = "primary" htmlType="submit">Add New Todo</Button>
        </form><br/>    
        
        <span style = {{fontWeight: 'bold', float: 'left', fontSize: 16}}>Your Todo list</span>
        <span style = {{float: 'right'}}>{this.displayShowButton()}</span>
        <br/><br/>
        
        <List 
            bordered
            locale={{ emptyText: "No todo items" }}
            dataSource={this.state.todos}
            renderItem={item => (
            <TodoItem
                style ={{float: "left"}}
                todo={item}
                removeTodo={this.removeTodo}
                completeTodo={this.completeTodo}
                uncompleteTodo = {this.uncompleteTodo}
            />
            )}
        />
    </Card>Copyright (C) Minh Trinh</center></div>)
    }
}



