import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deletePost, getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json({ post });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const slug = formData.get("slug");
  invariant(typeof slug === "string", "slug must be a string");

  await deletePost(slug);
  return redirect("/posts/admin");
};

export default function PostAdminSlug() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <Form method="post">
        <input type="hidden" name="slug" value={post.slug} />
        <p className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          >
            Delete
          </button>
        </p>
      </Form>
    </main>
  );
}
