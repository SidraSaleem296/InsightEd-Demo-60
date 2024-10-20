// /app/social-platform/page.tsx

import Layout from "@/app/layout"; // Ensure this import path is correct
import { Toaster } from 'react-hot-toast';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LogIn } from "lucide-react";
import PostFeed from "@/components/posts/PostFeed";

// Ensure Layout is a valid client or server component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster />

      <h1>This is Social Platform</h1>

      {/* <Component {...pageProps} />  */}
    </Layout>
  );
}



