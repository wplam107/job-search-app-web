import { supabase } from "../supabaseClient";

export default function handler(req, res) {
  res.status(200).json(
    supabase.from("jobs").select("*")
  );
};