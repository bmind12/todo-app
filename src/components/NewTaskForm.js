import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
const FormItem = Form.Item;

class NewTaskForm extends PureComponent {
    handleSubmit = (evt) => {
        this.props.submitNewTask(evt);
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" style={{ marginBottom: 24 }} onSubmit={this.handleSubmit}>
                <FormItem
                    label="New task"
                >
                    {getFieldDecorator('userName')(
                        <Input
                            style={{ width: 120 }}
                            onChange={this.props.changeNewTask}
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

NewTaskForm.propTypes = {
    changeNewTask: propTypes.func.isRequired,
    submitNewTask: propTypes.func.isRequired
};

export default Form.create()(NewTaskForm);