// Generates public/og-image.png (1200x630) — the link-preview card shown
// when the portfolio URL is shared on WhatsApp, Twitter/X, LinkedIn, etc.
// Run: node scripts/generate-og-image.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import React from "react";

const loadFont = (file, weight) =>
  readFile(`node_modules/@fontsource/inter/files/${file}`).then((data) => ({
    name: "Inter",
    data,
    weight,
    style: "normal",
  }));

const badge = (text, bg, color, border) =>
  React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        padding: "10px 22px",
        borderRadius: 999,
        backgroundColor: bg,
        color,
        border: `2px solid ${border}`,
        fontSize: 26,
        fontWeight: 700,
      },
    },
    text
  );

async function main() {
  const fonts = await Promise.all([
    loadFont("inter-latin-400-normal.woff", 400),
    loadFont("inter-latin-600-normal.woff", 600),
    loadFont("inter-latin-700-normal.woff", 700),
    loadFont("inter-latin-800-normal.woff", 800),
  ]);

  const card = React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 1200,
        height: 630,
        padding: "70px 80px",
        backgroundColor: "#FDF6E9",
        fontFamily: "Inter",
        position: "relative",
      },
    },
    // soft amber glow, top-left
    React.createElement("div", {
      style: {
        position: "absolute",
        top: -160,
        left: -120,
        width: 520,
        height: 520,
        borderRadius: "50%",
        backgroundColor: "#FDE68A",
        opacity: 0.45,
      },
    }),
    // soft orange glow, bottom-right
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: -180,
        right: -100,
        width: 560,
        height: 560,
        borderRadius: "50%",
        backgroundColor: "#FDBA74",
        opacity: 0.4,
      },
    }),
    // Top row: monogram + name block
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 28 } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 104,
            height: 104,
            borderRadius: 28,
            backgroundColor: "#F59E0B",
            color: "#FFFBEB",
            fontSize: 48,
            fontWeight: 800,
          },
        },
        "NJ"
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        React.createElement(
          "div",
          { style: { fontSize: 72, fontWeight: 800, color: "#1C1917", lineHeight: 1 } },
          "Nimish Jais"
        ),
        React.createElement(
          "div",
          { style: { fontSize: 24, fontWeight: 600, color: "#B45309", marginTop: 10 } },
          "GhostDraft Developer  \u2022  AI Engineer  \u2022  System Implementation Specialist"
        )
      )
    ),
    // Amber underline flourish
    React.createElement("div", {
      style: {
        width: 340,
        height: 10,
        borderRadius: 999,
        backgroundColor: "#F59E0B",
        marginTop: 26,
        marginLeft: 132,
      },
    }),
    // Company line
    React.createElement(
      "div",
      { style: { fontSize: 26, fontWeight: 600, color: "#78716C", marginTop: 22, marginLeft: 132 } },
      "Sapiens Technologies  \u2022  Bangalore, India"
    ),
    // Bottom badges
    React.createElement(
      "div",
      { style: { display: "flex", gap: 18, marginTop: 44, marginLeft: 132 } },
      badge("Bravo Award 2025", "#FEF3C7", "#92400E", "#FCD34D"),
      badge("AI Coder Certified", "#FFEDD5", "#9A3412", "#FDBA74"),
      badge("1.5+ Yrs Enterprise Experience", "#FFE4E6", "#9F1239", "#FDA4AF")
    )
  );

  const svg = await satori(card, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  await mkdir("public", { recursive: true });
  await writeFile("public/og-image.png", png);
  console.log("public/og-image.png generated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
