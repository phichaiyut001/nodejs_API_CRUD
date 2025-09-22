# 🚀 Node.js API CRUD

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey?logo=express)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

API โปรเจกต์สำหรับ **CRUD (Create, Read, Update, Delete)** พัฒนาด้วย **Node.js + Express**  
รองรับการเชื่อมต่อกับฐานข้อมูล และสามารถนำไปต่อยอดทำ RESTful API ได้ง่ายดาย

---

## 📂 โครงสร้างโปรเจกต์

├── server.js # main server file

├── package.json # project metadata & scripts

├── package-lock.json

├── .gitignore

└── frontend/ # frontend (ถ้ามี)


---

## ⚙️ การติดตั้งและใช้งาน

### 1. Clone Repo
```bash
git clone https://github.com/phichaiyut001/nodejs_API_CRUD.git
cd nodejs_API_CRUD
```
### 2. ติดตั้ง Dependencies
```bash
คัดลอกโค้ด
npm install
```
### 3. ตั้งค่า Environment (ถ้ามี)
```bash
สร้างไฟล์ .env และกำหนดค่า เช่น:
env
คัดลอกโค้ด
PORT=3000
DB_URI=mongodb://localhost:27017/mydb
```
### 4. รันเซิร์ฟเวอร์
```bash
คัดลอกโค้ด
npm start
หรือโหมด dev (ถ้ามี nodemon):
npm run dev
เซิร์ฟเวอร์จะรันที่ 👉 http://localhost:3000
```
###📡 API Endpoints
```bash
Method	Endpoint	Description
GET	/items	ดึงข้อมูลทั้งหมด
POST	/items	เพิ่มข้อมูลใหม่
GET	/items/:id	ดึงข้อมูลตาม ID
PUT	/items/:id	แก้ไขข้อมูลตาม ID
DELETE	/items/:id	ลบข้อมูลตาม ID
```
###🔍 ตัวอย่าง Response
```bash
json
คัดลอกโค้ด
{
  "id": 1,
  "name": "Sample Item",
  "description": "This is a test item"
}
🛠 Tech Stack
Node.js

Express.js

MongoDB (หรือ DB อื่น ๆ ถ้าปรับใช้)

dotenv
---
