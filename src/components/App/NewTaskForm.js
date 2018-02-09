import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

class NewTaskForm extends PureComponent {
    state = {
        input: ''
    }

    updateInput = (evt) => {
        this.setState({
            input: evt.target.value
        });
    }
    
    submitInput = (evt) => {
        evt.preventDefault();

        if (!this.state.input) return;

        this.props.handleTodoAdd(this.state.input);
        
        this.setState({
            input: ''
        });
    }

    render() {
        return (
            <form>
                <label className="form__label" htmlFor="taskName">Task name</label>
                <input
                    id="taskName"
                    type="text"
                    value={this.state.input}
                    onChange={this.updateInput}
                />
                <input
                    type="submit"
                    value="Add"
                    onClick={this.submitInput}
                />
            </form>
        )
    }
}

NewTaskForm.propTypes = {
    handleTodoAdd: propTypes.func.isRequired
};

export default NewTaskForm;