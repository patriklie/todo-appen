# TODOappen

Welcome to TODOappen, a MERN portfolio project where I used MongoDB, Express, React, Node, Render, React Router, Redux, Mongoose, Framer Motion, and a variety of other npm packages and middlewares to create an interactive app (frontend and backend). The app features full CRUD functionality for users, lists, tasks (todos), and profiles.

I created this app because you learn best when you build something yourself! This gave me the opportunity to test my knowledge of all the technologies I’ve learned about and put it into practice in an app.

## Demo
The app is available at:
[www.todoappen.no](http://www.todoappen.no)    
Add it as a Progressive Web App (PWA) on your mobile or test the app directly in your browser.   
**Note: The app takes about 30 seconds to start up after the first request since the server is in sleep mode.**

![Todo Maskotten](client/public/apple-touch-icon-152x152.png)

## Functionality:
- **User authentication:** Register, login, and manage profiles.
- **Task management:** Create, edit, and delete tasks.
- **List functionality:** Organize tasks into custom lists.
- **Profile management:** Update user profile details, profile and banner image.
- **Customize UI:** Dynamically change the app’s color scheme by modifying CSS variables. Choose from 20 AI-generated images to customize the background on the front page.
- **Drag & Drop:** Easily delete lists and toggle the visibility of the bottom toolbar through drag-and-drop interactions.

## Teknologier frontend
- **React**
- **Redux Store**
- **JavaScript (ES6+)**
- **Axios**
- **React Router**
- **CSS Media Queries og CSS Variabler**
- **Google Symbols**
- **flaticons**
- **react lordicons**
- **framer-motion**
- **hamburger-react**
- **react-toastify**

## Teknologier backend
- **bcrypt**
- **cloudinary**
- **cors**
- **dotenv**
- **express**
- **joi**
- **jsonwebtoken**
- **mongoose**
- **mongodb**
- **multer**

## Installation
1. Clone the repository: `git clone https://github.com/patriklie/todo-appen.git`
2. Navigate into both the client and backend folders.
3. Install dependencies with: `npm install` or `npm i`
4. After all dependencies are installed for both frontend and backend, you need to create your own environment files.

5. The backend ENV file must contain:
PORT=5000
MONGODB_URI=
SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
6. The frontend ENV file must contain:
REACT_APP_API_BASE_URL=http://localhost:5000
7. Then start the server locally from the backend folder with "nodemon server.js"
8. Finally, run 'npm start' in the frontend folder.

## Screenshots from the app shown on an iPhone 11:
![Todoappen Bilde 1-4](images/Bilde1_crop.png)

![Todoappen Bilde 5-8](images/Bilde2_crop.png)

![Todoappen Bilde 9-12](images/Bilde3_crop.png)

## Contribution
I am open to contributions. Just create a pull request if you have improvements 🙌
