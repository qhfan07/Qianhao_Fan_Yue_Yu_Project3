const Post = ({ post, isMyPost, onEdit, onDelete }) => {
    return (
      <div className="border-b border-gray-700 p-4">
        <h3 className="font-bold">{post.username}</h3>
        <p>{post.text}</p>
        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        {isMyPost && (
          <div className="flex gap-2 mt-2">
            <button onClick={onEdit} className="btn btn-sm btn-outline">
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default Post;
  