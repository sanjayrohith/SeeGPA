import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Linkedin, Heart } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal = ({ isOpen, onClose }: CreditsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About the Developer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Main message */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <span>Built with passion by</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="font-semibold text-purple-700">Sanjay Rohith</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              to help students track their academic progress and achieve their educational goals.
            </p>
          </div>

          {/* Contact section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Questions, feedback, or collaboration? Feel free to reach out!
            </h3>
            
            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:sanjayrohith1802@gmail.com"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200 hover:shadow-md border border-purple-100"
              >
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">sanjayrohith1802@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sanjayrohith18/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200 hover:shadow-md border border-purple-100"
              >
                <div className="flex-shrink-0">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">LinkedIn</p>
                  <p className="text-sm text-gray-600">Connect professionally</p>
                </div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-purple-200/50">
            <p className="text-xs text-gray-500">
              Made with React, TypeScript, and lots of ☕
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
