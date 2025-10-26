import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://mern-blog-platform-three.vercel.app/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCreate = async (data) => {
    await axios.post("https://mern-blog-platform-three.vercel.app/api/posts", data);
    fetchPosts();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`https://mern-blog-platform-three.vercel.app/api/posts/${id}`, data);
    setEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`https://mern-blog-platform-three.vercel.app/api/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div className="app">
      <h1>📝 MERN Blogging Platform</h1>
      <PostForm onCreate={handleCreate} editing={editing} onUpdate={handleUpdate} onCancel={() => setEditing(null)} />
      <div className="posts">
        {posts.map((p) => (
          <div key={p._id} className="post">
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className="actions">
              <button onClick={() => setEditing(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
