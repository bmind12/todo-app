// @flow
import React from 'react';
import { Alert, List, Spin } from 'antd';
import { graphql } from 'react-apollo';
import { DATA_QUERY } from '../queries';
import TodoItem from './TodoItem';
import type { Task } from '../types';

type Props = {
    data: {
        error: string,
        loading: boolean,
        todoList: Array<Task>
    }
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
                message={data.error}
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
                    id={item.id}
                    isDone={item.isDone}
                    name={item.name}
                />
                
            )}
        />
    )
}

export default graphql(DATA_QUERY, { name: 'data' }) (TodoList);