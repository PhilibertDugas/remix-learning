import { PrismaClient } from "@prisma/client";
import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";

let client = prisma as PrismaClient;

export async function getPosts() {
  return client.post.findMany();
}

export async function getPost(slug: string) {
  return client.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return client.post.create({ data: post });
}

export async function deletePost(slug: string) {
  return client.post.delete({ where: { slug } });
}
