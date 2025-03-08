import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">
                Secure Chat Verifier
              </span>
            </div>
            <p className="text-sm">
              Privacy-first communication platform powered by blockchain
              technology
            </p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Technology</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://minaprotocol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Mina Protocol
                </a>
              </li>
              <li>
                <a
                  href="https://hedera.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Hedera Hashgraph
                </a>
              </li>
              <li>
                <a
                  href="https://hyle.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Hylé Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="https://minaprotocol.com/zk-snarks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Zero-Knowledge Proofs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/documentation" className="hover:text-blue-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 Secure Chat Verifier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
