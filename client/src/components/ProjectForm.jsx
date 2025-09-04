// client/src/components/ProjectForm.jsx
import React, { useState } from 'react';

const ProjectForm = ({ onProjectAdded }) => {
  let API_URL = "http://localhost:5000";

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    demoLink: '',
    githubLink: '',
    image: '',
    category: 'react'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          techStack: formData.techStack.split(',').map(tech => tech.trim())
        })
      });

      if (response.ok) {
        const newProject = await response.json();
        onProjectAdded();
        setFormData({
          title: '',
          description: '',
          techStack: '',
          demoLink: '',
          githubLink: '',
          image: '',
          category: 'react'
        });
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          >
            <option value="mern">MERN</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
            <option value="frontend">Frontend</option>
            <option value="fullstack">Fullstack</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Demo Link</label>
          <input
            type="url"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500    text-gray-900 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600  rounded focus:outline-none focus:ring-2 focus:ring-zinc-500  text-gray-900 "
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;