Five-a-Side Football Organizer
Description
A web application to organize five-a-side football matches with substitutes. Built with React and TypeScript, using Clerk for authentication and Supabase for the database. Deployed on Vercel.

Technologies
React
TypeScript
Clerk
Supabase
Zustand
React Router
Axios
DaisyUI
Heroicons
Lodash
Installation
Clone the repository:

sh
Copier le code
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install dependencies:

sh
Copier le code
npm install
Configure environment variables in a .env file:

env
Copier le code
REACT_APP_CLERK_FRONTEND_API=<your_clerk_frontend_api>
REACT_APP_SUPABASE_URL=<your_supabase_url>
REACT_APP_SUPABASE_ANON_KEY=<your_supabase_anon_key>
Start the application:

sh
Copier le code
npm start
Authentication
Authentication is handled by Clerk. Configure Clerk in src/index.tsx:

tsx
Copier le code
import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API!;

ReactDOM.render(
<ClerkProvider frontendApi={frontendApi}>
<App />
</ClerkProvider>,
document.getElementById('root')
);
Deployment on Vercel
Import the project to Vercel.
Configure environment variables:
REACT_APP_CLERK_FRONTEND_API
REACT_APP_SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY
Deploy.
License
This project is licensed under the MIT License.
