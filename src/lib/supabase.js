import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://synuufxjdejpvpbwcypj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bnV1ZnhqZGVqcHZwYndjeXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDc4NTEsImV4cCI6MjA5NDIyMzg1MX0.wwn9NvsCZjCGnJAT6D64XWvBK2vC-IPBcqI2Ki41LZw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
