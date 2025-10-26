import React, { useEffect, useState } from "react";

export default function PostForm({ onCreate, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setBody(editing.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Fill all fields");
    if (editing) onUpdate(editing._id, { title, body });
    else onCreate({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="form-actions">
        <button type="submit">{editing ? "Update" : "Create"}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
