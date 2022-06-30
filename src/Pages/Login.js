import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Errors } from "../Context";

const Login = () => {
  const { newError } = useContext(Errors);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);
  const handleFinish = (values) => {
    const params = new URLSearchParams();
    params.append("_username", values._username);
    params.append("_password", values._password);
    params.append("_subdomain", "toko");

    axios
      .post(`/security/auth_check`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.authorization = `Bearer ${token}`;
        navigate("/");
      })
      .catch((err) => {
        newError("Invalid Credentials");
        console.log(err);
      });
  };

  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="_username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
