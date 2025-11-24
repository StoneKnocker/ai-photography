import { MarkdownContent } from "../markdown-content";
import { allPosts } from "content-collections";
import Header from "@/components/header";
import { useLoaderData } from "react-router";
import i18nServer from "~/server/i18n.server";
import type { Route } from "./+types/privacy-policy";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = await i18nServer.getLocale(request);
  console.log("locale in privacy policy loader:", locale);
  const post = allPosts.find(
    (post) =>
      post._meta.directory === locale && post._meta.fileName === "privacy.md"
  );

  if (!post) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  const { post } = data!;
  return [
    { title: post.title },
    { name: "description", content: post.description },
  ];
}

export default function Page() {
  const loaderData = useLoaderData();
  const post = loaderData.post;
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 w-full md:w-[80%]">
        <div className="prose prose-sm md:prose-base mx-auto prose-invert prose-headings:text-white prose-p:text-gray-200 prose-a:text-blue-400 prose-strong:text-white">
          <MarkdownContent content={post.content} />
        </div>
      </div>
    </>
  );
}
