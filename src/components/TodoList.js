import React from 'react';
import propTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { List } from 'antd';
import TodoItem from './TodoItem';

const TodoList = props => {
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
    // editTodo: propTypes.func.isRequired,
    removeTodo: propTypes.func.isRequired,
    toggleTodo: propTypes.func.isRequired
};

TodoList.defaultProps = {
    data: []
};

export default onClickOutside(TodoList);