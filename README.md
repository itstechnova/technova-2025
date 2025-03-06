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
