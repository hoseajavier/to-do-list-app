import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todoApi";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTodos({ page, filter, search });
      setTodos(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      setError("Gagal mengambil data todo. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    setError(null);
    try {
      await addTodo({ title });
      setPage(1);
      fetchTodos();
    } catch {
      setError("Gagal menambahkan todo. Periksa koneksi Anda.");
    }
  };

  const handleToggle = async (id, completed) => {
    setError(null);
    try {
      const res = await updateTodo(id, { completed });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch {
      setError("Gagal mengubah status todo.");
    }
  };

  const handleEdit = async (id, title) => {
    setError(null);
    try {
      const res = await updateTodo(id, { title });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch {
      setError("Gagal mengedit todo.");
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch {
      setError("Gagal menghapus todo.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, filter, search]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 To-Do List</h1>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Cari todo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">Semua</option>
            <option value="completed">Selesai</option>
            <option value="pending">Belum Selesai</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Form */}
        <TodoForm onAdd={handleAdd} />

        {/* Loading Indicator atau List */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-blue-500 text-sm sm:text-base">
              Memuat data...
            </span>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-600 text-sm sm:text-base">
            Page {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
