import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // ✅ Toggle a task’s done state
  function toggleTask(id) {
    onMutateCourse(index, (tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  // ✅ Delete a task
  function deleteTask(id) {
    onMutateCourse(index, (tasks) =>
      tasks.filter((t) => t.id !== id)
    );
  }

  // ✅ Add a new task
  function addTask(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: date,
      done: false,
    };

    onMutateCourse(index, (tasks) => [...tasks, newTask]);
    setTitle("");
    setDate("");
  }

  // ✅ Check if all tasks are done
  const allDone = course.tasks.length > 0 && course.tasks.every((t) => t.done);

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 Show “All caught up” badge when all tasks are done */}
        {allDone && <span className="badge success">All caught up!</span>}
      </header>

      {/* 🟩 Conditional rendering: show message if no tasks */}
      <section className="tasksSection">
        {course.tasks.length === 0 ? (
          <p>No tasks yet. Add your first one below.</p>
        ) : (
          <ul className="tasks">
            {course.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>

      {/* 🧩 Add New Task Form */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">
            Add
          </button>
        </div>
      </form>
    </article>
  );
}
