import React from "react";
import Header from "./comps/Header";
import Footer from "./comps/Footer";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-600 mb-4">
              At Secure Chat Verifier, we take your privacy seriously. Our platform is built with
              privacy-first principles and uses advanced cryptographic techniques to ensure your
              communications remain secure and private.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We minimize data collection to only what's necessary for the service to function:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Public keys for secure message exchange</li>
              <li>Zero-knowledge proofs for message verification</li>
              <li>Encrypted message content (only accessible by intended recipients)</li>
              <li>Basic account information for authentication</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Protect Your Data</h2>
            <p className="text-gray-600 mb-4">
              Your data is protected through multiple security layers:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>End-to-end encryption for all messages</li>
              <li>Zero-knowledge proofs for privacy-preserving verification</li>
              <li>Decentralized storage using blockchain technology</li>
              <li>Regular security audits and updates</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Controls</h2>
            <p className="text-gray-600 mb-4">
              You have full control over your data and can:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your encrypted messages and proofs</li>
              <li>Delete your account and associated data</li>
              <li>Export your chat history</li>
              <li>Manage your privacy settings</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;