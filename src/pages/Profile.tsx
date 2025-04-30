
import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Settings, BookOpen, History, BookmarkCheck } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

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
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 border-4 border-premium-500 mb-4 shadow-glow-premium">
            <AvatarFallback className="bg-gradient-premium text-4xl text-white font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-display font-bold dark:text-light-100 text-dark-300">
            {userProfile.name}
          </h1>
          <p className="dark:text-light-500 text-dark-400 text-sm mb-1">
            {userProfile.email}
          </p>
          <div className="flex items-center gap-2 text-xs bg-premium-100/50 backdrop-blur-sm dark:bg-premium-900/50 px-4 py-1.5 rounded-full dark:text-premium-300 text-premium-700 mt-3 shadow-sm">
            <Shield size={12} className="text-premium-500" />
            {userProfile.role}
          </div>
          <p className="text-xs dark:text-light-500 text-dark-400 mt-2">
            Member since {userProfile.joinedDate}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Separator className="dark:bg-dark-100/80 bg-light-400/80 my-6" />
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="p-4 flex items-center gap-4 cursor-pointer hover:border-premium-500 transition-all duration-300 hover:shadow-premium-md bg-light-200/70 dark:bg-dark-200/70 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-premium-100/50 dark:bg-premium-900/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {React.cloneElement(item.icon, { className: "text-premium-500" })}
                </div>
                <div className="flex-grow">
                  <p className="font-medium dark:text-light-100 text-dark-300">{item.title}</p>
                  <p className="text-sm dark:text-light-500 text-dark-400">{item.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8">
          <Button variant="outline" className="w-full border-light-400 dark:border-dark-100 dark:text-light-400 text-dark-500 py-6 rounded-xl shadow-sm hover:shadow-premium-md transition-all duration-300 hover:border-premium-500">
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
