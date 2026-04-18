import { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate=useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [deadline,setDeadline]=useState("");
  const [successMsg,setSuccessMsg]=useState("");

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

  if (token && token.split(".").length === 3) {
    fetchAll();
  }
}, []);

  const saveTask = async () => {

    const token=localStorage.getItem("token");
    if(!token){
    alert("Please login first");
    //navigate("/login");
    return;
  }


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
    setSuccessMsg("Task updated successfully");
  } else {

    // CREATE
    await API.post("/tasks", {
      title,
      description,
      status: "pending",
      deadline: deadline || null,
      project: selectedProjectId ? { id: selectedProjectId } : null,
      assignedTo: selectedUserId ? { id: selectedUserId } : null,
    });
    setSuccessMsg("Task added successfully");
  }
 setTimeout(()=>setSuccessMsg(""),2000);
  setTitle("");
  setDescription("");
  setSelectedProjectId("");
  setSelectedUserId("");
  setEditingTaskId(null);
  setDeadline("");

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
    const token=localStorage.getItem("token");
    if(!token){
    alert("Please login first");
    //navigate("/login");
    return;
  }
    if (!projectName.trim()){
      alert("Project name is required");
     return;
    }

    await API.post("/projects", {
      name: projectName,
      description: "From UI",
    });

    setProjectName("");
    setSuccessMsg("Project added successfully");
    fetchAll();
    setTimeout(()=>setSuccessMsg(""),2000);
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchAll();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/dashboard");
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

  let userEmail = "";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      userEmail = jwtDecode(token).sub;
    }
  } catch {}
const token = localStorage.getItem("token");
  return (
    <div className="container mt-4">   
<Navbar 
  userEmail={userEmail} 
  logout={logout} 
  isLoggedIn={!!token}
/>
{!localStorage.getItem("token") && (
  <div className="alert alert-warning">
    Please login to use features
  </div>
)}
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
successMsg={successMsg}
setSuccessMsg={setSuccessMsg}
formRef={formRef}
        />
      </div>
    </div>
  );
}

export default Dashboard;