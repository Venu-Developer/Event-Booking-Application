Project Name :

Event Booking Application  -  A real-time event booking platform with email notifications and seat availability tracking.


GitHub Repository : 

https://github.com/Venu-Developer/Event-Booking-Application

Live Deployment :

Frontend (Vercel) : https://event-booking-application-client.vercel.app/

Backend (Render): https://event-booking-application-81f2.onrender.com

Tech Stack Used -

Frontend: React.js, Tailwind CSS, React Query, Axios, React Hot Toast

Backend: Node.js, Express.js, Socket.IO, Nodemailer,express-validator, sanitize-html

Database: In-memory data (can replace with MongoDB)

Others: Vite, dotenv

Features 

   - View events with pagination

   - Real-time seat availability updates using Socket.IO

   - Event booking with form validation  (name, email)

   - Email confirmation after booking

   - Sold-out events indication

   - Responsive design for all devices

Setup Instructions 

Clone the repository

BACKEND :
    git clone https://github.com/Venu-Developer/Event-Booking-Application
    cd backend
    npm install
    cp .env.example .env      # update environment variables
    npm start
    Backend runs on http://localhost:5000 by default

BACKEND .env file

   PORT=5000
   CLIENT_URL=http://localhost:3000
   EMAIL_USER=user_email@gmail.com
   EMAIL_PASS=user_email_password    

Frontend Setup

   cd frontend
   npm install
   cp .env.example .env       # update environment variables
   npm run 
   Frontend runs on http://localhost:5173 by default

 Frontend .env   

    VITE_API_URL=http://localhost:5000
    VITE_SOCKET_URL=http://localhost:5000

Assumptions / Limitations

    - Backend uses in-memory storage for events; data resets on server restart.

    - Emails require valid Gmail credentials; enable "Less secure app access" or app password.

     - CORS is configured for specific frontend URL (CLIENT_URL).

API Endpoints

GET

 /events?page=<page>&limit=<limit> — fetch paginated events

POST

 /book — book an event

Request body:
{
  "eventId": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

Real-Time Updates

Seat availability updates via Socket.IO (seatUpdated event)

Frontend subscribes automatically for live seat updates
