// @flow
import React from 'react';
import { Alert, List, Spin } from 'antd';
import TodoItem from './TodoItem';
import type { Task } from '../types';

type Props = {
    error: string,
    loading: boolean,
    todoItems: Array<Task>
};

const TodoList = (props: Props) => {

    const { error, loading, todoItems } = props;

    if (loading) {
        return (
            <div className="spin__container">
                <Spin />
            </div>
        )
    }

    if (error) {
        return (
            <Alert
                closable
                description="Couldn't feth data from server"
                message={error}
                style={{ width: 480 }}
                type="error"
            />
        )
    }

    return (
        <List
            bordered
            dataSource={todoItems}
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
};

export default TodoList;