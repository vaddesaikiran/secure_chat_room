# secure_chat_room

## Overview
The Secure Chat Room project is a web-based application designed to provide users with a secure platform for real-time communication.

### Key Features:
- **User Authentication and Authorization:**
  - Authenticate and authorize users based on their membership status (prime or non-prime).
  - Use JWT tokens for secure authentication.
- **Profile Management:**
  - Allow users to view and update their profiles.
  - Users can view each other's profiles.
- **Room Management:**
  - Prime members can create chat rooms.
  - Non-prime members can join existing chat rooms.
  - Implement room creation, joining, and leaving functionalities.
- **Chat Functionality:**
  - Enable users within a chat room to send and receive messages in real-time.
- **Availability Coins:**
  - Track available coins for users.
  - Non-prime members must have sufficient coins to join additional rooms after their free join.
- **Logout:**
  - Allow users to securely log out of their profiles.


## Project Status
Currently, the project is 70% complete. Below is an overview of the tasks accomplished and those that are pending:

## Completed Tasks
- **Implemented User Authentication System:**
  - Users can register, log in, and authenticate using JWT tokens.
- **Created Chat Room Interface:**
  - Developed a user-friendly interface for creating and joining chat rooms.
- **Restricted Chat Room Creation for Non-Prime Users:**
  - Only prime users have the privilege to create chat rooms. Non-prime users are restricted from creating chat rooms but can join existing ones.
- **Secure Chat Room Access:**
  - Implemented a secure mechanism where only users with the room ID and password can join the chat room and view messages.
- **Leave Chat Room and Logout Functionality:**
  - Users can leave the chat room and securely log out of their accounts.
- **Database Management:**
  - Handled user authentication, chat room creation, and related functionalities in MySQL database.


## Pending Tasks
- **Enhance Security Measures:**
  - Implement additional security measures to further safeguard user data and communication.
- **Friend Requests Functionality:**
  - Allow users to send friend requests to other participants and manage their friends list.
- **Limiting Participants Feature in Rooms:**
  - Implement a feature to limit the number of participants allowed in a chat room to maintain optimal performance and user experience.


## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/vaddesaikiran/secure_chat_room.git
    ```

2. Navigate to the project directory:
    ```bash
    cd secure_chat_room
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. open a web browser and go to 'http://localhost:5173' to access the application
6. Open a web browser and go to `http://localhost:3000` to access backend of  the application.

## API Endpoints
- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in with existing credentials.
- `GET /api/logout`: Log out the current user.
- `POST /api/chatrooms`: Create a new chat room.
- `POST /api/joinroom/:roomId`: Join an existing chat room.
- `POST /api/messages/:roomId`: Send a message in a specific chat room.
- `GET /api/messages/:roomId`: Get all messages in a specific chat room.

## Usage

### User Registration
1. Navigate to the registration page.
2. Enter your details, including `userId`, `name`, `phone`, and `availCoins`.
3. Click the "Register" button.
4. If the `userId` already exists in the database, you'll receive a message indicating that the user already exists. Otherwise, the registration will be successful.

### User Login
1. Navigate to the login page.
2. Enter your `userId`.
3. Click the "Login" button.
4. If the `userId` exists in the database, you'll be logged in. Otherwise, you'll receive a message indicating that the user doesn't exist.

### Prime vs Non-Prime Users
- After registration/login, some users will have prime membership, while others will be non-prime.
- Prime users have the privilege to create chat rooms, while non-prime users do not have access to this feature.
- some of prime users are sai2024, munner2024
- some of non prime users are rakesh2024, karthik2024

### Creating a Chat Room
1. Prime users can navigate to the chat room creation page.
2. Enter the room name and click the "Create Chat Room" button.
3. Upon creation, a unique room ID and password will be generated for the chat room.

### Joining a Chat Room
1. Users can join a chat room by providing the room ID and password.
2. Navigate to the join room section and enter the room ID and password.
3. Click the "Join Room" button to join the chat room.

### Chat Functionality
- Once inside a chat room, users can exchange messages with other participants in real-time.

### Profile Viewing
- Users can view their profile details and update them if needed.
- Navigate to the profile section to view and manage your profile.

### Logout
- Click the "Logout" button to securely log out of your account.

