# Oren Sustainability Dashboard

Welcome to the **Oren Sustainability Dashboard**, a comprehensive platform for tracking and improving environmental impact. Oren provides businesses with data-driven insights to foster sustainability and eco-friendly practices.

### Deployed URLs

- **URL**: [https://sustainanility-dashboard.onrender.com](https://sustainanility-dashboard.onrender.com)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Access Ways](#access-ways)

---

## Project Overview

The Oren Sustainability Dashboard is designed to help companies and organizations track and manage their environmental sustainability metrics. The platform provides insights into energy consumption, waste management, carbon footprint, and other environmental impact metrics, giving businesses the tools to make informed decisions for a greener future.

---

## Features

1. **Login System**:
   - Secure login system for authorized users using email and password.
   - Session-based authentication for enhanced security and user session management.
   - User session management using cookies, ensuring a smoother user experience.

2. **Dashboard Overview**:
   - A dynamic dashboard presenting key sustainability metrics such as energy consumption, waste management, and carbon emissions.
   - Data visualization using graphs and charts for better insights.

3. **User Role**:
   - Only authorized users (Admins) can access the platform.

4. **Data Insights & Reports**:
   - Generate JSON data to track progress over time and compare performance.
   - Downloadable reports in JSON format for external review.

5. **Responsive Design**:
   - Fully responsive design, optimized for both mobile and desktop screens.
   - Flexible layout with side-by-side sections on larger screens and a vertical stack on mobile.

---

## Technologies Used

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Session-based authentication
- **Charts**: Chart.js or any other data visualization library
- **Deployment**: Render (Backend) | Netlify (Frontend)

---

## Screenshots

### 1. **Login Page**
The user can log in using their email and password to access the dashboard.
![image](https://github.com/user-attachments/assets/876d7276-e2ad-445a-a191-33b88baeee1c)


### 2. **Dashboard Overview**
Displays key metrics and data visualizations related to sustainability projects.
![image](https://github.com/user-attachments/assets/fcc18cbf-161e-472b-a1a3-8570cb36a46f)


Same in mobile screen will be:
![image](https://github.com/user-attachments/assets/994921f3-bcfb-4ff4-83ab-62d9ac81240e)


### 3. **Metrics Adding and Comparing with Companies Benchmark**
Users can manage and track various sustainability projects and can compare with the Company Benchmarks.
![image](https://github.com/user-attachments/assets/0d99ec14-1c4c-4be9-920b-b53c0ab69f4c)


### 4. **Export JSON Functionality**

The **Export JSON** feature allows users to download the entire sustainability project data in a structured JSON format. This can be useful for reporting, data analysis, or backups. 

- **How It Works:**
  - The system compiles all relevant project information, including metrics, progress updates, and project details.
  - Users can simply click the **Download JSON** button, and a `.json` file will be generated and downloaded automatically.
  
- **Usage:**
  This feature is accessible from the dashboard, making it easy for users to extract data at any point in time for external analysis or sharing.

![image](https://github.com/user-attachments/assets/c48bbfe9-67d7-45ae-90f9-16e283748a52)


## Access Ways

### Pre-entered Admin Data

To ensure the platform is ready for use after setup, a pre-populate the database with an initial admin account. This allows for immediate access to the dashboard after the first-time deployment without manually entering credentials.

- **Admin Credentials:**
  - **Email:** `admin1@gmail.com`,`admin2@gmail.com`,`admin3@gmail.com`,`admin4@gmail.com`,`admin5@gmail.com`
  - **Password:** `password123`  (`Same For all`)


- **Usage:**
  - After setting up the project, log in with the pre-entered admin credentials to access the full features of the dashboard, including the ability to export JSON data.
  
- **Security:**
  - It is strongly recommended to change the admin password upon the first login to ensure security.




