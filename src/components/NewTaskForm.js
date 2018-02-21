// @flow
import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { DATA_QUERY } from './App';
const FormItem = Form.Item;

type Props = {
    form: any,
    addTask: ({variables: {
        name: string
    }}) => void
}

type State = {
    input: string
}

class NewTaskForm extends PureComponent<Props, State> {
    state = {
        input: ''
    }
    
    changeNewTask = (evt) => {
        this.setState({
            input: evt.target.value
        });
    }
    
    _addTask = async (evt) => {
        evt.preventDefault();
        
        const name = this.state.input;
        
        if (!name) return;

        this.setState({
            input: ''
        });
        
        this.props.form.resetFields();
        
        await this.props.addTask({
            variables: {
                name
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addTask: {
                    __typename: 'Task',
                    id: -1,
                    name,
                    isDone: false
                },
            },
            update: (store, { data: { addTask: newTask } }) => {
                const data = store.readQuery({ query: DATA_QUERY });
                data.todoList.push(newTask);
                store.writeQuery({
                    query: DATA_QUERY,
                    data
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" style={{ marginBottom: 24 }} onSubmit={this._addTask}>
                <FormItem
                    label="New task"
                >
                    {getFieldDecorator('userName')(
                        <Input
                            style={{ width: 120 }}
                            onChange={this.changeNewTask}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        htmlType="submit"
                        type="primary"
                    >
                        Add
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const ADD_TASK = gql`
    mutation TaskMutation($name: String!) {
        addTask(name: $name) {
            id
            isDone
            name
        }
    }
`

export default Form.create()(graphql(ADD_TASK, {
    name: 'addTask',
    options: {
        refetchQueries: ["TodoList"]
    }
})(NewTaskForm))
