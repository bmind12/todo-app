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

    handleModeSwitch = () => {
        this.setState({
            value: this.props.name,
            readOnly: false
        });
    }

    _deleteTask = async (id) => {
        await this.props.deleteTask({
            variables: {
                id
            }
        });
    }

    _toggleDone = async (evt, id) => {
        const isDone = evt.target.checked;
        
        await this.props.toggleDone({
            variables: {
                id,
                isDone
            }
        });
    }
    
    _updateTask = async (evt, id, name) => {
        evt.preventDefault();
        
        await this.props.updateTask({
            variables: {
                id,
                name
            }
        })

        this.setState({
            readOnly: true
        });
    }

    render() {
        const { id, name } = this.props;

        return (
            <List.Item
                actions={[
                    <a onClick={ () => this.handleModeSwitch() }>edit</a>,
                    <a onClick={ () => this._deleteTask(id) }>delete</a>
                ]}
            >
            { this.state.readOnly
                ? (
                    <Checkbox
                        checked={this.props.isDone}
                        onChange={ (evt) => this._toggleDone(evt, id) }
                    >
                        {name}
                    </Checkbox>
                )
                : (
                    <Form
                        layout="inline"
                        onSubmit={ (evt) => this._updateTask(evt, id, this.state.value)} >
                        <Input
                            defaultValue={name}
                            onChange={ (evt) => this.setState({ value: evt.target.value }) }
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