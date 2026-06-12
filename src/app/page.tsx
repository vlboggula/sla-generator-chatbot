"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [message, setMessage] = useState("Testing Supabase connection...");

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("sla_sessions")
        .select("*");

      if (error) {
        console.error(error);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage(
          `✅ Supabase connected successfully! Rows found: ${data.length}`
        );
      }
    }

    testConnection();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>SLA Generator Chatbot</h1>
      <p>{message}</p>
    </main>
  );
}