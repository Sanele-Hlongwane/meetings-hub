<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .card {
            width: 250px;
            height: 250px;
            perspective: 1000px;
            margin: 0 auto;
            position: relative;
            cursor: pointer;
        }

        .card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .card:hover .card-inner {
            transform: rotateY(180deg);
        }

        .card-front, .card-back {
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
        }

        .card-front {
            background: url('./public/EaglesRingLogo.png') no-repeat center center;
            background-size: cover;
        }

        .card-back {
            background: #282828; /* Dark background for contrast */
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotateY(180deg);
            overflow: hidden;
            position: relative;
        }

        .card-back p {
            position: absolute;
            white-space: nowrap;
            margin: 0;
            animation: moveText 3s infinite;
        }

        @keyframes moveText {
            0% { transform: translate(0, 0); }
            50% { transform: translate(30px, -30px); }
            100% { transform: translate(0, 0); }
        }
    </style>
</head>
<body>
    <div align="center">
        <div class="card" onclick="window.open('https://www.youtube.com/@TechInvaders-bv5kv', '_blank')">
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <p>Click to watch YouTube videos</p>
                </div>
            </div>
        </div>
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
        <br />
        <h1 align="center">Eagles Ring</h1>
        <div align="center">
            Dive into Eagles Ring, an innovative platform that connects aspiring entrepreneurs with seasoned investors. Present your business model to the "Eagles" and secure funding for your ideas.
        </div>
        <br />
        <h2>📋 <a name="table">Table of Contents</a></h2>
        <ol>
            <li>🤖 <a href="#introduction">Introduction</a></li>
            <li>⚙️ <a href="#tech-stack">Tech Stack</a></li>
            <li>🔋 <a href="#features">Features</a></li>
            <li>🤸 <a href="#quick-start">Quick Start</a></li>
            <li>🛠️ <a href="#installation">Installation</a></li>
            <li>⚙️ <a href="#setup">Setup</a></li>
            <li>🕸️ <a href="#assets-and-code">Assets & Code</a></li>
            <li>🚀 <a href="#more">More</a></li>
        </ol>
        <br />
        <h2 id="introduction">🤖 Introduction</h2>
        <p>
            Eagles Ring is an investment platform that matches aspiring entrepreneurs from around the world with investment opportunities. Entrepreneurs are invited to pitch their business models in front of a carefully curated panel of highly esteemed local and international business moguls, known as the “Eagles.” The Eagles are able and willing to invest their own money as well as time in bankrolling potentially lucrative business solutions. Inside the Ring, the Eagles get to spar for the best investment opportunity. The trick is to share a compelling story that will convince these highly experienced Eagles that your solution is a worthwhile investment opportunity.
        </p>
        <h2 id="tech-stack">⚙️ Tech Stack</h2>
        <ul>
            <li><strong>Frontend</strong>: <a href="https://nextjs.org/">Next.js</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>
                <ul>
                    <li>Next.js provides the framework for server-side rendering and static site generation.</li>
                    <li>Tailwind CSS is used for utility-first CSS styling, ensuring a responsive and modern UI.</li>
                </ul>
            </li>
            <li><strong>Backend</strong>: <a href="https://nodejs.org/">Node.js</a>, <a href="https://www.prisma.io/">Prisma</a>
                <ul>
                    <li>Node.js serves as the runtime environment for server-side JavaScript.</li>
                    <li>Prisma is used as the ORM for type-safe database access and migrations.</li>
                </ul>
            </li>
            <li><strong>Database</strong>: <a href="https://neon.tech/">Neon PostgreSQL</a>
                <ul>
                    <li>Neon PostgreSQL is a highly scalable, fully managed PostgreSQL database service.</li>
                </ul>
            </li>
            <li><strong>Authentication</strong>: <a href="https://clerk.dev/">Clerk</a>
                <ul>
                    <li>Clerk provides user management and authentication services, including OAuth, passwordless login, and social sign-ins.</li>
                </ul>
            </li>
            <li><strong>Messaging & File Sharing</strong>: Custom Implementation
                <ul>
                    <li>Custom solutions are implemented for secure and efficient messaging and file sharing between users.</li>
                </ul>
            </li>
            <li><strong>Video Calling</strong>: <a href="https://getstream.io/">GetStream</a>
                <ul>
                    <li>GetStream is used for real-time video calling and streaming services.</li>
                </ul>
            </li>
        </ul>
        <h2 id="features">🔋 Features</h2>
        <ul>
            <li><strong>Investor and Entrepreneur Registration</strong>: Secure and seamless sign-up and login processes using Clerk.</li>
            <li><strong>Profile Management</strong>: Entrepreneurs and investors can manage their profiles, including bio, contact information, and more.
                <ul>
                    <li>Edit and update personal information, business details, and investment preferences.</li>
                </ul>
            </li>
            <li><strong>Pitch Submission</strong>: Entrepreneurs can submit their business pitches to be reviewed by investors.
                <ul>
                    <li>Upload pitch decks, business plans, and other supporting documents.</li>
                </ul>
            </li>
            <li><strong>Investment Opportunities</strong>: Investors can view and evaluate submitted pitches.
                <ul>
                    <li>Access detailed information about each pitch and express interest in funding.</li>
                </ul>
            </li>
            <li><strong>Real-time Communication</strong>: Integrated chat and video call features for effective communication.
                <ul>
                    <li>Discuss pitch details and negotiate investment terms via real-time messaging and video calls.</li>
                </ul>
            </li>
        </ul>
        <h2 id="quick-start">🤸 Quick Start</h2>
        <ol>
            <li>Clone the repository: <code>git clone https://github.com/your-repository/eagles-ring.git</code></li>
            <li>Navigate to the project directory: <code>cd eagles-ring</code></li>
            <li>Install dependencies: <code>npm install</code></li>
            <li>Set up environment variables: <code>cp .env.example .env</code> and configure accordingly.</li>
            <li>Run the development server: <code>npm run dev</code></li>
            <li>Open your browser and navigate to <code>http://localhost:3000</code> to view the application.</li>
        </ol>
        <h2 id="installation">🛠️ Installation</h2>
        <ol>
            <li>Ensure you have Node.js and npm installed on your machine.</li>
            <li>Clone the repository: <code>git clone https://github.com/your-repository/eagles-ring.git</code></li>
            <li>Navigate to the project directory: <code>cd eagles-ring</code></li>
            <li>Install dependencies: <code>npm install</code></li>
            <li>Set up your environment variables by copying the example configuration: <code>cp .env.example .env</code></li>
            <li>Run migrations: <code>npx prisma migrate dev</code></li>
            <li>Start the development server: <code>npm run dev</code></li>
        </ol>
        <h2 id="setup">⚙️ Setup</h2>
        <p>Follow the setup instructions in the <code>docs/SETUP.md</code> file for detailed configuration steps.</p>
        <h2 id="assets-and-code">🕸️ Assets & Code</h2>
        <p>Find the project assets, including images and stylesheets, in the <code>public</code> directory. The main application code is located in the <code>src</code> directory.</p>
        <h2 id="more">🚀 More</h2>
        <ul>
            <li>Check out the <a href="https://docs.eaglesring.io">documentation</a> for more details.</li>
            <li>Contribute to the project on <a href="https://github.com/your-repository/eagles-ring">GitHub</a>.</li>
        </ul>
    </div>
</body>
</html>
