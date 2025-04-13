
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, AlertTriangle, XCircle, Clock, Trash2
} from 'lucide-react';
import Header from '../components/Header';
import { getHistory, clearHistory, ScanRecord } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const History: React.FC = () => {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    toast.success('Scan history cleared');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusIcon = (status: ScanRecord['status']) => {
    switch (status) {
      case 'authentic':
        return <CheckCircle size={16} className="text-verifyGreen" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-cautionAmber" />;
      case 'counterfeit':
        return <XCircle size={16} className="text-alertRed" />;
      default:
        return <AlertTriangle size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="app-container">
      <Header title="Scan History" showBack={true} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto text-gray-300 mb-4" size={48} />
              <h2 className="text-xl font-bold text-darkText">No Scan History</h2>
              <p className="text-gray-500 mt-2">
                Your scan history will appear here
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Scans</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearHistory}
                  className="text-xs"
                >
                  <Trash2 className="mr-1 h-3 w-3" /> Clear
                </Button>
              </div>
              
              <div className="space-y-3">
                {history.map((item) => (
                  <Link 
                    key={item.id}
                    to={`/product/${item.productId}`}
                    className="block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-darkText">{item.productName}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {formatDate(item.timestamp)}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
