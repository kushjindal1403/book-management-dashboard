import { useEffect, useState } from "react";
import { BookCard } from "./bookCard";
import { CircularPagination } from "../common/pagination";
import { Select, Option } from "@material-tailwind/react";
import { deleteBook } from "../../api/api";

export default function BookList({ books: initialBooks, search }) {
  const [books, setBooks] = useState(initialBooks);
  const [activePage, setActivePage] = useState(1);
  const [genreFilter, setGenreFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const booksPerPage = 10;

  useEffect(() => {
    setBooks(initialBooks);
    setActivePage(1);
  }, [initialBooks, search]);

  const genres = ["All", ...new Set(books.map((book) => book.genre))];

 const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
    const matchesStatus = statusFilter === "All" || book.status === statusFilter;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (activePage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }
};

  return (
    <div className="px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="md:flex gap-4 [&_div]:pb-2">
          <Select
            label="Filter by Genre"
            value={genreFilter}
            onChange={(val) => {
              setGenreFilter(val);
              setActivePage(1);
            }}
          >
            {genres.map((genre) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>

          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setActivePage(1);
            }}
          >
            <Option value="All">All</Option>
            <Option value="Available">Available</Option>
            <Option value="Issued">Issued</Option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentBooks.map((book, index) => (
          <BookCard
            key={book._id || book.id || index}
            book={book}
            onDelete={() => handleDelete(book._id || book.id)}
          />
        ))}
      </div>

      {filteredBooks.length > booksPerPage && (
        <div className="mt-8 flex justify-center">
          <CircularPagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={(page) => setActivePage(page)}
          />
        </div>
      )}
    </div>
  );
}
