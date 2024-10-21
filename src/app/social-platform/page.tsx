// /app/social-platform/page.tsx

import Layout from "@/app/layout"; // Ensure this import path is correct
import { Toaster } from 'react-hot-toast';
import "@/styles/globals.css";
import { AppProps } from "next/app"; // Not needed here if you are using a page
import PostFeed from "@/components/posts/PostFeed";

// Make sure this component is defined as a client component if it uses client hooks
const SocialPlatform = (pageProps) => {
  return (
        <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>

  );
};

// If this is a page, you don’t need to export as App. Just export the page component
export default SocialPlatform;
