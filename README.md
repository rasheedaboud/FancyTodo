# Fancy Todo App
 
 Example of non trivial react app that uses following tech:
 
 - React
 - Typescript
 - HTML
 - CSS
 - Azure Functions
 - Azure Table Storage
 - Azure ADB2C
 
 # Features
 
 1. Create, Read, Update and Delete Todos.
 2. Visualize them in responsive kanban board.
 3. Drag drop tasks to change status.
 4. Install App as PWA for offline access to your tasks.
 5. Create an account to persist tasks.
 6. Role based authentication/authorization.
 7. Fully responsive across all devices.
 
 # Road Map
 1. Consider monitizing through subscriptions or adds.
 2. Allow users to add other people to todos (share or pass todos).
 3. Encrypt all todos at rest.


# Usage

- Run `npm install` to install the dependencies.
- Run `npm run start` to start the local development server.
- Browser to `http://localhost:8080`


# Deployment

When you use the Azure portal to create a new Static Web Application, select custom, and use the following configuration values:

    app_location: "/"
    api_location: "api"
    output_location: "dist"



