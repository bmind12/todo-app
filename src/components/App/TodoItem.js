import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";

class TodoItem extends PureComponent {
    state = {
        input: '',
        isEditable: false
    }
    
    changeInput(evt) {
        this.setState({
            input: evt.target.value
        });
    }

    saveInput(evt) {
        evt.preventDefault();

        if (!this.state.input) return;

        this.props.handleTodoEdit(this.props.id, this.state.input);

        this.setState({
            isEditable: false
        });
    }

    toggleInput() {
        this.setState({
            input: this.props.name,
            isEditable: true
        });
    }
    
    handleClickOutside(evt) {
        this.setState({
            isEditable: false
        });
    }

    render() {
        const {
            id,
            name
        } = this.props;
    
        return (
            <li>
                { this.state.isEditable 
                    ? (
                        <form className="list__item">
                            <input
                                checked={this.props.isDone}
                                onChange={ () => this.props.handleTodoToggle(id)}
                                type="checkbox"
                            />
                            <input
                                className="list__label list__label--edit"
                                onChange={this.changeInput.bind(this)}
                                onSubmit={this.saveInput.bind(this)}
                                value={this.state.input}
                            />
                            <input
                                className="list__button list__button--save"
                                type="submit"
                                onClick={this.saveInput.bind(this)}
                                value="Save"
                            />
                        </form>
                    ) : (
                        <div className="list__item">
                            <input
                                checked={this.props.isDone}
                                onChange={ () => this.props.handleTodoToggle(id)}
                                type="checkbox"
                            />
                            <label className="list__label list__label--display" onDoubleClick={this.toggleInput.bind(this)}>
                                {name}
                            </label>
                            <button className="list__button list__button--remove" onClick={ () => this.props.handleTodoRemove(id) }>
                                Remove
                            </button>
                        </div>
                    )
                }
            </li>
        )
    }
}

TodoItem.propTypes = {
    handleTodoEdit: propTypes.func.isRequired,
    handleTodoRemove: propTypes.func.isRequired,
    handleTodoToggle: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    isDone: propTypes.bool.isRequired,
    name: propTypes.string.isRequired
}

export default onClickOutside(TodoItem);