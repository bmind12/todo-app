// @flow
import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import onClickOutside from 'react-onclickoutside';
import { Button, Checkbox, Form, Input, List } from 'antd';
import { DATA_QUERY } from './App';

type Props = {
    updateTask: ({variables: {
        id: string,
        name: string
    }}) => void,
    deleteTask: ({variables: {
        id: string
    }}) => void,
    id: string,
    isDone: boolean,
    name: string,
    toggleDone: ({variables: {
        id: string,
        isDone: boolean
    }}) => void
};

type State = {
    value: string,
    readOnly: boolean
};

class TodoItem extends PureComponent<Props, State> {
    state = {
        value: '',
        readOnly: true
    }
    
    handleClickOutside = () => {
        this.setState({
            readOnly: true
        });
    }

    handleInputChange = (evt) => {
        this.setState({
            value: evt.target.value
        });
    }

    handleModeSwitch = () => {
        this.setState({
            value: this.props.name,
            readOnly: false
        });
    }

    _deleteTask = async () => {
        await this.props.deleteTask({
            variables: {
                id: this.props.id
            },
            optimisticResponse: {
                __typename: 'Mutation',
                deleteTask: {
                    __typename: 'Task',
                    id: this.props.id
                },
            },
            update: (store, { data: { deleteTask: { id } }}) => {
                const data = store.readQuery({ query: DATA_QUERY });
                data.todoList = data.todoList.filter(todo => todo.id !== id);
                
                store.writeQuery({
                    query: DATA_QUERY,
                    data: data
                })
            }
        });
    }

    _toggleDone = async (evt) => {
        const isDone = evt.target.checked;
        
        await this.props.toggleDone({
            variables: {
                id: this.props.id,
                isDone
            }
        });
    }
    
    _updateTask = async (evt) => {
        evt.preventDefault();
        
        await this.props.updateTask({
            variables: {
                id: this.props.id,
                name: this.state.value
            }
        })

        this.setState({
            readOnly: true
        });
    }

    render() {
        const { name } = this.props;

        return (
            <List.Item
                actions={[
                    <a onClick={this.handleModeSwitch}>edit</a>,
                    <a onClick={this._deleteTask}>delete</a>
                ]}
            >
            { this.state.readOnly
                ? (
                    <Checkbox
                        checked={this.props.isDone}
                        onChange={this._toggleDone}
                    >
                        {name}
                    </Checkbox>
                )
                : (
                    <Form
                        layout="inline"
                        onSubmit={this._updateTask} >
                        <Input
                            defaultValue={name}
                            onChange={this.handleInputChange}
                            ref="textInput"
                            size="small"
                            style={{ width: 90, marginRight: 3 }}
                        />
                        <Button
                            htmlType="submit"
                            size="small"
                            type="primary"
                        >
                            Save
                        </Button>
                    </Form>
                )
            }
            </List.Item>
        )
    }
}

const REMOVE_TASK = gql`
    mutation TaskMutation($id: ID!) {
        deleteTask(id: $id) {
            id
        }
    }
`

const TOGGLE_DONE = gql`
    mutation TaskMutation($id: ID!, $isDone: Boolean!) {
        toggleDone(id: $id, isDone: $isDone) {
            id
            isDone
        }
    }
`

const UPDATE_TASK = gql`
    mutation TaskMutation($id: ID!, $name: String!) {
        editTask(id: $id, name: $name) {
            id
            name
        }
    }
`

export default Form.create()(compose(
    graphql(REMOVE_TASK, {
        name: 'deleteTask'
    }),
    graphql(TOGGLE_DONE, {
        name: 'toggleDone'
    }),
    graphql(UPDATE_TASK, {
        name: 'updateTask'
    })
)(onClickOutside(TodoItem)));