import { useEffect, useState ,useRef} from "react";
import { jwtDecode } from "jwt-decode";
import API from "../service/api";

import Navbar from "../Navbar-Components/Navbar";
import ProjectSection from "../ProjectSection-Components/ProjectSection";
import TaskSection from "../TaskSection-Components/TaskSection";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const formRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [deadline,setDeadline]=useState("");

  const fetchAll = async () => {
    const [taskRes, projRes, userRes] = await Promise.all([
      API.get("/tasks"),
      API.get("/projects"),
      API.get("/users"),
    ]);

    setTasks(taskRes.data);
    setProjects(projRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token.split(".").length !==3) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }
    fetchAll();
  }, []);

  const saveTask = async () => {

if (!title.trim() || !description.trim()) {
    alert("Title and Description are required");
    return;
  }

  if (!selectedProjectId) {
    alert("Please select a project");
    return;
  }
  if (!selectedUserId) {
    alert("Please select a user");
    return;
  }
  if (editingTaskId) {
    await API.put(`/tasks/${editingTaskId}`, {
      title,
      description,
      status: "pending",
      project: selectedProjectId ? { id: selectedProjectId } : null,
      assignedTo: selectedUserId ? { id: selectedUserId } : null,
      deadline : deadline || null,
    });
  } else {
    // CREATE
    await API.post("/tasks", {
      title,
      description,
      status: "pending",
      project: selectedProjectId ? { id: selectedProjectId } : null,
      assignedTo: selectedUserId ? { id: selectedUserId } : null,
      
    });
  }

  // reset form
  setTitle("");
  setDescription("");
  setSelectedProjectId("");
  setSelectedUserId("");
  setEditingTaskId(null);

  fetchAll();
};
  const updateStatus = async (id) => {
    await API.put(`/tasks/${id}/status?status=completed`);
    fetchAll();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchAll();
  };

  const createProject = async () => {
    if (!projectName) return;

    await API.post("/projects", {
      name: projectName,
      description: "From UI",
    });

    setProjectName("");
    fetchAll();
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchAll();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
 const handleEdit = (task) => {
  setTitle(task.title);
  setDescription(task.description);
  setSelectedProjectId(task.project?.id || "");
  setSelectedUserId(task.assignedTo?.id || "");
  setEditingTaskId(task.id);
  setDeadline(task.deadline ? task.deadline.substring(0,10) : "");

  formRef.current?.scrollIntoView({ behavior: "smooth" });
};
  // Decode user
  let userEmail = "";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      userEmail = jwtDecode(token).sub;
    }
  } catch {}

  return (
    <div className="container mt-4">
      <Navbar userEmail={userEmail} logout={logout} />

      <div className="row">
        <ProjectSection
          projectName={projectName}
          setProjectName={setProjectName}
          createProject={createProject}
          projects={projects}
          deleteProject={deleteProject}
        />

        <TaskSection
          projects={projects}
          users={users}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tasks={tasks}
          deadline={deadline}
          setDeadline={setDeadline}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
          saveTask={saveTask}
editingTaskId={editingTaskId}
onEdit={handleEdit}

formRef={formRef}
        />
      </div>
    </div>
  );
}

export default Dashboard;