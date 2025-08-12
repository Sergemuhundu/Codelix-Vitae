'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface PhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: string | null, adjustments?: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  }) => void;
  name?: string;
  photoAdjustments?: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  };
}

export function PhotoUpload({ photo, onPhotoChange, name, photoAdjustments }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imageAdjustments, setImageAdjustments] = useState({
    scale: photoAdjustments?.scale || 1,
    translateX: photoAdjustments?.translateX || 0,
    translateY: photoAdjustments?.translateY || 0,
    rotation: photoAdjustments?.rotation || 0
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync adjustments when they change externally
  useEffect(() => {
    if (photoAdjustments) {
      setImageAdjustments({
        scale: photoAdjustments.scale,
        translateX: photoAdjustments.translateX,
        translateY: photoAdjustments.translateY,
        rotation: photoAdjustments.rotation
      });
    }
  }, [photoAdjustments]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const defaultAdjustments = {
          scale: 1,
          translateX: 0,
          translateY: 0,
          rotation: 0
        };
        onPhotoChange(e.target?.result as string, defaultAdjustments);
        // Reset adjustments when new photo is uploaded
        setImageAdjustments(defaultAdjustments);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoChange(null);
    setImageAdjustments({
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotation: 0
    });
  };

  const adjustImage = (type: 'scale' | 'translateX' | 'translateY' | 'rotation', value: number) => {
    const newAdjustments = {
      ...imageAdjustments,
      [type]: value
    };
    setImageAdjustments(newAdjustments);
    // Pass adjustments back to parent when photo exists
    if (photo) {
      onPhotoChange(photo, newAdjustments);
    }
  };

  const resetAdjustments = () => {
    setImageAdjustments({
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotation: 0
    });
  };

  const getImageStyle = () => {
    return {
      transform: `scale(${imageAdjustments.scale}) translate(${imageAdjustments.translateX}px, ${imageAdjustments.translateY}px) rotate(${imageAdjustments.rotation}deg)`,
      transition: 'transform 0.2s ease-in-out'
    };
  };

  return (
    <div className="w-full">
      <div className="flex items-start space-x-4">
        {/* Photo Display */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
                style={getImageStyle()}
              />
            ) : (
              <Camera className="w-6 h-6 text-gray-400" />
            )}
          </div>
          
          {photo && (
            <button
              onClick={handleRemovePhoto}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Upload/Controls Section */}
        <div className="flex-1 min-w-0">
          {!photo ? (
            /* Upload Area */
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop an image here, or click to select
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs"
              >
                Choose Photo
              </Button>
            </div>
          ) : (
            /* Compact Adjustment Controls */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Adjust Image</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAdjustments}
                  className="text-xs h-7 px-2"
                >
                  <RotateCw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Compact Controls Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Scale Control */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Zoom</span>
                    <span>{Math.round(imageAdjustments.scale * 100)}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustImage('scale', Math.max(0.5, imageAdjustments.scale - 0.1))}
                      className="p-1 h-6 w-6"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </Button>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={imageAdjustments.scale}
                      onChange={(e) => adjustImage('scale', parseFloat(e.target.value))}
                      className="flex-1 h-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustImage('scale', Math.min(2, imageAdjustments.scale + 0.1))}
                      className="p-1 h-6 w-6"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Rotation Control */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Rotation</span>
                    <span>{imageAdjustments.rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={imageAdjustments.rotation}
                    onChange={(e) => adjustImage('rotation', parseInt(e.target.value))}
                    className="w-full h-2"
                  />
                </div>
              </div>

              {/* Position Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Horizontal</span>
                    <span>{imageAdjustments.translateX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={imageAdjustments.translateX}
                    onChange={(e) => adjustImage('translateX', parseInt(e.target.value))}
                    className="w-full h-2"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Vertical</span>
                    <span>{imageAdjustments.translateY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={imageAdjustments.translateY}
                    onChange={(e) => adjustImage('translateY', parseInt(e.target.value))}
                    className="w-full h-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
} 