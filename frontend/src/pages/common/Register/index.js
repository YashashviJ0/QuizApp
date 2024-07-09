import { Form, message, Input, Button, Checkbox } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await registerUser(values);
            dispatch(HideLoading());

            if (response.success) {
                message.success(response.message);
                navigate("/login");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-primary">
            <div className="card w-400 p-3 bg-white">
                <div className="flex flex-col">
                    <h1 className="text-2xl">
                        REGISTER <i className="ri-user-add-line"></i>
                    </h1>
                    <div className="divider"></div>
                    <Form
                        layout="vertical"
                        className="mt-2"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="isAdmin"
                            valuePropName="checked"
                        >
                            {/* <Checkbox>Register as Admin</Checkbox> */}
                        </Form.Item>

                        <div className="flex flex-col gap-2">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="primary-contained-btn mt-2 w-100"
                            >
                                Register
                            </Button>
                            <Link to="/login">Already a member? Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
