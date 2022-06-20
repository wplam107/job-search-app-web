import { supabase } from '../../supabaseClient';

export default function AuthHandler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
};
