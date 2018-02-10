// @flow
import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';
const FormItem = Form.Item;

type Props = {
    changeNewTask: (evt: SyntheticEvent<HTMLInputElement>) => void,
    submitNewTask: (evt: SyntheticEvent<HTMLFormElement>) => void,
    form: any
}

class NewTaskForm extends PureComponent<Props> {
    handleSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
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

export default Form.create()(NewTaskForm);