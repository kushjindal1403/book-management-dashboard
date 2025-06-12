const API_URL = "http://localhost:3001/books";

export const getBooks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch books");
  return await res.json();
};

export const getBookById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Book not found");
  return await res.json();
};

export const addBook = async (book) => {
  const res = await fetch("http://localhost:3001/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
};


export const updateBook = async (id, updatedBook) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return await res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return true;
};
