function ProjectSection({
  projectName,
  setProjectName,
  createProject,
  projects,
  deleteProject,
}) {
  return (
    <div className="col-md-4">
      <h4>Create Project</h4>

      <input
        className="form-control mb-2"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={createProject} disabled={!projectName.trim()}>
        Add Project
      </button>

      <h4>Projects</h4>

      {projects.map((p) => (
        <div key={p.id} className="card p-2 mb-2">
          <h6>{p.name}</h6>
          <small>{p.description}</small>

          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={() => deleteProject(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProjectSection;