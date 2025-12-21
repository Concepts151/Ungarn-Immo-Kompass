import React from "react";
import Layout from "@/components/layout/Layout";
import MatrixChatPage from "./components/MatrixChatPage";

export default function MessagesPage() {
  return (
    <>
      <Layout headerStyle={1}>
        <div className="space50"></div>
        <div className="space50"></div>
        <div className="space50"></div>
        <section className="messages-page-section">
          <div className="container">
            <MatrixChatPage />
          </div>
        </section>
        <div className="space30"></div>
      </Layout>
    </>
  );
}