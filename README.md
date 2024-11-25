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

### Development

To start the development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open