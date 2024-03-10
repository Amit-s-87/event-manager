#Event Management Platform - Backend

This backend system provides functionalities for user registration, event management, and participant management for a virtual event management platform. It features secure user authentication using bcrypt for password hashing and JWT for session management.

## Project Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

## User Authentication

- **POST /register:** Register a new user. Requires username, email, password, and role (organizer/attendee).
- **POST /login:** Login with existing user credentials. Requires email and password.

## Event Management

- **POST /events:** Create a new event. Requires date, time, and description. Accessible only by organizers.
- **PUT /events/:id:** Update an existing event. Requires event ID and updated details. Accessible only by organizers.
- **DELETE /events/:id:** Delete an existing event. Requires event ID. Accessible only by organizers.

## Participant Management

- **POST /events/:id/register:** Register for an event. Requires event ID. Accessible by authenticated users (organizers/attendees).

## Authentication Middleware

- The `authenticateUser` middleware verifies the JWT token provided in the Authorization header.
- The `authorizeUser` middleware checks if the authenticated user is authorized to perform the requested action.

## Asynchronous Operations

- Nodemailer is used for sending email notifications upon successful user registration.

## Environment Variables

- Create a `.env` file in the root directory with the following variables:

    ```
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

