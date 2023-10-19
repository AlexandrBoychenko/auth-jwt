## auth-jwt
This is a [Next.js](https://nextjs.org/) project with Tailwind CSS and Shadcn UI. The main purpose it's to expose JWT authentication with server and client parts with user friendly UI 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You'll see an abstract site page with Login button, after its clicked login page is opened.

**The only correct credentials**
username: test-name 
password: password1234**

If the login form filled with correct data and Login button is ckicked user redirects to the dashboard mock page. If it's not correct, an appropriate upper error message is shown. Fields cannot be empty, in this case basic validation blocks login form submit.
JWT authorization is working on server-side using POST request and it's handled on client with token stored in session cookies.
User may logout from an Logout button on the dashboard page, in this way the JWT token removed and user redirects to Login page.

If user tries to open Login page during the valid JWT session the main page is opened with a new message about its status.
In case if user intends to go to any page that requires authentication he redirects to login page with stored previous path that should be opened after login is finished well.
