import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0)
    return (
      <p className="text-center text-gray-500 py-4 text-sm sm:text-base">
        Belum ada todo.
      </p>
    );

  return (
    <div className="flex flex-col gap-3 w-full">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
