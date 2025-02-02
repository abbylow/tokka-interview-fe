# Transaction Processing Frontend Application

This project provides a frontend application for visualizing transaction data from Uniswap V3 pools, including transaction summaries and filtering options. The frontend communicates with the backend services to display transaction information.


## Features
- View transaction summaries (ETH and USDT fees).
- Search and filter transactions by timestamp and transaction hash.
- Paginated transaction listings.
- Integration with backend RESTful APIs.


## Technologies Used
- **Next.js** with **TypeScript**
- **React Query** for data fetching
- **Docker** for containerization

## Setup

### 1. Clone the Repository
```
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
Create a .env.local file in the root directory and add the required environment variables. Refer to .env.example for guidance.


## Build and Run Instructions
### Development Mode
Start the frontend in development mode with hot-reloading:

```
npm run dev
```

By default, the app should be accessible at:
http://localhost:3000

### Production Build
To build the frontend for production:

```
npm run build
```

The build files will be generated in the dist/ directory.

To run the production build locally:

```
npm run start
```

## Docker Setup
### Step 1: Build Docker Image
```
docker build -t frontend-app:local .
```

### Step 2: Use Docker Compose
The Docker Compose setup is provided in the backend repository:
[tokka-interview-be](https://github.com/abbylow/tokka-interview-be)

After navigating to the backend repository:

Run `docker-compose up -d` to start all backend and frontend services.

Verify that the frontend app is accessible at:
http://localhost:3000

### Step 3: Logs and Monitoring
To observe logs for the frontend Docker container, use:
```
docker logs frontend-app
```