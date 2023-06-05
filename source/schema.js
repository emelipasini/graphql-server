import { gql } from "apollo-server";

import { typeDefs as personTypeDefs, resolvers as personResolvers } from "./entities/person.js";
import { typeDefs as postTypeDefs, resolvers as postResolvers } from "./entities/post.js";

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;

export const resolvers = [personResolvers, postResolvers];

export const typeDefs = [rootTypeDefs, personTypeDefs, postTypeDefs];
