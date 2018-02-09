import React, { PureComponent } from 'react';
// import propTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";
import { Button, Checkbox, Form, Input, List } from 'antd';

class TodoItem extends PureComponent {
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

TodoItem.propTypes = {
    // handleTodoEdit: propTypes.func.isRequired,
    // handleTodoRemove: propTypes.func.isRequired,
    // handleTodoToggle: propTypes.func.isRequired,
    // id: propTypes.string.isRequired,
    // isDone: propTypes.bool.isRequired,
    // name: propTypes.string.isRequired
}

export default Form.create()(onClickOutside(TodoItem));