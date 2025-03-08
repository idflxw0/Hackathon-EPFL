import React from "react";
import Header from "./comps/Header";
import Footer from "./comps/Footer";

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Documentation</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Welcome to the Secure Chat Verifier documentation. This guide will help you understand
              how to use our platform effectively and securely.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>End-to-end encryption using state-of-the-art cryptography</li>
              <li>Zero-knowledge proofs powered by Mina Protocol</li>
              <li>Decentralized message verification via Hedera Hashgraph</li>
              <li>Real-time message delivery with Hylé Infrastructure</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Architecture</h2>
            <p className="text-gray-600 mb-4">
              Our platform combines multiple layers of security to ensure your communications
              remain private and verifiable:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Message encryption using AES-256</li>
              <li>Blockchain-based message verification</li>
              <li>Zero-knowledge proof generation and verification</li>
              <li>Secure key management and storage</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Reference</h2>
            <p className="text-gray-600 mb-4">
              For developers looking to integrate with our platform, we provide a comprehensive
              API that supports all core functionality:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Message sending and receiving</li>
              <li>Proof generation and verification</li>
              <li>User management and authentication</li>
              <li>Channel creation and management</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;