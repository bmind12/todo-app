// @flow
import React from 'react';
import NewTaskForm from './NewTaskForm';
import TodoList from './TodoList';

const App = props => {
    // TodoItem functions
    const editTodo = (id, newName) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.name = newName;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    const toggleTodo = (id) => {
        const updatedData = this.state.data.map(task => {
            if (task.id === id) task.isDone = !task.isDone;

            return task;
        });
        
        this.setState({
            data: updatedData
        });
    }

    const removeTodo = (id) => {
        const updatedData = this.state.data.filter(task => task.id !== id);
        
        this.setState({
            data: updatedData || []
        });
    }

    return (
        <div>
            <NewTaskForm />
            <TodoList
                editTodo={editTodo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App;