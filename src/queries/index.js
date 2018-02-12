import gql from 'graphql-tag';

export const ADD_TASK = gql`
    mutation TaskMutation($name: String!) {
        addTask(name: $name) {
            id
            name
        }
    }
`

export const DATA_QUERY = gql`
    query {
        todoList {
            id
            isDone
            name
        }
    }
`

export const REMOVE_TASK = gql`
    mutation TaskMutation($id: ID!) {
        deleteTask(id: $id) {
            id
        }
    }
`

export const TOGGLE_DONE = gql`
    mutation TaskMutation($id: ID!, $isDone: Boolean!) {
        toggleDone(id: $id, isDone: $isDone) {
            id
            isDone
            name
        }
    }
`

export const UPDATE_TASK = gql`
    mutation TaskMutation($id: ID!, $name: String!) {
        editTask(id: $id, name: $name) {
            id
            name
        }
    }
`