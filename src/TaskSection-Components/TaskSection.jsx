import TaskItem from "../TaskItem-Components/TaskItem";

function TaskSection({
  projects,
  users,
  selectedProjectId,
  setSelectedProjectId,
  selectedUserId,
  setSelectedUserId,
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  saveTask,
  editingTaskId,
  onEdit,
  tasks,
  updateStatus,
  deleteTask,
  formRef,
}) {
  return (
    <div className="col-md-8 " ref={formRef}>
      {/* Project Dropdown */}
      <select
        className="form-control mb-2"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* User Dropdown */}
      <select
        className="form-control mb-2"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <h4>Create Task</h4>

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="text-start d-block mt-1">Select Deadline</label>
      <input
        type="date"
        className="form-control mb-2"
        value={deadline || ""}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={saveTask}>
        {editingTaskId ? "Update Task" : "Add Task"}
      </button>

      <h4>Task List</h4>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskSection;
