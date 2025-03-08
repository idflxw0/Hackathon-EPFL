import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Secure Chat Verifier</h1>
          </Link>
          <div>
            <Link
              to="/auth/signin"
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;