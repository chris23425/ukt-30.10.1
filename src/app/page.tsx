'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxSize: 200 * 1024 * 1024, // 200MB
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => ({
        file,
        progress: 0,
        status: 'uploading' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!files.length) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsUploading(true);
    // TODO: Implement file upload to Supabase
    // TODO: Send email notification
    // TODO: Store in database
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Audio File Upload</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field"
            rows={4}
          />
        </div>

        <div
          {...getRootProps()}
          className={`upload-zone ${isDragActive ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop audio files here, or click to select files</p>
          )}
          <p className="text-sm text-gray-500 mt-2">Maximum file size: 200MB</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Selected Files</h2>
            {files.map((file, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium">{file.file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <div className="progress-bar mt-2">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="btn-primary w-full"
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
      </form>
    </main>
  );
} 