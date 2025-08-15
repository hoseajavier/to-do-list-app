import { useState } from "react";
import { toast } from "react-toastify";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Judul todo tidak boleh kosong!");
      return;
    }
    onAdd(title);
    toast.success("Todo berhasil ditambahkan!");
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-4 w-full"
    >
      <input
        type="text"
        placeholder="Tambah todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition w-full sm:w-auto"
      >
        Add
      </button>
    </form>
  );
}
