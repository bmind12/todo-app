// @flow
import React from 'react';
import NewTaskForm from './NewTaskForm';
import TodoList from './TodoList';

const App = props => {
    return (
        <div>
            <NewTaskForm client={props.client} />
            <TodoList />
        </div>
    )
}

export default App;