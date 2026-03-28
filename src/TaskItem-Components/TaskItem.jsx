import { FaCheck, FaTrash } from "react-icons/fa";

function TaskItem({ task, updateStatus, deleteTask, onEdit }) {
  const getDeadlineStatus = (task) => {
    if (task.status === "completed") return "Done";

    if (!task.deadline) return "No deadline";

    const today = new Date().toISOString().split("T")[0];

    if (task.deadline < today) return "Overdue";
    if (task.deadline === today) return "Today";
    if(task.deadline>today) return "Upcoming";
  };
  const deadlineStatus = getDeadlineStatus(task);
  return (
    <div className="card mb-3 p-3 w-100">
      <h5 className="fw-bold"
        style={{
          textDecoration: task.status === "complete" ? "line-through" : "non",
        }}
      >
        {task.title}
      </h5>
      <p>{task.description}</p>

      <p className="mb-1">Project: {task.project?.name || "No Project"}</p>
      <p className="mb-1">Assigned To: {task.assignedTo?.name || "Not Assigned"}</p>

      <p className="mb-1">
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
      <p>Deadline: {task.deadline ? task.deadline : "No deadline"}</p>

      <p>
        Deadline Status:{" "}
        <span
          className={
            deadlineStatus === "Overdue"
              ? "text-danger"
              : deadlineStatus === "Today"
                ? "text-warning"
                : deadlineStatus === "Upcoming"
                  ? "text-success"
                  : "text-primary"
          }
        >
          {deadlineStatus}
        </span>
      </p>
      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-success flex-fill "
          onClick={() => updateStatus(task.id)}
        >
          <FaCheck /> Complete
        </button>
        <button className="btn btn-warning flex-fill" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="btn btn-danger flex-fill" onClick={() => deleteTask(task.id)}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
