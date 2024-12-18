# ROS Log Viewer

ROS Log Viewer is a web-based application designed for visualizing and managing ROS (Robot Operating System) log data. The project provides an intuitive interface to view, search, and analyze log files efficiently.

## Features
- **Log Visualization**: View ROS log files in a structured and user-friendly format.
- **Search and Filter**: Quickly search through logs with keyword filters.
- **Error Highlighting**: Identify errors and warnings in logs with color-coded tags.
- **Real-time Updates**: View log updates in real time as they are generated (if applicable).
- **Customizable Settings**: Adjust themes, filters, and preferences for a tailored experience.

## Technologies Used
- **Frontend**: React and Tailwind CSS (deployed on [vercel](https://ros-log-viewer-as.vercel.app))
- **Backend**: FastAPI (deployed on [render](https://ros-log-viewer-zqf3.onrender.com/))
    - /logs
    - /upload
    - /download

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aayushsiwa/ros-log-viewer.git
   cd ros-log-viewer
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Start the application:
   - **Frontend**:
     ```bash
     cd frontend
     npm start
     ```
   - **Backend**:
     ```bash
     cd backend
     uvicorn main:app --reload
     ```

## Usage
1. Open your browser and navigate to the local development server for the frontend (usually `http://localhost:3000`).
2. Upload your ROS log files or configure the viewer for live streaming logs.
3. Use the search and filter features to analyze logs effectively.

## Deployment
- The backend is already deployed on Vercel at: [https://ros-log-viewer-rougue.vercel.app/](https://ros-log-viewer-rougue.vercel.app/)
- For frontend deployment, configure your preferred hosting service (e.g., Vercel, Netlify) to serve the `frontend` build.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- [Robot Operating System (ROS)](https://www.ros.org/) for enabling robotics development.
- [FastAPI](https://fastapi.tiangolo.com/) for a modern backend framework.
- [React](https://reactjs.org/) for an intuitive frontend development experience.

## Contact
For questions, feedback, or support, please reach out to [Aayush Siwa](https://github.com/aayushsiwa).
