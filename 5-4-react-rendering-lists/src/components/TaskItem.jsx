import DueBadge from "./DueBadge";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task" key={task.id}>
      <label className="taskMain">
        {/* ✅ Checkbox — toggles task done state */}
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        {/* ✅ Show DueBadge only if task is NOT done */}
        {!task.done && <DueBadge dueDate={task.dueDate} />}

        {/* ✅ Task title */}
        <span className="title">{task.title}</span>
      </label>

      {/* ✅ Delete button */}
      <button
        className="ghost"
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
}
