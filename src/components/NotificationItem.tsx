
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
        return <AlertTriangle size={20} className="text-amber-400" />;
      case 'security':
        return <ShieldCheck size={20} className="text-emerald-400" />;
      case 'update':
        return <Info size={20} className="text-blue-400" />;
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };
  
  const getBgColor = () => {
    if (!notification.read) {
      return 'bg-gray-800/80 backdrop-blur-md';
    }
    return 'bg-gray-800/40 backdrop-blur-sm';
  };
  
  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className={`rounded-xl ${getBgColor()} transition-all duration-200 overflow-hidden`}>
      <div className="flex items-start p-4 relative">
        {/* Unread indicator */}
        {!notification.read && (
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 m-3"></div>
        )}
        
        {/* Icon with neumorphic effect */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),_inset_-2px_-2px_5px_rgba(255,255,255,0.1)]">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold mb-1 text-white">{notification.title}</h4>
          <p className="text-sm text-gray-300 mb-2">{notification.message}</p>
          <p className="text-xs text-gray-400">{formatTime(notification.timestamp)}</p>
        </div>
        
        <button 
          onClick={() => setShowActions(!showActions)}
          className="p-2 rounded-full hover:bg-gray-700/50"
        >
          <MoreVertical size={16} className="text-gray-400" />
        </button>
      </div>
      
      {/* Action buttons */}
      {showActions && (
        <div className="flex border-t border-gray-700/50">
          {!notification.read && (
            <button
              onClick={() => {
                onMarkRead(notification.id);
                setShowActions(false);
              }}
              className="flex-1 py-2 flex items-center justify-center text-sm hover:bg-gray-700/30"
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
            className="flex-1 py-2 flex items-center justify-center text-sm hover:bg-gray-700/30 text-red-400"
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
