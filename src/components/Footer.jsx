import React, { useState } from 'react';
import { Shield, Heart, Globe } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Left Section */}
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-gray-600">
                Made with care for Pakistan's healthcare
              </span>
            </div>

            {/* Center Section */}
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Privacy & Ethics</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-4 h-4" />
                <span>DRAP Compliant</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-sm text-gray-500">
              <p>&copy; 2025 MedSafePK. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </>
  );
}

export default Footer;


