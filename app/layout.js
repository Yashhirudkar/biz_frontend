// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { CssBaseline } from "@mui/material";
import NavBar from "./src/components/navbar";

// Load Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* MUI baseline for consistent styling */}
        <CssBaseline />
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
