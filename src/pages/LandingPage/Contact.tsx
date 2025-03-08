import React from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import Header from "./comps/Header";
import Footer from "./comps/Footer";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Contact Support
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              We're Here to Help
            </h2>
            <p className="text-gray-600 mb-8">
              Our support team is available 24/7 to assist you with any
              questions or concerns about our secure communication platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Mail className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Email Support
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Get in touch with our support team via email
                </p>
                <a
                  href="mailto:support@securechat.com"
                  className="text-blue-500 hover:text-blue-600"
                >
                  support@securechat.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Live Chat
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time
                </p>
                <button className="text-blue-500 hover:text-blue-600">
                  Start Live Chat
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Phone className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Phone Support
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Call us for immediate assistance
                </p>
                <a
                  href="tel:+1-800-123-4567"
                  className="text-blue-500 hover:text-blue-600"
                >
                  +1-800-123-4567
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How secure is my data?
                </h3>
                <p className="text-gray-600">
                  Your data is protected with end-to-end encryption and
                  zero-knowledge proofs, ensuring maximum security and privacy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if I lose my access?
                </h3>
                <p className="text-gray-600">
                  We have secure recovery procedures in place. Contact our
                  support team immediately for assistance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I verify messages?
                </h3>
                <p className="text-gray-600">
                  Message verification is automatic through our blockchain-based
                  system. Look for the verification badge next to each message.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
