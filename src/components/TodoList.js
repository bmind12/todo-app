// @flow
import React from 'react';
import propTypes from 'prop-types';
import { List } from 'antd';
import TodoItem from './TodoItem';
import type { Task } from '../types';

type Props = {
    data: Array<Task>,
    editTodo: (id: string, newName: string) => void,
    removeTodo: (id: string) => void,
    toggleTodo: (id: string) => void
};

const TodoList = (props: Props) => {
    
    TodoList.defaultProps = {
        data: []
    };

    return (
        <List
            bordered
            dataSource={props.data}
            header={<div>Task table</div>}
            size="small"
            style={{ width: 480 }}
            renderItem={item => (
                <TodoItem
                    editTodo={props.editTodo}
                    id={item.id}
                    isDone={item.isDone}
                    name={item.name}
                    removeTodo={props.removeTodo}
                    toggleTodo={props.toggleTodo}
                />
                
            )}
        />
    )
}
    
TodoList.propTypes = {
    data: propTypes.array,
    editTodo: propTypes.func.isRequired,
    removeTodo: propTypes.func.isRequired,
    toggleTodo: propTypes.func.isRequired
};

TodoList.defaultProps = {
    data: []
};

export default TodoList;