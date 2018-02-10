// @flow
import React, { PureComponent } from 'react';
import onClickOutside from "react-onclickoutside";
import { Button, Checkbox, Form, Input, List } from 'antd';

type Props = {
    editTodo: (id: string, newName: string) => void,
    removeTodo: (id: string) => void,
    toggleTodo: (id: string) => void,
    id: string,
    isDone: boolean,
    name: string
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

    saveUpdatedTask = (evt) => {
        evt.preventDefault();

        this.props.editTodo(this.props.id, this.state.value);

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
                    <a onClick={ () => this.props.removeTodo(id) }>delete</a>
                ]}
            >
            { this.state.readOnly
                ? (
                    <Checkbox
                        checked={this.props.isDone}
                        onChange={ () => this.props.toggleTodo(id) }
                    >
                        {name}
                    </Checkbox>
                )
                : (
                    <Form layout="inline" onSubmit={this.saveUpdatedTask}>
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

export default Form.create()(onClickOutside(TodoItem));