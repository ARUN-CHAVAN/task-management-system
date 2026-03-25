import { FaCheck, FaTrash } from "react-icons/fa";

function TaskItem({ task, updateStatus, deleteTask, onEdit }) {
  return (
    <div className="card mb-3 p-3">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <p>Project: {task.project?.name || "No Project"}</p>
      <p>Assigned To: {task.assignedTo?.name || "Not Assigned"}</p>

      <p>
        Status:
        <span
          className={
            task.status === "completed" ? "text-success" : "text-danger"
          }
        >
          {" "}
          {task.status}
        </span>
      </p>
      <p>Deadline : {task.deadline ? task.deadline : "No deadline"}</p>
      <div className="d-flex g-1">
        <button
          className="btn btn-success me-2"
          onClick={() => updateStatus(task.id)}
        >
          <FaCheck /> Complete
        </button>
        <button className="btn btn-warning me-2" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
