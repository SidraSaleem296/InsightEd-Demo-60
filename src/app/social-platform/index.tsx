import Form from "@/components/Form";
import Header from "@/components/Header1";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home"/>
      <Form placeholder= "What's happening?"/>
      <PostFeed/>
    </>
  );
}
