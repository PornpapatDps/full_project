# Frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```



 Backend
        📌 เทคโนโลยีที่ใช้
        Framework 
            สำหรับสร้าง API: Express.js
            ORM สำหรับจัดการฐานข้อมูล: Prisma
            
        เครื่องมือที่ใช้ในระบบ:
            Editor & IDE: VS Code
            เครื่องมือดูและจัดการฐานข้อมูล: DBVear
            ระบบควบคุมเวอร์ชัน: Git
            เครื่องมือทดสอบ API: Postman
            เครื่องมือ Debug และ Monitor: Nodemon, Node.js, Prisma

        📌 คำสั่งติดตั้ง
            ```sh
            cd backend  # เข้าไปยังโฟลเดอร์ Frontend
            npx nodemon -y  # ติดตั้ง Nodemon
            npx node -y  # ติดตั้ง Node.js
            npx git -y  # ติดตั้ง Git
            npx prisma db pull  # ดึงข้อมูลโครงสร้างจากฐานข้อมูล
            npx prisma generate  # สร้าง Client ของ Prisma
            npx prisma migrate dev --name update_customers_schema  # สร้าง Migration
            npx nodemon no start  # เริ่มต้นเซิร์ฟเวอร์ (มีข้อผิดพลาด คำสั่งที่ถูกต้องคือ `npx nodemon start`) 
            ```

############################################################################################################
#############################################################################################################
# 🚀 

https://quasar.dev/start/vite-plugin
https://vuejs.org/guide/quick-start.html

---

## 📌 เทคโนโลยีที่ใช้ในโปรเจค
| หมวดหมู่ | เทคโนโลยีที่ใช้ |
|----------|----------------|
| **Backend** | Express.js (API), Prisma (ORM) |
| **Frontend** | Vue.js 3 + Quasar Framework |
| **Database** | PostgreSQL / MySQL (ใช้ร่วมกับ Prisma) |
| **Tooling** | VS Code, Git, Postman, Nodemon |

---

## ⚙️ การติดตั้งระบบ

### 🛠 **Backend**
1. **ติดตั้ง Node.js & Git**
    ```sh
    npx node -y
    npx git -y
    ```
2. **ตั้งค่า Prisma และฐานข้อมูล**
    ```sh
    npx prisma db pull    # ดึงโครงสร้างฐานข้อมูล
    npx prisma generate   # สร้าง Prisma Client
    npx prisma migrate dev --name update_customers_schema  # สร้าง Migration
    ```
3. **รันเซิร์ฟเวอร์**
    ```sh
    npx nodemon start
    ```

---

### 🎨 **Frontend**
1. **ติดตั้ง Vue.js 3 และ Quasar Framework**
    ```sh
    cd Frontend
    npm create vue@latest
    npm i
    npm install --save quasar @quasar/extras
    npm install --save-dev @quasar/vite-plugin sass-embedded@^1.80.2
    ```
2. **รันเซิร์ฟเวอร์**
    ```sh
    npm run dev
    ```

---

## ❌ แก้ไขปัญหาการติดตั้ง
หากพบปัญหาเกี่ยวกับ `node_modules` หรือ `package-lock.json` สามารถแก้ไขได้โดย:
```sh
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm i
npm run dev
