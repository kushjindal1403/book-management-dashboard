# 📚 Book Management Dashboard

A modern and responsive web app for managing books using React, TailwindCSS (Material Tailwind), and a mock API. It supports full CRUD operations — add, view, update, and delete books, with search, filters, and pagination.

---

## 🚀 Features

- ✅ Add, edit, delete books
- 🔍 Search by title/author
- 🎯 Filter by genre and status (Available / Issued)
- 📄 Paginated book listing (10 per page)
- 📱 Responsive design using Material Tailwind
- 🧠 Form validation using `react-hook-form`
- 🍞 Toast notifications for actions
- 🔁 API integrated using `fetch` with fallback for errors
- 📸 Image-based UI card layout

---

## 🧰 Tech Stack

- ⚛️ **React.js** (functional components + hooks)
- 💨 **TailwindCSS** with [Material Tailwind](https://www.material-tailwind.com/)
- 🌐 **React Router DOM**
- 🔄 **CRUD API** via [json-server](https://github.com/typicode/json-server) or [crudcrud.com](https://crudcrud.com)
- ✅ **react-hook-form** for form handling
- 🔥 **react-toastify** for alerts
- 🎨 Custom components and reusable style classes

---

## 📁 Folder Structure

src/
├── api/ # API calls (GET, POST, PUT, DELETE)
│ └── api.js
├── components/
│ ├── books/
│ │ ├── BookCard.js
│ │ ├── BookList.js
│ │ └── Form.js
│ └── common/
│ ├── Pagination.js
│ └── StickyNavbar.js
├── styles/
│ └── bookCard.styles.ts # Tailwind class exports
├── App.js
├── index.js

yaml
Copy
Edit

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-management-dashboard.git
cd book-management-dashboard
2. Install dependencies
bash
Copy
Edit
npm install
3. Start mock API (with json-server)
bash
Copy
Edit
npm install -g json-server
json-server --watch db.json --port 3001
Alternatively, replace API URL in api.js with crudcrud.com temporary endpoint.

4. Start the React app
bash
Copy
Edit
npm start
🌐 Available Routes
Path	Description
/	Home - Book listing
/form	Add a new book
/form/:id	Edit existing book

✨ Screenshots



📝 API Format (db.json example)
json
Copy
Edit
{
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "genre": "Programming",
      "year": "2008",
      "image": "https://link.to/image.jpg",
      "status": "Available"
    }
  ]
}
📦 Environment Variables (Optional)
You can configure the API base URL using .env:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:3001/books
Then update api.js to use:

js
Copy
Edit
const API_URL = process.env.REACT_APP_API_URL;
🙌 Acknowledgements
Material Tailwind

react-hook-form

json-server

react-toastify

💡 Future Improvements
Global state using Redux or Context

Dark mode toggle

Upload book cover image

Better form validation and accessibility

Authentication flow

📬 Contact
Made by Kush Jindal — feel free to reach out if you have questions or ideas!
