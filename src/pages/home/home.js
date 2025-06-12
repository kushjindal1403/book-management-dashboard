import { useEffect, useState } from "react";
import { StickyNavbar } from "./components/navbar/navbar";
import BookList from "./components/books/booksList";
import { Route, Routes } from "react-router-dom";
import BookForm from "./pages/form/form";
import { getBooks } from "./api/api";

export default function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <StickyNavbar search={search} setSearch={setSearch} />
      {loading ? (
        <div className="text-center mt-10 text-xl">Loading books...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                search={search}
              />
            }
          />
          <Route path="/form" element={<BookForm setBooks={setBooks} />} />
          <Route
            path="/form/:id"
            element={<BookForm books={books} setBooks={setBooks} />}
          />
        </Routes>
      )}
    </>
  );
}
