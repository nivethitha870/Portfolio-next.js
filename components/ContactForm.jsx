"use client";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null); // To show success/error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state

  // Initialize EmailJS with the public key
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "oZE2IjO53vudBHpdl";
    console.log("Initializing EmailJS with public key:", publicKey);
    emailjs.init(publicKey);
  }, []);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button during submission
    setStatus(null); // Clear previous status

    const name = formRef.current.name.value;
    const email = formRef.current.email.value;
    const title = formRef.current.title.value;
    const message = formRef.current.message.value;

    // Validate form fields
    if (!name || !email || !title || !message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      setIsSubmitting(false);
      return;
    }

    // Log form data for debugging
    console.log("Form data:", { name, email, title, message });

    // EmailJS configuration
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: title,
      message: message,
      to_email: "nivethithap768@gmail.com",
    };

    // Log template params for debugging
    console.log("Template params:", templateParams);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_i6rrupm";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xah3jb";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "oZE2IjO53vudBHpdl";

      console.log("EmailJS config:", { serviceId, templateId, publicKey });

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log("EmailJS response:", response);
      setStatus({ type: "success", message: "Email sent successfully!" });
      formRef.current.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message: `Failed to send email: ${error.text || "Unknown error"}`,
      });
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSendEmail}
      className="flex flex-col gap-4"
    >
      <label htmlFor="name" className="sr-only">
        Your Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Your Name"
        required
        className="p-2 border border-gray-300 rounded"
      />

      <label htmlFor="email" className="sr-only">
        Your Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your Email"
        required
        className="p-2 border border-gray-300 rounded"
      />

      <label htmlFor="title" className="sr-only">
        Subject
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Subject"
        required
        className="p-2 border border-gray-300 rounded"
      />

      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows="5"
        placeholder="Message"
        required
        className="p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className={`btn bg-blue-500 text-white p-2 rounded ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>

      {status && (
        <p className={status.type === "success" ? "text-green-500" : "text-red-500"}>
          {status.message}
        </p>
      )}
    </form>
  );
}