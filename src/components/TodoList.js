// @flow
import React from 'react';
import { Alert, List, Spin } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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

    const data = props.data;

    if (data && data.loading) {
        return (
            <div className="spin__container">
                <Spin />
            </div>
        )
    }

    if (data && data.error) {
        return (
            <Alert
                closable
                description="Couldn't feth data from server"
                message="Error"
                style={{ width: 480 }}
                type="error"
            />
        )
    }

    return (
        <List
            bordered
            dataSource={data.todoList}
            header={<div>Task table</div>}
            size="small"
            style={{ width: 480 }}
            renderItem={item => (
                <TodoItem
                    editTodo={props.editTodo}
                    id={item.id}
                    isDone={item.isDone}
                    name={item.name}
                    removeTodo={props.removeTask}
                    toggleTodo={props.toggleTodo}
                />
                
            )}
        />
    )
}

const DATA_QUERY = gql`
    query {
        todoList {
            id
            isDone
            name
        }
    }
`;

export default graphql(DATA_QUERY, { name: 'data' }) (TodoList);