import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  // Log the environment variables to ensure they are set
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error("Supabase URL and Key must be set in environment variables");
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  return supabase;
};

const supabase = createSupabaseClient();

export const checkIfUserRegistered = async (email) => {
  const { data, error } = await supabase.from("users").select("*").eq("email", email);

  if (error) {
    console.error("Error checking if user is registered:", error);
    throw new Error("Failed to check user registration");
  }

  return data;
};

export const reisterUserIntoUsersTable = async (username, email) => {
  const { data, error } = await supabase.from("users").insert({ email: email, user_name: username, platform: "spotify" }).select();
  if (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }

  return data;
};

export const getAllUsers = async (email) => {
  const { data, error } = await supabase.from("users").select().neq("email", email);

  if (error) {
    console.error("Error fetching all users", error);
    throw new Error("Failed to fetch all users");
  }

  return data;
};

export const createNewGame = async (requstingUserEmail, recievingUserEmail) => {
  const { data, error } = await supabase.from("games_test").insert({ sender_email: requstingUserEmail, reciever_email: recievingUserEmail }).select();
  if (error) {
    console.error("Error creating new game:", error);
    throw new Error("Failed to create new game");
  }
  return data;
};

export const getAllGamesByUser = async (email) => {
  const { data, error } = await supabase.from("games_test").select("*").or(`sender_email.eq.${email},reciever_email.eq.${email}`);
  if (error) {
    console.error("Error fetching all users", error);
    throw new Error("Failed to fetch all users");
  }

  return data;
};
