
export interface NotificationType {
  id: string;
  type: 'alert' | 'security' | 'update' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const notifications: NotificationType[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Product Scan Alert',
    message: 'We detected a counterfeit version of Nike Air Max that you scanned yesterday.',
    timestamp: '2025-04-13T14:35:00',
    read: false
  },
  {
    id: '2',
    type: 'security',
    title: 'Security Verification',
    message: 'Your account has been successfully verified with two-factor authentication.',
    timestamp: '2025-04-12T11:20:00',
    read: true
  },
  {
    id: '3',
    type: 'update',
    title: 'New Feature: Batch Scanning',
    message: 'You can now scan multiple products at once with our new batch scanning feature.',
    timestamp: '2025-04-11T09:15:00',
    read: false
  },
  {
    id: '4',
    type: 'general',
    title: 'Weekly Scan Report',
    message: 'View your product scanning insights for the past week. 12 products scanned, 1 counterfeit detected.',
    timestamp: '2025-04-10T16:45:00',
    read: true
  },
  {
    id: '5',
    type: 'alert',
    title: 'Expiry Alert: Dairy Products',
    message: 'The milk product you scanned last week will expire in 2 days. Consider using it soon.',
    timestamp: '2025-04-09T08:30:00',
    read: false
  },
  {
    id: '6',
    type: 'update',
    title: 'App Update Available',
    message: 'Version 2.4.0 is now available with enhanced scanning capabilities and bug fixes.',
    timestamp: '2025-04-08T10:20:00',
    read: true
  },
  {
    id: '7',
    type: 'security',
    title: 'Login from New Device',
    message: 'We detected a login to your account from a new iPhone device. Was this you?',
    timestamp: '2025-04-07T19:15:00',
    read: false
  }
];
