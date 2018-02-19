// @flow
import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import onClickOutside from 'react-onclickoutside';
import { REMOVE_TASK, TOGGLE_DONE, UPDATE_TASK } from '../queries';
import { Button, Checkbox, Form, Input, List } from 'antd';

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

export default Form.create()(compose(
    graphql(REMOVE_TASK, { name: 'deleteTask' }),
    graphql(TOGGLE_DONE, { name: 'toggleDone' }),
    graphql(UPDATE_TASK, { name: 'updateTask' }) 
)(onClickOutside(TodoItem)));