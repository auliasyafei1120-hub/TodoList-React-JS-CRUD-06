import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { task, priority, status };
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTask("");
    setPriority("Medium");
    setStatus("To Do");
  };

  const editTask = (index) => {
    const t = tasks[index];
    setTask(t.task);
    setPriority(t.priority);
    setStatus(t.status);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <h3 className="text-center mb-4 fw-bold">📝 Task List Tugas Teknologi Informasi</h3>

        {/* Input Form */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button className="btn btn-primary" onClick={addTask}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task List */}
        {tasks.map((t, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
          >
            <div>
              <strong>{t.task}</strong>
              <div className="text-muted small">
                Priority:{" "}
                <span
                  style={{
                    color:
                      t.priority === "High"
                        ? "red"
                        : t.priority === "Medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  {t.priority}
                </span>{" "}
                | Status: {t.status}
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editTask(i)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
