"use client";

import { createWelcomeEmail } from "@/lib/email-templates";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email, // Replace with actual recipient
          subject: `Contact Form: ${formData.subject}`,
          message: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
          name: formData.name,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const template = createWelcomeEmail("user");

  return (
    <>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

          body {
            font-family: "Roboto", sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e1e8ed;
            width: 400px;
          }

          .form-container {
            display: flex;
            margin-top: 20px;
            flex-direction: column;
          }

          .form-item-wrapper {
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
          }
          .form-item-wrapper > input,
          .form-item-wrapper > textarea {
            border-radius: 8px;
          }
          .submit_button {
            padding: 10px 20px;
            width: 100%;
            border: none;
            border-radius: 8px;
          }

          .submit_button: hover {
            background-color: #3498db;
            color: white;
            cursor: pointer;
          }
        `}
      </style>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="form-item-wrapper">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-item-wrapper">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-item-wrapper">
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-item-wrapper">
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit_button">
            {isLoading ? "Sending..." : "Send Email"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm">Email sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">
              Failed to send email. Please try again.
            </p>
          )}
        </form>
        <div className="">{template.html}</div>
      </div>
    </>
  );
}
