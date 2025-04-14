
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Filter, CheckCheck, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import NotificationItem from '../components/NotificationItem';
import { notifications } from '../utils/notificationData';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [notificationList, setNotificationList] = useState(notifications);
  
  const handleMarkAllRead = () => {
    const updatedNotifications = notificationList.map(notification => ({
      ...notification,
      read: true
    }));
    setNotificationList(updatedNotifications);
  };
  
  const handleClearAll = () => {
    setNotificationList([]);
  };
  
  const filteredNotifications = notificationList.filter(notification => {
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "alerts") return notification.type === "alert";
    if (activeFilter === "updates") return notification.type === "update";
    return true; // "all" filter
  });

  return (
    <div className="app-container bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <Header title="Notifications" showBack={true} />
      
      <div className="p-6 space-y-6">
        {/* Stats at the top */}
        <div className="flex justify-between items-center">
          <div className="glass-card p-4 rounded-2xl w-40">
            <p className="text-xs text-gray-400">Notifications</p>
            <p className="text-2xl font-semibold text-white">{notificationList.length}</p>
          </div>
          
          <div className="glass-card p-4 rounded-2xl w-40">
            <p className="text-xs text-gray-400">Unread</p>
            <p className="text-2xl font-semibold text-white">{notificationList.filter(n => !n.read).length}</p>
          </div>
        </div>
        
        {/* Filters for notifications */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-1.5">
          <ToggleGroup 
            type="single" 
            value={activeFilter}
            onValueChange={(value) => {
              if (value) setActiveFilter(value);
            }}
            className="flex justify-between w-full"
          >
            <ToggleGroupItem value="all" className="w-full data-[state=on]:bg-gray-700 data-[state=on]:shadow-inner rounded-lg">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="unread" className="w-full data-[state=on]:bg-gray-700 data-[state=on]:shadow-inner rounded-lg">
              Unread
            </ToggleGroupItem>
            <ToggleGroupItem value="alerts" className="w-full data-[state=on]:bg-gray-700 data-[state=on]:shadow-inner rounded-lg">
              Alerts
            </ToggleGroupItem>
            <ToggleGroupItem value="updates" className="w-full data-[state=on]:bg-gray-700 data-[state=on]:shadow-inner rounded-lg">
              Updates
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleMarkAllRead}
            className="flex-1 bg-gray-800/60 border-gray-700 hover:bg-gray-700 text-white"
          >
            <CheckCheck size={16} className="mr-2" />
            Mark All Read
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClearAll}
            className="flex-1 bg-gray-800/60 border-gray-700 hover:bg-gray-700 text-white"
          >
            <Trash2 size={16} className="mr-2" />
            Clear All
          </Button>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-3 mt-4">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell size={48} className="text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
              <p className="text-gray-400">
                {activeFilter === "all" 
                  ? "You don't have any notifications yet" 
                  : `No ${activeFilter} notifications to display`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkRead={(id) => {
                  const updatedNotifications = notificationList.map(n => 
                    n.id === id ? { ...n, read: true } : n
                  );
                  setNotificationList(updatedNotifications);
                }}
                onDelete={(id) => {
                  setNotificationList(notificationList.filter(n => n.id !== id));
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
