import React from "react";
import Header from "./comps/Header";
import Footer from "./comps/Footer";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Secure Chat Verifier, you agree to be bound by these Terms of
              Service and all applicable laws and regulations. If you do not agree with any of
              these terms, you are prohibited from using this service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              We grant you a limited, non-exclusive, non-transferable license to use our service
              for personal or business communication purposes, subject to these terms:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must not use the service for illegal purposes</li>
              <li>You must not attempt to bypass our security measures</li>
              <li>You must not interfere with other users' use of the service</li>
              <li>You must not reverse engineer or modify the platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-600 mb-4">
              While we strive to provide uninterrupted service, we cannot guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>100% uptime or availability</li>
              <li>Instant message delivery</li>
              <li>Zero network latency</li>
              <li>Compatibility with all devices and systems</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              We shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use or inability to use the service. This
              includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Loss of data</li>
              <li>Loss of profits</li>
              <li>Service interruptions</li>
              <li>Third-party actions</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;