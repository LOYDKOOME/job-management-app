# job-management-system



                                           ﻿  # job-management-system
##---------------------------------------------- SRucture----------------------------
 job-management-app/
├── backend/   
│   ├── jobs/               # Django app
│   ├── config/             # Project settings
│   ├── manage.py
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API handlers
│   │   ├── pages/          # React pages (Home, Create, Edit)
│   │   ├── App.jsx
│   ├── tailwind.config.js
│   ├── index.html
├── README.md

======================== # 🧰 Job Management Web Application=================

Full-stack job management web application built with:

- **Backend:** Django + Django REST Framework + PostgreSQL  
- **Frontend:** React + Tailwind CSS  
- **Features:** Full CRUD, Soft Delete using `status`, Search, Filtering, Pagination

---

==============================================## 📦 Features=========================

--------------------------### ✅ Backend (Django + DRF)--------------
- Full CRUD operations on job listings
- Soft delete using `status` field (`active`, `inactive`)
- JSON API responses
- PostgreSQL database
- Filtering, searching, and pagination supported

============================### ✅ Frontend (React + Tailwind CSS)=====================================
- Job list view with search, filter, and pagination
- Job creation and editing forms
- Soft delete (deactivate) with UI feedback
- Responsive design with Tailwind CSS

---

===========================================================##  Project Setup================================

###  Prerequisites
instalations:
- Python 3.10+
- Node.js & npm
- PostgreSQL
- Git

---

-----===============================================## Backend Setup (Django + PostgreSQL)==========

------------------ **Clone the Repository**=====================

```bash
git clone https://github.com/your-username/job-management-app.git
cd job-management-app/backend

-------------------------------**Creating Virtual Environment & Install Requirements**-------------------

python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

-----------------------------------------**Seting up PostgreSQL Database**---------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'job_db',
        'USER': 'my_postgres_username',
        'PASSWORD': 'my_postgres_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
                         ================================== ****Run Migrations & Start Server****================================
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
Running API available at: http://127.0.0.1:8000/api/jobs/

                        ===================================   **** Frontend Setup (React + Tailwind)****==============================
cd ../frontend
installed dependancies
Axios
npm install
npm run dev
React app runs at: http://localhost:3000





