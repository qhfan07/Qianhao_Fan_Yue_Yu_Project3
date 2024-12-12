import { useState } from "react";

const Post = ({ post, isMyPost, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/posts/edit/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editText }),
      });

      const data = await res.json();
      if (res.ok) {
        onEdit(data); 
        setIsEditing(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  return (
    <div className="border-b border-gray-700 p-4">
      <h3 className="font-bold text-gray-200">{post.user?.username || "Unknown User"}</h3> 
      {isEditing ? (
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
      ) : (
        <p>{post.text}</p>
      )}
      <p className="text-sm text-gray-500">{new Date(post.updatedAt || post.createdAt).toLocaleString()}</p>
      {isMyPost && (
        <div className="flex gap-2 mt-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn btn-sm btn-success">
                Save
              </button>
              <button
                onClick={() => {
                  setEditText(post.text);
                  setIsEditing(false);
                }}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditText(post.text);
                  setIsEditing(true);
                }}
                className="btn btn-sm btn-outline"
              >
                Edit
              </button>
              <button onClick={onDelete} className="btn btn-sm btn-danger">
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;


