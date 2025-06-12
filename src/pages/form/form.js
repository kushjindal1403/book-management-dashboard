import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { updateBook, addBook } from "../../api/api";

export default function BookForm({ books = [], setBooks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    year: "",
    status: "Available",
    image: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isEditMode && books.length > 0) {
      const found = books.find((b) => b.id === id);
      if (found) {
        setBook(found);
      }
    }
  }, [id, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));

    if (isEditMode && name === "title" && value.trim()) {
      const filtered = books.filter(
        (b) =>
          b.title.toLowerCase().includes(value.toLowerCase()) &&
          b.id !== id
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedBook) => {
    setBook(selectedBook);
    setSuggestions([]);
    navigate(`/form/${selectedBook.id}`); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        console.log("Updating book with ID:", book.id);
        await updateBook(book.id, book);
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? book : b))
        );
      } else {
        const newBook = { ...book, id: uuidv4() };
        const created = await addBook(newBook);
        setBooks((prevBooks) => [...prevBooks, created]);
      }

      navigate("/");
    } catch (err) {
      console.error("Error submitting book:", err.message);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Card className="max-w-xl mx-auto mt-10 p-6">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        {isEditMode ? "Edit Book" : "Add New Book"}
      </Typography>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="relative">
            <Input
              label="Title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
            {isEditMode && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto text-sm shadow">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <Input
            label="Genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
          <Input
            label="Published Year"
            name="year"
            type="number"
            value={book.year}
            onChange={handleChange}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            label="Upload Image"
          />
          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm text-gray-700"
          >
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
          <Button type="submit" color="blue">
            {isEditMode ? "Update Book" : "Add Book"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}


