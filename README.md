## Habit Tracker
A habit tracker app with the calculation of streak (daily & weekly).

## Project Setup

### Prerequisites:
- Node.js and `npm` installed.

### Installation:


1. Clone the repository:

```bash
git clone https://github.com/your-username/newu-streakassignment.git
```
2. Navigate to the project directory:

```bash
cd newu-streakassignment
```
3. Install dependencies:

```bash
npm install
```

## Available Scripts
- **`npm run dev or vite`**: 

    Starts development server with hot module replacement (HMR). Server will be up on  `http://localhost:5173/`

- `npm run build`: 
    
    Builds the application for production.

### Project Structure 
Here is list of main files & directories:
- *src*: Contains source code for the application.
    - *components*: Contains building blocks of the application
    - *hooks*: Custom hooks like `useLocalStorage` and `useTodos`
    - *services*: Services to interact with components i.e., `localStorageService`
    - *state*: Application global states
    - *types*: Interfaces & Types
    - *`App.tsx`*: Main starting point of application  
- *public*: Static assets like images and index.html.
- *package.json*: Project dependencies and scripts.
- *tsconfig.json*: TypeScript configuration.


### Technologies Used
- **Vite**: Build tool for fast development and production builds.
- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
