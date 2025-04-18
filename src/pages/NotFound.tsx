
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fullPath, setFullPath] = useState<string>(location.pathname);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Get the full URL for debugging
    setFullPath(window.location.href);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-6 max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-sm text-gray-500 mb-6">
          The page at <code className="bg-gray-200 px-2 py-1 rounded-sm break-all">{location.pathname}</code> does not exist
        </p>
        <div className="text-xs text-gray-400 mb-6 break-all">
          Full URL: {fullPath}
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} />
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
