import slug from 'slug';
import base64 from 'base-64';

export default function User(name, email, website){
    return {
        name,
        email,
        website,
    }
}

export function createUrl(name){
    return `https:test/users/${slug(name)}`;
}

export function gravatar(email){
    const hash = base64.encode(email);
    const photoURL = `https://gravatar.com/avatar/${hash}`;
    return photoURL;
}