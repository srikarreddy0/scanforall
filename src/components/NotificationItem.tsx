
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Bell, Info, MoreVertical, Check, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NotificationType } from '../utils/notificationData';

interface NotificationItemProps {
  notification: NotificationType;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkRead,
  onDelete
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const getIcon = () => {
    switch (notification.type) {
      case 'alert':
        return <AlertTriangle size={20} className="text-warning-DEFAULT" />;
      case 'security':
        return <ShieldCheck size={20} className="text-success-DEFAULT" />;
      case 'update':
        return <Info size={20} className="text-premium-500" />;
      default:
        return <Bell size={20} className="text-dark-100" />;
    }
  };
  
  const getBgColor = () => {
    if (!notification.read) {
      return 'bg-gradient-to-br from-white to-light-300 shadow-premium-sm';
    }
    return 'bg-light-200/80 shadow-premium-xs';
  };
  
  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className={`rounded-xl ${getBgColor()} transition-all duration-200 overflow-hidden backdrop-blur-sm`}>
      <div className="flex items-start p-4 relative">
        {/* Unread indicator */}
        {!notification.read && (
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-premium-500 m-3"></div>
        )}
        
        {/* Icon with soft shadow effect */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-white shadow-premium-xs">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold mb-1 text-dark-300">{notification.title}</h4>
          <p className="text-sm text-dark-200 mb-2">{notification.message}</p>
          <p className="text-xs text-dark-100">{formatTime(notification.timestamp)}</p>
        </div>
        
        <button 
          onClick={() => setShowActions(!showActions)}
          className="p-2 rounded-full hover:bg-light-400/70"
        >
          <MoreVertical size={16} className="text-dark-100" />
        </button>
      </div>
      
      {/* Action buttons */}
      {showActions && (
        <div className="flex border-t border-light-400/50">
          {!notification.read && (
            <button
              onClick={() => {
                onMarkRead(notification.id);
                setShowActions(false);
              }}
              className="flex-1 py-2 flex items-center justify-center text-sm hover:bg-light-300/50 text-dark-200"
            >
              <Check size={14} className="mr-1.5" />
              Mark as read
            </button>
          )}
          
          <button
            onClick={() => {
              onDelete(notification.id);
              setShowActions(false);
            }}
            className="flex-1 py-2 flex items-center justify-center text-sm hover:bg-light-300/50 text-error-DEFAULT"
          >
            <Trash size={14} className="mr-1.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
