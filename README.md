This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# itstechnova Website

**Live website: [www.itstechnova.com](https://itstechnova.com/), [www.itstechnova.org](https://itstechnova.org/)**  
**Dev website: [itstechnova2023-dev.netlify.app/](https://itstechnova2023-dev.netlify.app/)** 

## Getting Started

Clone the project: 
```
git clone https://github.com/itstechnova/technova-2023.git
```
Open the project on VS Code and install required packages:
```
yarn install
```
Run the following to view live changes on http://localhost:3000
```
yarn start
```

## Development Tips

#### Naming Convention

- Name your branches `ticket#-title`, where ticket# refers to the task id you are working on
- e.g. 2-create-nav-bar

#### Pull Requests & Commits

- Always write a descriptive commit message in the following format: `ticket#: description`
- Write a detailed, but not overly detailed description of the feature or bug fixes when creating a PR
- AVOID pushing directly to dev and main
- Please make sure your PR passes the build tests! You can see any warnings or errors by running ```yarn build```

#### Other Tips

- Always run `yarn install` after pulling from master or checking out to a remote branch
- Always update your local master branch by running `git pull` everytime a PR is merged to minimize the need to resolve conflicts when you are creating a PR

## Deployment

Netlify is set up to **automatically trigger deployments** upon changes to:  
- dev branch for: [itstechnova-dev.netlify.app/](https://itstechnova-dev.netlify.app/)  
- main branch for: [www.itstechnova.com](http://itstechnova.com/)     

A preview website will be deployed by Netlify when you create a pull request. Navigate by clicking on the `Details` button below:   
<img width="922" alt="Screen Shot 2021-05-02 at 4 58 54 PM" src="https://user-images.githubusercontent.com/43832056/116832521-f8dbc400-ab69-11eb-9cf5-dc725645e73d.png">

To see build status and analytics, login by email here: https://app.netlify.com/ 
```
email: hacktechnova@gmail.com
password: {Same as gmail}
```
Unfortunately the free plan does not allow for adding team members.
