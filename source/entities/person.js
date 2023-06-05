import { gql } from "apollo-server";

import { getPeople, saveNewPerson, getPeopleWithPosts } from "../database/data-management.js";

export const typeDefs = gql`
    extend type Query {
        personCount: Int!
        person(id: ID!): Person
        people(phone: YesNo): [Person]
        personByName(name: String!): Person
    }

    extend type Mutation {
        addPerson(name: String!, phone: String, street: String!, city: String!): Person
    }

    enum YesNo {
        YES
        NO
    }

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        isAdult: Boolean!
        posts: [Post]
        id: ID!
    }
`;

export const resolvers = {
    Query: {
        personCount: async () => {
            const people = await getPeople();
            return people.length;
        },
        person: async (root, args) => {
            const people = await getPeople();
            return people.find((person) => person.id === args.id);
        },
        people: async (root, args) => {
            let people = await getPeople();
            let peopleWithPosts = await getPeopleWithPosts(people);

            if (!args.phone) return peopleWithPosts;

            const byPhone = (person) => (args.phone === "YES" ? person.phone : !person.phone);

            return peopleWithPosts.filter(byPhone);
        },
        personByName: async (root, args) => {
            const people = await getPeople();
            return people.find((person) => person.name === args.name);
        },
    },
    Mutation: {
        addPerson: async (root, args) => {
            const people = await getPeople();

            if (people.find((person) => person.name === args.name)) {
                throw new UserInputError("Name must be unique", {
                    invalidArgs: args.name,
                });
            }

            await saveNewPerson(person);
            return person;
        },
    },
    Person: {
        // Default behavior if the name are equal
        // name: (root) => root.name,
        // phone: (root) => root.phone || "N/A",

        // Create properties from other properties
        isAdult: (root) => root.age >= 18,
        // address: (root) => `${root.street}, ${root.city}`,

        // Create a property from other properties with its own type
        address: (root) => {
            return {
                street: root.street,
                city: root.city,
            };
        },
    },
};
