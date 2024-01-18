import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [users] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchConsultants();
  }, []);
  const editButtonStyles = {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#28a745', // Green color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '0.5rem', // Add some spacing between buttons
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchConsultants = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      const consultantUsers = data.filter((user) => user.role.id === 2 && user.isapproved === true); // Assuming the role id for "Consultant" is 2
      setConsultants(consultantUsers);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    }
  };
  

  const handleDeleteProject = async (userId, projectId) => {
    try {
      const user = users.find((user) => user.id === userId);
      
      // Check if user and project exist
      if (user && user.project && user.project.id === projectId) {
        await axios.delete(`http://localhost:8080/api/${userId}/deleteProject/${projectId}`);
        
      }
  
      // Delete the project
      await axios.delete(`http://localhost:8080/api/projects/${projectId}`);
      fetchProjects(); // Refresh the project list after deletion
      console.log(`Deleted project with ID ${projectId}`);
    } catch (error) {
      console.error(`Error deleting project with ID ${projectId}:`, error);
    }
  };
  

  
  const handleAssignProject = async () => {
    if (selectedConsultant && selectedProject) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/${selectedConsultant}/addProject/${selectedProject}`,
          {
            method: 'POST',
          }
        );

        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error assigning project:', error);
      }
    }
   
  }
  ;


  return (
    <div style={pageContainer}>
      <h2 style={pageTitle}>Projects</h2>
      <div style={assignSection}>
        <h3 style={sectionTitle}>Assign Project to Consultant</h3>
        <select
          value={selectedConsultant}
          onChange={(e) => setSelectedConsultant(e.target.value)}
          style={selectStyles}
        >
          <option value="">Select Consultant</option>
          {consultants.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          style={selectStyles}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.titre}
            </option>
          ))}
        </select>
        <button onClick={handleAssignProject} style={buttonStyles}>
          Assign Project
        </button>
      </div>
      <div style={projectsList}>
        <h3 style={sectionTitle}>All Projects</h3>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={tableHeaderCellStyles}>Title</th>
              <th style={tableHeaderCellStyles}>File</th>
              <th style={tableHeaderCellStyles}>Description</th>
              <th style={tableHeaderCellStyles}>Client Name</th>
              <th style={tableHeaderCellStyles}>Start Date</th>
              <th style={tableHeaderCellStyles}>End Date</th>
              <th style={tableHeaderCellStyles}>Consultant</th>
              <th style={tableHeaderCellStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project,user) => (
              <tr key={project.id}>
                <td style={tableCellStyles}>{project.titre}</td>
                <td style={tableCellStyles}>{project.fichier_charge}</td>
                <td style={tableCellStyles}>{project.description}</td>
                <td style={tableCellStyles}>{project.nom_client}</td>
                <td style={tableCellStyles}>{project.debut_date}</td>
                <td style={tableCellStyles}>{project.fin_date}</td>
                <td style={tableCellStyles}>{project.user ? project.user.username : '-'}</td>

                <td style={tableCellStyles}>
                  <button
                    onClick={() => handleDeleteProject(user.id,project.id)}
                    style={deleteButton}
                  >
                    Delete
                  </button>
                  <button style={editButtonStyles} >
                  
                  Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const pageContainer = {
  margin: '2rem',
  fontFamily: 'Arial, sans-serif',
};

const pageTitle = {
  fontSize: '2rem',
  marginBottom: '1rem',
};

const assignSection = {
  marginBottom: '2rem',
};

const sectionTitle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
};

const selectStyles = {
  padding: '0.5rem',
  marginRight: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyles = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const projectsList = {};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '2rem',
  border: '1px solid #ccc',
};

const tableHeaderCellStyles = {
  padding: '0.5rem',
  textAlign: 'left',
  fontWeight: 'bold',
  backgroundColor: '#f2f2f2',
  border: '1px solid #ccc',
};

const tableCellStyles = {
  padding: '0.5rem',
  border: '1px solid #ccc',
};

const deleteButton = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ProjectsPage;