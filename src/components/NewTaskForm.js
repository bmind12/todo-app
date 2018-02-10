// @flow
import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const FormItem = Form.Item;

type Props = {
    form: any
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
        
        await this.props.addTask({
            variables: {
                name
            }
        });

        this.setState({
            input: ''
        });
        this.props.form.resetFields();
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
            name
        }
    }
`

export default Form.create()(graphql(ADD_TASK, { name: 'addTask' })(NewTaskForm))