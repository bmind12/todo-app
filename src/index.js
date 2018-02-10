// @flow
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { v4 as uuid } from 'uuid'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import NewTaskForm from './components/NewTaskForm'
import TodoList from './components/TodoList'
import type { Task } from './types'
import './styles/index.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

type State = {
    data: Array<Task>,
    newTask: string
}

class App extends PureComponent<Props, State> {
    state = {
        data: [],
        newTask: ''
    }

    componentDidMount() {
        base.syncState('data', {
            context: this,
            state: 'data'
        });
        console.log(this.props);
    }
    
    // NewTaskForm functions
    changeNewTask = (evt) => {
        this.setState({
            newTask: evt.target.value
        });
    }
    
    submitNewTask = (evt) => {
        evt.preventDefault();

        if (!this.state.newTask) return;

        const updatedData = Array.from(this.state.data).slice();
        
        updatedData.push({
            id: uuid(),
            isDone: false,
            name: this.state.newTask.trim()
        })
        
        this.setState({
            ...this.state,
            data: updatedData
        });
    }

    // TodoItem functions
    editTodo = (id, newName) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.name = newName;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    toggleTodo = (id) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.isDone = !task.isDone;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    removeTodo = (id) => {
        const updatedData = this.state.data.filter(task => task.id !== id);
        
        this.setState({
            data: updatedData || []
        });
    }

    render() {
        return (
            <div>
                <NewTaskForm
                    changeNewTask={this.changeNewTask}
                    submitNewTask={this.submitNewTask}
                />
                <TodoList 
                    data={this.state.data}
                    editTodo={this.editTodo}
                    removeTodo={this.removeTodo}
                    toggleTodo={this.toggleTodo}
                />
            </div>
        )
    }
}

render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
)
registerServiceWorker()
