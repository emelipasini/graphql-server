import { gql } from "apollo-server";

import { getPosts, getPostsWithAuthors } from "../database/data-management.js";

export const typeDefs = gql`
    extend type Query {
        postCount: Int!
        post(id: ID!): Post
        posts: [Post]
    }

    type Post {
        title: String!
        author: Person
        id: ID!
    }
`;

export const resolvers = {
    Query: {
        postCount: async () => {
            const posts = await getPosts();
            return posts.length;
        },
        post: async (root, args) => {
            let posts = await getPosts();
            posts = await getPostsWithAuthors(posts);
            return posts.find((post) => post.id === args.id);
        },
        posts: async () => {
            let posts = await getPosts();
            posts = await getPostsWithAuthors(posts);
            return posts;
        },
    },
};
