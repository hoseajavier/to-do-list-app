import { useState } from "react";
import { toast } from "react-toastify";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEdit(todo.id, newTitle);
      setIsEditing(false);
      toast.success("Todo berhasil diperbarui!");
    } else {
      toast.error("Judul tidak boleh kosong!");
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
    toast.success("Todo berhasil dihapus!");
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 relative gap-2">
      {/* Checkbox + Title / Edit */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-1 flex-1 rounded"
          />
        ) : (
          <span
            className={`break-words ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 relative">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-500 hover:underline"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>

            <div className="relative">
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>

              {/* Popup konfirmasi */}
              {showConfirm && (
                <div className="absolute top-full sm:top-0 sm:left-full mt-2 sm:mt-0 sm:ml-2 bg-white border border-gray-300 shadow-md rounded p-3 z-10 w-40">
                  <p className="text-sm mb-2">Yakin hapus?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-2 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 px-2 py-1 bg-gray-300 text-sm rounded"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
