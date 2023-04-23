# F4rmhouse Frontend
This repository implements the F4rmhouse frontend web application built using `next.js`.
### What is F4armhouse?
F4armhouse is a social network will optimizes the `alpha` obtained
by users. Existing social networks usually try to maximise user 
screentime or some other metrics which will yield higher advertising profits. 
This is fine if you want a platform purely based on entertainment, however,
for investment communities we want to have up to date quality data from 
trustwurthy users.

### How is it made?
F4rmhouse has both a centralized and a decentralized aspect. We have centralized web-application
with a traditional backend-frontend architecture. This repository implements the frontend and is
build using `next.js` boostraped with `create-next-app`.

<p align="center">
  <img src="./public/other.png" alt="header" style="height: 300px; width:300px; border-radius:50%"/>
</p>

This project is deployed as a dockerized container in a EKS cluster on AWS.

## File structure 

```
.
├── cypress
│   └── ... 
├── Dockerfile
├── public
│   └── ... 
├── README.md
├── src
│   ├── common
│   │   ├── components
│   │   │   ├── elements
│   │   │   │   ├── Countdown
│   │   │   │   │   └── Countdown.tsx
│   │   │   │   ├── Events
│   │   │   │   │   └── Events.tsx
│   │   │   │   ├── Leaderboard
│   │   │   │   │   └── Leaderboard.tsx
│   │   │   │   ├── Navbar
│   │   │   │   │   └── Navbar.tsx
│   │   │   │   ├── Post
│   │   │   │   │   └── Post.tsx
│   │   │   │   ├── SidebarItem
│   │   │   │   │   └── SidebarItem.tsx
│   │   │   │   └── ToggleTheme
│   │   │   │       └── ToggleTheme.tsx
│   │   │   ├── fullLayout.tsx
│   │   │   ├── indexLayout.tsx
│   │   │   └── noneLayout.tsx
│   │   ├── hooks
│   │   ├── types
│   │   │   └── post.ts
│   │   └── utils
│   ├── cypress.json
│   ├── jest.config.js
│   ├── modules
│   │   ├── editor
│   │   ├── feed
│   │   │   └── Feed.tsx
│   │   ├── newsbar
│   │   └── sidebar
│   ├── next.config.js
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── pages
│   │   ├── api
│   │   │   └── hello.ts
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── help.tsx
│   │   ├── index.tsx
│   │   ├── next.d.ts
│   │   ├── settings.tsx
│   │   ├── theses
│   │   │   └── [thesis].tsx
│   │   └── thesis.tsx
│   ├── postcss.config.js
│   ├── styles
│   │   ├── globals.css
│   │   └── Home.module.css
│   ├── tailwind.config.js
│   └── tsconfig.json
└── __tests__
    └── index.test.jsx
```

## Installation
```
git clone git@github.com:fizlip/f4armhouse-frontend.git
```
```
npm install
```
```
cd src

npm run dev
```

If you get a message saying `next command not found` or something similar, you'll need to 
install next (and also react if you don't have that either) with the following command

```
npm install next react react-dom
```

## Testing

## Documentation

## Author
Filip A. Zlatoidsky -- @fizlip -- fillatino@gmail.com

<a>https://github.com/fizlip</a>

## Licence

Distributed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license. See <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode">License</a> for more information.
