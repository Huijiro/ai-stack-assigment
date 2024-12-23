This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decisions on the Stack

I decided to use Next.js because I haven't used it a long while and haven't used React in a while too, I wanted to experiment with what it had as it was one of the suggestions for the project itself.

## Decisions on the Project Design

Coming from a full-stack background, the mix between the RSC and Next 19 confused me slightly, I tried to abstract the endpoints using Vercel itself, in most cases to hide secrets, and other cases for sake of ease of use.

I tried to use Shadcn to make the UI, using it's components when possible, but decided to make the file manager myself so I could customize it when I could.

The file manager itself uses a recursive pattern on itself, it could probably be more elegant, but I didn't wanted to do the alternative which would be to keep track of a tree structure in the code and have the UI update based on it when I already have the DOM.

## Problems I ran into

I spent too much time thinking about how I would do the recursive file blocking in the file manager and the removal of blocked files from the list, in the end I tested quite a while but came with a simple solution. I just wished I didn't spend too much time on it and instead tried doing other things.

The lack of API documentation for this project was my biggest issue, trying to debug errors when I couldn't make much sense of what exactly the API wanted, I never used Jupyter before, trying to figure out how to extract the info a needed from a example without typing my endpoints then typing them after I got the responses was very annoying.

Some of the requirements didn't make much sense to me, which made me need to go to Antoni to talk out and clarify.
