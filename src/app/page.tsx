"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [message, setMessage] = useState("");

  async function testGemini() {
    try {
      const response = await fetch("/api/generate-sla", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Write a short SLA for website maintenance services.",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Gemini Response: " + data.data);
      } else {
        setMessage("Gemini Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error calling Gemini API");
    }
  }

  async function testSupabaseInsert() {
    const { error } = await supabase.from("sla_sessions").insert([
      {
        session_name: "Test Session",
      },
    ]);

    if (error) {
      setMessage("Supabase Insert Error: " + error.message);
    } else {
      setMessage("✅ Test row inserted into sla_sessions");
    }
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>SLA Generator Chatbot</h1>

      <button onClick={testGemini}>
        Test Gemini API
      </button>

      <br />
      <br />

      <button onClick={testSupabaseInsert}>
        Test Supabase Insert
      </button>

      <p>{message}</p>
    </main>
  );
}