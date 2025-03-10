'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface UploadedFile {
  filename: string;
  duration: number;
  downloadLink: string;
  uploadTime: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    // TODO: Fetch files from Supabase using the upload ID from searchParams
    // For now, using mock data
    const mockFiles: UploadedFile[] = [
      {
        filename: 'recording1.mp3',
        duration: 15.5,
        downloadLink: '#',
        uploadTime: new Date().toISOString()
      },
      {
        filename: 'recording2.wav',
        duration: 25.2,
        downloadLink: '#',
        uploadTime: new Date().toISOString()
      }
    ];
    setFiles(mockFiles);
    setTotalDuration(mockFiles.reduce((sum, file) => sum + file.duration, 0));
  }, [searchParams]);

  const calculateCost = (rate: number) => {
    return (totalDuration / 60) * rate;
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Successful!</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium">{file.filename}</p>
                <p className="text-sm text-gray-500">
                  Duration: {file.duration.toFixed(1)} minutes
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(file.uploadTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Total Duration</h2>
          <p className="text-2xl font-bold">
            {(totalDuration / 60).toFixed(1)} minutes
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cost Estimates</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">1 Day (Urgent)</h3>
              <p className="text-2xl font-bold text-blue-600">
                £{calculateCost(1.60).toFixed(2)}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">1 Week (Standard)</h3>
              <p className="text-2xl font-bold text-blue-600">
                £{calculateCost(1.30).toFixed(2)}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">1 Month (Slow)</h3>
              <p className="text-2xl font-bold text-blue-600">
                £{calculateCost(1.10).toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 