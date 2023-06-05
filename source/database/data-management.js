import axios from "axios";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// PEOPLE

export const getPeople = async () => {
    const { data: people } = await axios.get(`${process.env.API_URL}/people`);
    return people;
};

export const saveNewPerson = async (person) => {
    person.id = uuid();

    const newPerson = {
        id: person.id,
        name: person.name,
        phone: person.phone,
        street: person.street,
        city: person.city,
    };

    const { data: people } = await axios.post(`${process.env.API_URL}/people`, newPerson);
    return people;
};

export const getPeopleWithPosts = async (people) => {
    const posts = await getPosts();

    people = people.map((person) => {
        person.posts = posts.filter((post) => post.author === person.id);
        return person;
    });

    return people;
};

// POSTS

export const getPosts = async () => {
    const { data: posts } = await axios.get(`${process.env.API_URL}/posts`);
    return posts;
};

export const getPostsWithAuthors = async (posts) => {
    const people = await getPeople();

    posts = posts.map((post) => {
        post.author = people.find((person) => person.id === post.author);
        return post;
    });

    return posts;
};
