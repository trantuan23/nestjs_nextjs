"use client";
import React from "react";
import { Layout, theme } from "antd";
import AdminSidebar from "../components/admin.sidebar";
import AdminFooter from "../components/admin.footer";
const { Header, Content} = Layout;
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <AdminSidebar/>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
       <AdminFooter/>
      </Layout>
    </Layout>
  );
};
export default App;
