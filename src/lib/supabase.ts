import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UploadRecord {
  id: string;
  client_email: string;
  filename: string;
  duration_minutes: number;
  download_link: string;
  upload_time: string;
  status: 'upload' | 'processing' | 'completed' | 'error';
  notes?: string;
} 