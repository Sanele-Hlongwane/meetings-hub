<div align="center" backgroundColor='red'>
  <br />
     <a href="https://www.youtube.com/@TechInvaders-bv5kv" target="_blank">
     <img src="./public/EaglesRingLogo.png" alt="Project Banner" style="height: 250px;">
   </a>
  <br />

 <div>
    <img src="https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logoColor=white&logo=javascript&color=F7DF1E" alt="javascript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-GetStream-black?style=for-the-badge&logoColor=white&logo=getstream&color=1E88E5" alt="getstream" />
    <img src="https://img.shields.io/badge/-Neon_PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="neon postgresql" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="node.js" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=3C3C3D" alt="clerk" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Vercel-black?style=for-the-badge&logoColor=white&logo=vercel&color=000000" alt="vercel" />
</div>



  <h1 align="center">Eagles Ring</h1>

   <div align="center">
     Dive into Eagles Ring, an innovative platform that connects aspiring entrepreneurs with seasoned investors. Present your business model to the "Eagles" and secure funding for your ideas.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🛠️ [Installation](#installation)
6. ⚙️ [Setup](#setup)
7. 🕸️ [Assets & Code](#assets-and-code)
8. 🚀 [More](#more)


## <a name="introduction">🤖 Introduction</a>

Eagles Ring is an investment platform that matches aspiring entrepreneurs from around the world with investment opportunities. Entrepreneurs are invited to pitch their business models in front of a carefully curated panel of highly esteemed local and international business moguls, known as the “Eagles.” The Eagles are able and willing to invest their own money as well as time in bankrolling potentially lucrative business solutions. Inside the Ring, the Eagles get to spar for the best investment opportunity. The trick is to share a compelling story that will convince these highly experienced Eagles that your solution is a worthwhile investment opportunity.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
  - Next.js provides the framework for server-side rendering and static site generation.
  - Tailwind CSS is used for utility-first CSS styling, ensuring a responsive and modern UI.
- **Backend**: [Node.js](https://nodejs.org/), [Prisma](https://www.prisma.io/)
  - Node.js serves as the runtime environment for server-side JavaScript.
  - Prisma is used as the ORM for type-safe database access and migrations.
- **Database**: [Neon PostgreSQL](https://neon.tech/)
  - Neon PostgreSQL is a highly scalable, fully managed PostgreSQL database service.
- **Authentication**: [Clerk](https://clerk.dev/)
  - Clerk provides user management and authentication services, including OAuth, passwordless login, and social sign-ins.
- **Messaging & File Sharing**: [Custom Implementation](#custom-implementation)
  - Custom solutions are implemented for secure and efficient messaging and file sharing between users.
- **Video Calling**: [GetStream](https://getstream.io/)
  - GetStream is used for real-time video calling and streaming services.

## <a name="features">🔋 Features</a>

- **Investor and Entrepreneur Registration**: Secure and seamless sign-up and login processes using Clerk.
- **Profile Management**: Entrepreneurs and investors can manage their profiles, including bio, contact information, and more.
  - Edit and update personal information, business details, and investment preferences.
- **Pitch Submission**: Entrepreneurs can submit their business pitches to be reviewed by investors.
  - Upload pitch decks, business plans, and other supporting documents.
- **Investment Opportunities**: Investors can browse and review various business pitches.
  - Filter and search for pitches based on industry, funding stage, and other criteria.
- **Messaging**: Secure messaging between users to discuss investment opportunities.
  - Real-time chat, group discussions, and private messaging.
- **File Sharing**: Easy sharing of relevant documents and files between users.
  - Secure upload, download, and management of files.
- **Notifications**: Real-time notifications for pitch updates and messages.
  - Stay updated on new messages, pitch status changes, and other important events.
- **Video Meetings**: Users can create and join video meetings.
  - Schedule and conduct virtual meetings with video and audio.
- **Dashboard Analytics**: Comprehensive dashboard for monitoring and analytics.
  - Visualize investment trends, pitch performance, and user engagement metrics.
- **Role-Based Access Control**: Different access levels for entrepreneurs, investors, and admins.
  - Ensure appropriate permissions and access to various features based on user roles.


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to get started with the project:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sanele-Hlongwane/eaglesring.git
   cd eaglesring

2. **See deployment**
   <div><link>https://eaglesring.vercel.app</link></div>
  
## <a name="install">🛠️ Installation</a>
1. **Delete package-lock.json file and node_modules folder**
2. **Install the project dependencies using npm:**
  ```
    npm install
  ```
or
  ```
    yarn add
  ```
## <a name="setup">⚙️ Setup</a>
3. **Set Up Environment Variables**

Create a new file named .env in the root of your project and add the following content:
```
  
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  CLERK_WEBHOOK_SECRET=

  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  
  NEXT_PUBLIC_STREAM_API_KEY=
  STREAM_SECRET_KEY=
  
  DATABASE_URL=
```
**Replace the placeholder values with your actual Clerk, getstream, and Prisma (Neon Database) credentials. You can obtain these credentials by signing up on the respective websites.**

4. **Running the Project**
```bash
npm run dev 
```
or
  ```
  yarn dev
  ```
5. **Open http://localhost:3000 in your browser to view the project.**
 <div align="center">
<a name="snippets">🕸️ Assets & Code</a>
<details>
<summary><code>app/globals.css</code></summary>

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</details>
<details>
<summary><code>tailwind.config.ts</code></summary>
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
</div>
## <a name="more">🚀 More</a>

For more details on how to contribute to this project, report issues, or request features, please visit the GitHub repository or contact Sanele Hlongwane 0603179552/sanelehlongwane61@gmail.com .
Happy coding!

NB: Production of this app is prohibited
