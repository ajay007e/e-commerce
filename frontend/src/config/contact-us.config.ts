import type { ContactUsConfig } from "./config.types";

export const CONTACT_US_CONFIG: ContactUsConfig = {
  enabled: true,

  title: "Contact Us",
  subtitle: "Have a question? We’re here to help.",

  contactInfo: [
    {
      id: "email",
      type: "email",
      label: "Email",
      value: "support@yourstore.com",
      enabled: true,
    },
    {
      id: "phone",
      type: "phone",
      label: "Phone",
      value: "+91 9XXXXXXXXX",
      enabled: true,
    },
    {
      id: "response-time",
      type: "response_time",
      label: "Response Time",
      value: "We usually respond within 24 hours",
      enabled: true,
    },
  ],

  formEnabled: true,
};
