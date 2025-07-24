"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShortAnswerQuestion from "@/components/shortanswerq";
import SubmitButton from "@/components/submitButton";
import supabase from "@/config/supabaseClient";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setFormError(error.message);
    } else {
      setFormSuccess(
        "Password updated! You can now log in with your new password."
      );
      setTimeout(() => router.push("/account/login"), 2000);
    }
  };

  return (
    <div className="text-textPrimary min-h-[70vh] bg-navPrimary flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white/80 rounded-xl shadow-md px-8 py-12 [@media(min-height:900px)]:mt-16"
      >
        <h1 className="text-3xl font-bold text-textPrimary mb-6">
          Set a New Password
        </h1>
        <ShortAnswerQuestion
          question="New Password*"
          name="password"
          id="password"
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={handleChange}
          required
        />
        <SubmitButton className="bg-textPrimary hover:bg-buttonSecondary px-8 py-3 text-xl font-semibold rounded-lg shadow-md w-full mt-8 text-white transition-all duration-300">
          Update Password
        </SubmitButton>
        {formError && <div className="text-red-500 mt-4">{formError}</div>}
        {formSuccess && (
          <div className="text-green-500 mt-4">{formSuccess}</div>
        )}
      </form>
    </div>
  );
}
