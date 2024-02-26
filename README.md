# Project Title

This is a React Native project. Here's a brief overview of how to get it running and what you can do with it.

## Getting Started

1. Clone the repository: `git clone https://github.com/cihattasci/id3.git`
2. Navigate into the project directory: `cd id3`
3. Install dependencies: `yarn add`
4. Start the Metro Server: `npm start --reset-cache`
5. Start your application:
   - For Android: `yarn android`
   - For iOS: `yarn ios`

### Logging In

You can login by using default account which is: 
Username: admin@admin.com 
Password: admin1234

### App Features

You can should login to app first. Then add post content that include your texts, ideas and prefered image. And also see the other posts on list screen as dynamic.
I have been used Firebase services. Session is handled by using 'auth' service. For CRUD operations used Firestore. Fetching and store operations handled on firestore. When you want to upload image 'storage' actived! Finally to make dynamic structure for this app using Redux-Toolkit.