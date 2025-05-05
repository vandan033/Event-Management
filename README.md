# College Event Management Module

A MERN stack web application for managing Event Managment List.

## Features

- Event registration with Event picture upload
- View all Event in a table format
- Delete Event records
- Responsive and modern UI using Material-UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Photos

![Screenshot 2025-05-05 103758](https://github.com/user-attachments/assets/a3dd7b40-d368-4dca-8393-34e11518e1a9)
![Screenshot 2025-05-05 105106](https://github.com/user-attachments/assets/c809b2eb-e463-416f-a2a9-f6e835012643)
![Screenshot 2025-05-05 105143](https://github.com/user-attachments/assets/a1ddab31-5a52-42e1-b2db-d50d997af45f)

## Setup

### Backend Setup

1. Navigate to the server directory:
   
   cd server
   

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/Event
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## MOngoDB
![Screenshot 2025-05-05 104647](https://github.com/user-attachments/assets/9eb65d20-ab28-4f90-9805-5faf3ef21286)
