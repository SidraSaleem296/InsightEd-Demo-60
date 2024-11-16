// import { GetStaticPropsContext, GetServerSidePropsContext, NextPage } from 'next';
// import { ClerkProvider } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import "../styles/globals.css";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// // Correctly import NextPage
// interface MyAppProps {
//   Component: NextPage;
//   pageProps: GetStaticPropsContext | GetServerSidePropsContext;
// }

// function MyApp({ Component, pageProps }: MyAppProps) {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//       <Component locale={pageProps.locale} preview={pageProps.preview} />
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }

// export default MyApp;