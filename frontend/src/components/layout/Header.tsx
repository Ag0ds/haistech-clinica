"use client";

import React, { useState } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "#0d1b2e" }}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" width={40} height={40} />

          <span className="text-white text-xl font-bold tracking-tight select-none">
            HAIS <span className="text-white">Tech</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage("PT")}
            aria-pressed={language === "PT"}
            className="flex items-center justify-center rounded-full border-2 transition-colors text-xs font-bold px-3 py-1"
            style={{
              borderColor: language === "PT" ? "#4A9EE8" : "transparent",
              color: language === "PT" ? "#4A9EE8" : "#6b8cae",
              background: "transparent",
            }}
          >
            PT
          </button>

          <span style={{ color: "#3a5470", fontSize: "14px" }}>|</span>

          <button
            onClick={() => setLanguage("EN")}
            aria-pressed={language === "EN"}
            className="flex items-center justify-center rounded-full border-2 transition-colors text-xs font-bold px-3 py-1"
            style={{
              borderColor: language === "EN" ? "#4A9EE8" : "transparent",
              color: language === "EN" ? "#4A9EE8" : "#6b8cae",
              background: "transparent",
            }}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

