# UK Transcription Upload

A web application for uploading audio files for transcription services.

## Features

- Multiple audio file upload (up to 200MB each)
- Email validation
- Notes field
- Upload progress tracking
- Success screen with:
  - List of uploaded files
  - Total duration in minutes
  - Cost estimates for different turnaround times
- Email notifications
- Supabase integration for storage and database

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up Supabase:
   - Create a storage bucket named "audio-uploads"
   - Create a table named "uploads" with the following schema:
     ```sql
     create table uploads (
       id uuid default uuid_generate_v4() primary key,
       client_email text not null,
       filename text not null,
       duration_minutes float not null,
       download_link text not null,
       upload_time timestamp with time zone default timezone('utc'::text, now()) not null,
       status text default 'upload' not null,
       notes text
     );
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## Cost Calculation

The application calculates costs based on the following rates:
- 1 Day (Urgent): £1.60 per minute
- 1 Week (Standard): £1.30 per minute
- 1 Month (Slow): £1.10 per minute 