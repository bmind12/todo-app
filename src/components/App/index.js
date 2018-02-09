import React, { PureComponent } from 'react';
import { v4 as uuid } from 'uuid';
import base from '../../base';
import NewTaskForm from './NewTaskForm';
import TodoList from './TodoList';

class App extends PureComponent {
    state = {
        data: []
    }

    componentDidMount() {
        base.syncState('data', {
            context: this,
            state: 'data'
        });
    }
    
    // NewTaskForm functions
    handleTodoAdd = (task) => {
        const updatedData = Array.from(this.state.data).slice();
        
        updatedData.push({
            id: uuid(),
            isDone: false,
            name: task.trim()
        })
        
        this.setState({
            data: updatedData
        });
    }

    // TodoItem functions
    handleTodoEdit = (id, newName) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.name = newName;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    handleTodoToggle = (id) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.isDone = !task.isDone;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    handleTodoRemove = (id) => {
        const updatedData = this.state.data.filter(task => task.id !== id);
        
        this.setState({
            data: updatedData || []
        });
    }

    render() {
        return (
            <div>
                <NewTaskForm
                    handleTodoAdd={this.handleTodoAdd}
                />
                <TodoList 
                    data={this.state.data}
                    handleTodoEdit={this.handleTodoEdit}
                    handleTodoRemove={this.handleTodoRemove}
                    handleTodoToggle={this.handleTodoToggle}
                />
            </div>
        )
    }
}

export default App;