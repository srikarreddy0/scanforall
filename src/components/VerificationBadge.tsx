
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

type VerificationStatus = 'authentic' | 'counterfeit' | 'warning' | 'not-found';

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'authentic':
        return {
          Icon: CheckCircle,
          text: 'Authentic',
          badgeClass: 'verified-badge-authentic'
        };
      case 'warning':
        return {
          Icon: AlertTriangle,
          text: 'Warning',
          badgeClass: 'verified-badge-warning'
        };
      case 'counterfeit':
        return {
          Icon: XCircle,
          text: 'Counterfeit',
          badgeClass: 'verified-badge-fake'
        };
      default:
        return {
          Icon: HelpCircle,
          text: 'Unknown',
          badgeClass: 'bg-gray-200 text-gray-600'
        };
    }
  };

  const { Icon, text, badgeClass } = getStatusConfig();
  
  return (
    <div className={`verified-badge ${badgeClass} ${className}`}>
      <Icon size={16} className="mr-1" />
      <span>{text}</span>
    </div>
  );
};

export default VerificationBadge;
