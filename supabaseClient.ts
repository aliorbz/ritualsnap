
import { createClient } from '@supabase/supabase-js';

/**
 * CONFIGURATION:
 * Checks both standard and VITE-prefixed environment variables.
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://kaxyfkmonqcvivjcrbws.supabase.co'; 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtheHlma21vbnFjdml2amNyYndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjk0ODYsImV4cCI6MjA4Mjc0NTQ4Nn0.GT8SbAzUjIa-aqwpPLMXXG0XqNsl5XIqKOj8vXh9dC4';

// Export a flag to check if the connection is configured
export const isSupabaseConfigured = supabaseUrl !== '' && supabaseAnonKey !== '';

// Create the client only if credentials exist to avoid "supabaseUrl is required" error
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
