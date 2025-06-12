import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

export function BookCard({ book, onDelete }) {
  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this book?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await onDelete(book._id);
              toast.success("Book deleted successfully");
            } catch (error) {
              toast.error("Failed to delete the book");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <Card className=" shadow-lg">
      <CardHeader floated={false} className="h-64">
        <img
          src={book.image}
          alt="book-cover"
          className="h-full w-full object-contain"
        />
      </CardHeader>
      <CardBody className="text-left space-y-2">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          {book.title}
        </Typography>
        <Typography color="gray" className="text-sm">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography color="gray" className="text-sm">
          <strong>Genre:</strong> {book.genre}
        </Typography>
        <Typography color="gray" className="text-sm">
          <strong>Published:</strong> {book.year}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between items-center pt-0">
        <Chip
          value={book.status}
          color={book.status === "Available" ? "green" : "red"}
          size="sm"
        />
        <Button
          variant="outlined"
          color="red"
          size="sm"
          onClick={handleDelete}
          className="flex items-center gap-1"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}