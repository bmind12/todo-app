import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = props => {
    const todoList = !!props.data.length && props.data.map(todo => {
        return (
            <TodoItem
                handleTodoEdit={props.handleTodoEdit}
                handleTodoRemove={props.handleTodoRemove}
                handleTodoToggle={props.handleTodoToggle}
                id={todo.id}
                isDone={todo.isDone}
                key={todo.id}
                name={todo.name}
            />
        )
    })
    
    return (
        <div>
            <h2>Task table</h2>
            <ul className="list">
                { todoList }
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    data: propTypes.array,
    handleTodoEdit: propTypes.func.isRequired,
    handleTodoRemove: propTypes.func.isRequired,
    handleTodoToggle: propTypes.func.isRequired
};

TodoList.defaultProps = {
    data: []
};

export default TodoList;