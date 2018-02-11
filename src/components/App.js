// @flow
import React from 'react';
import NewTaskForm from './NewTaskForm';
import TodoList from './TodoList';

const App = () => {
    return (
        <div>
            <NewTaskForm />
            <TodoList />
        </div>
    )
}

export default App;