# Smart Bookmark App

<div align="center">

**A professional-grade, minimal bookmark manager built with Next.js App Router, featuring Google OAuth and a real-time synchronized database.**

🌐 **Live Demo:**
[https://smartbookmarkapp-jp.vercel.app](https://smartbookmarkapp-jp.vercel.app)

</div>


## Overview

Smart Bookmark App is a modern and efficient solution for managing your web bookmarks. Leveraging the power of the Next.js App Router, it provides a fast and intuitive user experience. Users can securely authenticate using Google OAuth, ensuring their personal bookmarks are protected. The application's core strength lies in its real-time synchronized database, guaranteeing that your bookmarks are always up-to-date across all your devices, offering a seamless and professional bookmarking experience.


- Next.js App Router

- Supabase Authentication (Google OAuth)

- Supabase PostgreSQL Database

- Supabase Realtime subscriptions

- Tailwind CSS

- Deployed on Vercel

Each user can securely log in with Google and manage private bookmarks that sync instantly across multiple tabs and devices.


## Features

-  **Intuitive Bookmark Management**: Easily add, view, and delete your web bookmarks.
-  **Secure Google OAuth Authentication**: Log in securely using your Google account, protecting your personal data.
-  **Real-time Data Synchronization**: All your bookmarks are synchronized in real-time, ensuring consistency across devices.
-  **Responsive User Interface**: Designed to work flawlessly on desktops, tablets, and mobile devices.
-  **High Performance**: Built with Next.js, offering fast page loads and a smooth user experience.
-  **Minimalist & Professional Design**: A clean, uncluttered interface focused on efficiency and ease of use.


## 🗄 Database Design

### Table: `bookmarks`

| Column     | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | uuid      | Primary key           |
| user_id    | uuid      | References auth.users |
| title      | text      | Bookmark title        |
| url        | text      | Bookmark URL          |
| created_at | timestamp | Auto-generated        |

---

### Row Level Security (RLS)

Row Level Security ensures:

* Users can only SELECT their own bookmarks
* Users can only INSERT bookmarks with their user_id
* Users can only DELETE their own bookmarks

Example RLS Policy:

```sql
CREATE POLICY "Users can view their own bookmarks"
ON bookmarks
FOR SELECT
USING (auth.uid() = user_id);
```

This guarantees complete data isolation between users.

---

### Real-Time Functionality

Supabase Realtime is enabled on the `bookmarks` table.

When a bookmark is:

* Inserted
* Deleted
* Updated

All active sessions subscribed to that user's channel receive updates instantly — no page refresh required.


## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend / BaaS

* Supabase

  * Supabase Auth (Google OAuth)
  * Supabase Postgres Database
  * Supabase Realtime
  * Row Level Security (RLS)


## Authentication Flow

Authentication is handled entirely by Supabase.

1. User clicks **Login with Google**
2. Redirected to Google OAuth
3. Google redirects to Supabase callback
4. Supabase creates session
5. User redirected back to app

No email/password authentication is implemented.


## Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
-   **Node.js**: v18.x
-   **npm**: Comes with Node.js

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/JineshPrajapat/Smart_Bookmark_App.git
    cd Smart_Bookmark_App
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory. 
    Then add your Supabase environment variables:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_anon_key
    ```

3. **Setup Supabase**

    1. Create new project at [https://app.supabase.com](https://app.supabase.com)
    2. Go to: Authentication → Providers → Google
    3. Enable Google provider
    4. Add Google OAuth credentials


4. **Setup Google OAuth**

    1. Go to Google Cloud Console
    2. Create OAuth 2.0 Client ID
    3. Add:

        Authorized JavaScript Origin:

        ```
        http://localhost:3000 or deployed live url
        ```

        Authorized Redirect URI:

        ```
        https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
        ```

    4. Copy Client ID + Secret into Supabase Google Provider

6 **Run Development Server**
```bash    
npm run dev
```


## Contact

For any questions, suggestions, or issues, feel free to reach out to the project maintainer:

- **Jinesh Prajapat**  
  📧 prajapatjinesh585@gmail.com  
  🔗 [LinkedIn](https://www.linkedin.com/in/jineshprajapat/)
