// client/src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectForm from "../components/ProjectForm";
import ContactMessages from "../components/ContactMessages";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  let API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/contact`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setMessages(messages.filter((message) => message._id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200   mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("projects")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "projects"
                  ? "border-zinc-500 text-zinc-600  "
                  : "border-transparent text-gray-500   hover:text-gray-700 "
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "messages"
                  ? "border-zinc-500 text-zinc-600  "
                  : "border-transparent text-gray-500   hover:text-gray-700 "
              }`}
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "projects" && (
          <div>
            <ProjectForm onProjectAdded={fetchData} />
            <div className="mt-8 grid gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="p-6 rounded-lg shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600  mb-4">{project.description}</p>
                  <div className="flex space-x-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-zinc-100 text-zinc-800 text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <ContactMessages
            messages={messages}
            onDeleteMessage={handleDeleteMessage}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Admin;
