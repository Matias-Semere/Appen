import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdmjwcxnbqqomswgoktc.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbWp3Y3huYnFxb21zd2dva3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjA2MjgsImV4cCI6MjA3OTYzNjYyOH0.-zaHVl3Yri_wBg0hjpr-qO5LvJa0A1RxsB3yTZjnqaw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
