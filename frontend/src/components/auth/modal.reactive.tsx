"use client";

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";

const ModalReactive = (props: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail);
    }
  }, [userEmail]);

  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
      method: "POST",
      body: { email },
    });

    if (res?.data) {
      setUserId(res?.data?._id);
      setCurrent(1);
    } else {
      notification.error({
        message: "Call APIs error",
        description: res?.message,
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: { code, _id: userId },
    });

    if (res?.data) {
      setUserId(res?.data?._id);
      setCurrent(2);
    } else {
      notification.error({
        message: "Call APIs error",
        description: res?.message,
      });
    }
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",
              //status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              //status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: "Done",
              //status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <div>
            <>
              {" "}
              <p>Account isn't active</p>
              <Form
                name="basic"
                autoComplete="off"
                layout="vertical"
                form={form}
                onFinish={onFinishStep0}
              >
                <Form.Item name="email">
                  <Input disabled value={userEmail} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Resend mail
                  </Button>
                </Form.Item>
              </Form>
            </>
          </div>
        )}
        {current === 1 && (
          <>
            <p>Vui long nhap ma xac nhan code</p>
            <Form
              name="basic"
              autoComplete="off"
              layout="vertical"
              form={form}
              onFinish={onFinishStep1}
            >
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>
                Tai khoan cua ban da kich hoat thanh cong vui long dang nhap lai
                !
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ModalReactive;
