import Layout from "@/components/Layout";
import {Toaster} from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
<<<<<<< HEAD
import EditModal from "@/components/modals/EditModal";
=======
import { LogIn } from "lucide-react";
import PostFeed from "@/components/posts/PostFeed";
import Sidebar from "@/components/layout/Sidebar";
>>>>>>> 8ab8cb2 (Added Doc and Semantic Search feature and commented out the social)

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session}>
      <Toaster />
<<<<<<< HEAD
      <EditModal />
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>
  ) 
=======

      <h1>This is Social Platform</h1>

      <Component {...pageProps} /> 
      <Sidebar></Sidebar>
    </Layout>
  );
>>>>>>> 8ab8cb2 (Added Doc and Semantic Search feature and commented out the social)
}
