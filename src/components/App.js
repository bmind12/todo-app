// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NewTaskForm from './NewTaskForm';
import TodoList from './TodoList';

type Props = {
    error: string,
    loading: boolean,
    todoList: Array<Task>
};

const App = (props: Props) => {
    
    App.defaultProps = {
        todoList: []
    };

    const { error, loading, todoList } = props;

    return (
        <div>
            <NewTaskForm
                client={props.client}
            />
            <TodoList
                error={error}
                loading={loading}
                todoItems={todoList}
            />
        </div>
    )
}

const DATA_QUERY = gql`
    query TodoList {
        todoList {
            id
            isDone
            name
        }
    }
`

export default graphql(DATA_QUERY, {
    props: ({ data }) => ({ ...data }) 
})(App);
