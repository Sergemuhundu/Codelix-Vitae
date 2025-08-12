import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, Download, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LocalDataBannerProps {
  lastModified: number;
  onLoadData: () => void;
  onClearData: () => void;
}

export function LocalDataBanner({ lastModified, onLoadData, onClearData }: LocalDataBannerProps) {
  const timeAgo = formatDistanceToNow(lastModified, { addSuffix: true });

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Clock className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-800">
            You have unsaved resume data from {timeAgo}. 
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onLoadData}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Download className="h-3 w-3 mr-1" />
            Load Data
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearData}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 