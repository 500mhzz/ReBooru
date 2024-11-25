# NOTE: REBOORU IS STILL IN ALPHA! SO STUFF MAY **NOT** WORK AS INTENDED OR MAY BE SLOW TO WORK.

# ReBooru

ReBooru is a modern, fast, and sleek booru-style image board inspired by platforms like Rule34, e621, and Danbooru. Unlike these older platforms that rely on outdated technologies like PHP, JQuery, ReBooru uses modern web tech to give you a blazing fast user experience.

## Features

- **Modern UI**: A clean and responsive user interface built with Svelte and Tailwind CSS.
- **High Performance**: Optimized for speed and efficiency using Vite and SvelteKit.
- **Responsive Design**: Fully responsive layout that works seamlessly on both desktop and mobile devices.
- **Advanced Search**: Powerful search capabilities to quickly find the content you're looking for.
- **Lazy Loading**: Efficient image loading to improve performance and user experience.

## ReBooru Development Checklist

### Features

| Task | Status |
|------|--------|
| Base colors and components | ✅ |
| Responsive Design for both desktop and mobile devices | [ ] |
| Advanced Search functionality | [ ] |
| User Interactions (like, bookmark, comment on posts) | [ ] |
| Lazy Loading for images | ✅ |

### Components

| Task | Status |
|------|--------|
| Header Component | ✅ |
| Footer Component | [ ] |
| Post Component | ✅ |
| Search Component | [ ] |
| User Profile Component | [ ] |
| Comment Section Component | [ ] |

### Pages

| Task | Status |
|------|--------|
| Home Page | ✅ |
| Search Results Page | [ ] |
| Post Detail Page | ✅ |
| User Profile Page | [ ] |
| Login/Signup Page | ✅ |

### Backend

| Task | Status |
|------|--------|
| API Integration for fetching posts | ✅ |
| User Authentication | ✅ |
| Database setup for storing user data and posts | ✅ |

### Testing

| Task | Status |
|------|--------|
| Unit Tests for components | [ ] |
| Integration Tests for API | [ ] |
| End-to-End Tests for user flows | [ ] |

### Documentation

| Task | Status |
|------|--------|
| Project Setup Guide | ✅ |
| Contribution Guidelines | [ ] |
| API Documentation | [ ] |

### Deployment

| Task | Status |
|------|--------|
| Setup CI/CD pipeline | [ ] |
| Deploy to production environment | [ ] |
| Monitor performance and errors | [ ] |

### Miscellaneous

| Task | Status |
|------|--------|
| SEO Optimization | [ ] |
| Accessibility Improvements | [ ] |
| Performance Tuning | [ ] |

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [bun](https://bun.sh) (version 1 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/500mhzz/reBooru.git
    cd rebooru
    ```

2. Install dependencies:

    ```bash
    bun install
    ```
   
## How to setup AppWrite
1. Create an account on [AppWrite](https://appwrite.io/)
2. Create a new project and copy the project ID
3. Create a new API key with the needed perms and copy the key
4. Create a new Database (call it whatever you want) and copy its ID.

### Collection Setup
- User Collection
   - username: string - Required
   - ip: IP - Required
   - avatar: URL - Required
   - description: string - Required
   - premium: boolean - Default False
   - createdAt: DateTime - Required
   - following: relation with `Following` Collection
   - followers: relation with `Followers` Collection
   - viewed: relation with `Viewed` Collection


- Following Collection
   - user: relation with `User` Collection (Many to One) (Two Way Relation)
   - followingUser: relation with `User` Collection (One to Many) (One Way Relation)


- Followers Collection
   - user: relation with `User` Collection (Many to One) (Two Way Relation)
   - follower: relation with `User` Collection (One to Many) (One Way Relation)


- Viewed Collection
   - user: relation with `User` Collection (Many to One) (Two Way Relation)
   - post: relation with `Post` Collection (Many to One) (Two Way Relation)

- Tags Collection
   - name: string - Required
   - post: relation with `Post` Collection (in next step)
  

- Comments Collection
   - content: string - Required
   - user: relation with `User` Collection (Many to One) (Two Way Relation)
   - post: relation with `Post` Collection
   - createdAt: DateTime - Required


- Post Collection
   - content: string - Required
   - tags: Relation with `Tags` Collection (Many to Many) (Two Way Relation)
   - image: URL - Required (Array)
   - user: relation with `User` Collection
   - createdAt: DateTime - Required
   - likes: relation with `Likes` Collection (Many to Many)
   - dislikes: relation with `Dislikes` Collection (Many to Many)
   - comments: relation with `Comments` Collection (One to Many) (Two Way Relation)

> Make sure to copy the IDs to each collection and replace them in the `.env` file. Do that with every id you copied.
> 
> Also, make sure to replace the `endpoint` and `project` (project is project ID) in the `.env` file with your own.

### Bucket Setup
- Create a new bucket and copy the ID
  - Users can Create, Read, Update, and Delete files in the bucket.
  - File security is ON.
  - File size limit is 50MB.
  - Add all image, video, and audio MIME types.
- Replace the `bucket` in the `.env` file with the ID you copied.

### Email auth setup (Optional)
- If you want to have email verification add the SMTP settings in the AppWrite dashboard.
- Make the email variable in the `.env` file true.
## Development

To start the development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```