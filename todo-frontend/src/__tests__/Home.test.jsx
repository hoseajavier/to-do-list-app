import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/Home";
import * as api from "../api/todoApi";

jest.mock("../api/todoApi");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("menampilkan loading saat fetch data", async () => {
    api.getTodos.mockResolvedValueOnce({ data: { data: [] } });

    render(<Home />);
    expect(screen.getByText(/Memuat data.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(api.getTodos).toHaveBeenCalled();
    });
  });

  test("menampilkan list todo dari API", async () => {
    api.getTodos.mockResolvedValueOnce({
      data: {
        data: [
          { id: 1, title: "Belajar React", completed: false },
          { id: 2, title: "Belajar Laravel", completed: true },
        ],
      },
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Belajar React")).toBeInTheDocument();
      expect(screen.getByText("Belajar Laravel")).toBeInTheDocument();
    });
  });

  test("menambahkan todo baru", async () => {
    api.getTodos.mockResolvedValueOnce({ data: { data: [] } }); // load awal
    api.addTodo.mockResolvedValueOnce({
      data: { id: 3, title: "Todo Baru", completed: false },
    });
    api.getTodos.mockResolvedValueOnce({
      data: { data: [{ id: 3, title: "Todo Baru", completed: false }] },
    });

    render(<Home />);

    const addInput = screen.getByPlaceholderText(/Tambah todo.../i);
    await userEvent.type(addInput, "Todo Baru");

    const addButton = screen.getByRole("button", { name: /add/i });
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(api.addTodo).toHaveBeenCalledWith({ title: "Todo Baru" });
      expect(screen.getByText("Todo Baru")).toBeInTheDocument();
    });
  });

  test("menghapus todo", async () => {
    api.getTodos.mockResolvedValueOnce({
      data: { data: [{ id: 1, title: "Test Hapus", completed: false }] },
    });
    api.deleteTodo.mockResolvedValueOnce({});
    api.getTodos.mockResolvedValueOnce({ data: { data: [] } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Test Hapus")).toBeInTheDocument();
    });

    // Klik tombol Delete di item
    await userEvent.click(screen.getByText(/Delete/i));

    // Klik tombol Hapus di modal konfirmasi
    await userEvent.click(screen.getByRole("button", { name: /Hapus/i }));

    await waitFor(() => {
      expect(api.deleteTodo).toHaveBeenCalledWith(1);
      expect(screen.queryByText("Test Hapus")).not.toBeInTheDocument();
    });
  });
});
