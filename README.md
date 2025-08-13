# 🎥 YouTube Clone

A full-stack YouTube clone application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that replicates core YouTube functionalities.

## 🌐 Live Demo

[View Live Demo](https://your-youtube-clone.vercel.app) • [View GitHub Repository](https://github.com/yourusername/youtube-clone)

## ✨ Features

### User Management
- 🔐 User authentication (Register/Login)
- 🔑 Google OAuth integration
- 👤 User profile management
- 🎨 Customizable user avatars

### Channel Features
- ✍️ Create and manage channels
- 📝 Edit channel details
- 🎯 Channel analytics
- 👥 Subscribe/Unsubscribe functionality

### Video Features
- 📤 Upload videos
- 🎬 Video playback
- 📊 View count tracking
- 👍 Like/Dislike functionality
- 💬 Comment system
- 🏷️ Category-based filtering
- 🔍 Search functionality

### UI/UX Features
- 📱 Fully responsive design
- 🌙 Intuitive user interface
- ⚡ Fast loading times
- 🎯 Category-based navigation
- 🔄 Real-time updates

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 🔄 Redux Toolkit
- 🛣️ React Router
- 📦 Vite

### Backend
- 🖥️ Node.js
- 🚂 Express.js
- 🗄️ MongoDB
- 🔐 JWT Authentication
- 📦 Mongoose

### Additional Tools
- 🔄 Git & GitHub
- 📦 npm
- 🎨 Shadcn UI
- 🖼️ React Icons

## 📥 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-clone.git
   cd youtube-clone
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   
   Create .env files in both client and server directories:

   Client (.env):
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

   Server (.env):
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

4. **Start the development servers**

   In the client directory:
   ```bash
   npm run dev
   ```

   In the server directory:
   ```bash
   npm run dev
   ```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens
- 📺 Large screens

## 🔐 Authentication Flow

1. Traditional email/password registration and login
2. Google OAuth integration
3. JWT-based authentication
4. Secure cookie handling
5. Protected routes implementation

## 🎯 Core Functionalities

### Video Management
- Upload with progress tracking
- Automatic thumbnail generation
- Video processing
- View count tracking
- Like/Dislike system

### User Interaction
- Comment system
- Real-time notifications
- Channel subscriptions
- Video sharing

### Search & Discovery
- Video search
- Category filtering
- Trending videos section
- Recommended videos

## 🔄 State Management

- Redux Toolkit for global state
- Context API for theme and sidebar state
- Local storage for user preferences
- JWT for authentication state

## 🔜 Upcoming Features

- [ ] Video quality selection
- [ ] Playlist creation
- [ ] Watch later functionality
- [ ] Video download option
- [ ] Dark mode toggle

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Your Name** - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspiration from YouTube
- Icons from React Icons
- UI Components from Shadcn UI
- All contributors and supporters

---
Made with ❤️ and JavaScript
