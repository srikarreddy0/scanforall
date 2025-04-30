
import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Settings, BookOpen, History, BookmarkCheck } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Profile = () => {
  // This would normally come from authentication
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Verified User",
    joinedDate: "April 2025"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const menuItems = [
    { icon: <History size={20} />, title: "Scan History", description: "View your previous scans", link: "/history" },
    { icon: <BookmarkCheck size={20} />, title: "Saved Products", description: "Your bookmarked products", link: "/bookmarks" },
    { icon: <Settings size={20} />, title: "Settings", description: "Configure app preferences", link: "/settings" },
    { icon: <BookOpen size={20} />, title: "Help Center", description: "FAQs and support resources", link: "#" }
  ];

  return (
    <div className="app-container dark:bg-dark-300 bg-light-300 dark:text-light-100 text-dark-300 min-h-screen">
      <Header title="Profile" showBack={true} />
      
      <motion.div 
        className="p-5 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-premium-100 dark:bg-premium-900 flex items-center justify-center mb-4">
            <User size={40} className="text-premium-500" />
          </div>
          <h1 className="text-2xl font-display font-bold dark:text-light-100 text-dark-300">
            {userProfile.name}
          </h1>
          <p className="dark:text-light-500 text-dark-400 text-sm mb-1">
            {userProfile.email}
          </p>
          <div className="flex items-center gap-2 text-xs bg-premium-100 dark:bg-premium-900 px-3 py-1 rounded-full dark:text-premium-300 text-premium-700 mt-2">
            <Shield size={12} />
            {userProfile.role}
          </div>
          <p className="text-xs dark:text-light-500 text-dark-400 mt-2">
            Member since {userProfile.joinedDate}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Separator className="dark:bg-dark-100 bg-light-400 my-4" />
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <div className="premium-card-dark p-4 flex items-center gap-4 cursor-pointer hover:border-premium-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-premium-100 dark:bg-premium-900 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(item.icon, { className: "text-premium-500" })}
                </div>
                <div className="flex-grow">
                  <p className="font-medium dark:text-light-100 text-dark-300">{item.title}</p>
                  <p className="text-sm dark:text-light-500 text-dark-400">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8">
          <Button variant="outline" className="w-full dark:border-dark-100 border-light-400 dark:text-light-400 text-dark-500">
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
