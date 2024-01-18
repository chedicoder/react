import React, { useState } from 'react';

const ProjectForm = () => {
  const [project, setProject] = useState({
    titre: '',
    nom_client: '',
    fichier_charge: '',
    description: '',
    debut_date: '',
    fin_date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        console.log('Project added successfully!');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <div style={formContainer}>
      <h2 style={formHeading}>Add Project</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="titre">
            Title:
          </label>
          <input
            type="text"
            name="titre"
            id="titre" // Added id
            value={project.titre}
            onChange={handleChange}
            style={inputStyles}
          />
        </div>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="nom_client">
            Client Name:
          </label>
          <input
            type="text"
            name="nom_client"
            id="nom_client" // Added id
            value={project.nom_client}
            onChange={handleChange}
            style={inputStyles}
          />
        </div>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="nom_client">
            File:
          </label>
          <input
            type="text"
            name="fichier_charge"
            id="fichier_charge" // Added id
            value={project.fichier_charge}
            onChange={handleChange}
            style={inputStyles}
          />
        </div>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="description">
            Description:
          </label>
          <textarea
            name="description"
            id="description" // Added id
            value={project.description}
            onChange={handleChange}
            style={{ ...inputStyles, ...textareaStyles }}
          />
        </div>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="debut_date">
            Start Date:
          </label>
          <input
            type="date"
            name="debut_date"
            id="debut_date" // Added id
            value={project.debut_date}
            onChange={handleChange}
            style={inputStyles}
          />
        </div>
        <div style={inputGroup}>
          <label style={inputLabel} htmlFor="fin_date">
            End Date:
          </label>
          <input
            type="date"
            name="fin_date"
            id="fin_date" // Added id
            value={project.fin_date}
            onChange={handleChange}
            style={inputStyles}
          />
        </div>
        <button type="submit" style={submitButton}>
          Add Project
        </button>
      </form>
    </div>
  );
};

const formContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '#f4f4f4',
};

const formHeading = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#333',
};

const formStyles = {
  width: '80%',
  maxWidth: '400px',
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
};

const inputGroup = {
  marginBottom: '1.5rem',
};

const inputLabel = {
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '1rem',
  color: '#555',
};

const inputStyles = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const textareaStyles = {
  resize: 'vertical',
};

const submitButton = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default ProjectForm;
