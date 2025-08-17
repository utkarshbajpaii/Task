
Task Manager AppA full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks with user authentication.
🚀 How to Run the ApplicationThis guide will walk you through setting up and running the application, including both the frontend and backend.
1. Clone the RepositoryTo get started, clone the project from GitHub using the following command:git clone https://github.com/utkarshbajpaii/Task.git
2. Frontend (./frontend/.env)Configure your frontend API URL by creating a .env file inside the frontend directory with the following content:REACT_APP_API_URL=https://task-7-iftq.onrender.com/api
3. Backend (./backend/.env)Set up your backend environment by creating a .env file in the backend directory. Populate it with your specific details:PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
4. Install and Run the FrontendNavigate to the frontend directory, install the required dependencies, and start the development server:cd frontend
npm install
npm start
5. Install and Run the BackendOpen a new terminal, navigate to the backend directory, and install its dependencies. Then, start the backend server:cd backend
npm install
npm run dev
⚙️ Tech StackFrontend: React, React Router, Context APIBackend: Node.js, Express.js, MongoDBAuth: JSON Web Tokens (JWT)




