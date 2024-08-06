# Project Setup Documentation

## Introduction

This documentation provides a step-by-step guide to set up and run a development server for a project using Vite and React. Follow these instructions to get the server up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (version 14.x or later)
2. **npm** (comes with Node.js) or **Yarn**

## Installation Steps

### 1. Clone the Repository

Clone the project repository from GitHub to your local machine. Replace `your-repo-url` with the actual URL of your repository.

```
git clone [https://github.com/ROLFFFX/MAE]
cd MAE
cd mae-frontend
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies. You can use either npm or yarn for this.

Using npm
```
npm install
```

Using yarn
```
yarn install
```

In rare cases npm install might get stuck, you can try using an older version of npm.
```
npm install -g npm@6
```

### 3. Start the Development Server

After installing the dependencies, start the development server. This command will spin up the Vite server and allow you to view the application in your browser.

Using npm:

```
npm run dev
```

Using Yarn:
```
yarn dev
```

### 4. Access the Application

Once the server is running, you can access the application by opening your web browser and navigating to the following URL:

```
http://localhost:5173
```


### 5. Available Scripts
In the project directory, you can run several commands:

npm run dev or yarn dev: Starts the development server.
npm run build or yarn build: Builds the application for production.
npm run preview or yarn preview: Serves the production build for previewing.
