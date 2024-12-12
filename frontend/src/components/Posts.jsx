import Post from "./Post";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Posts = ({ username }) => {
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: username ? ["userPosts", username] : ["allPosts"],
    queryFn: async () => {
      const url = username
        ? `/api/posts/user/${username}`
        : `/api/posts`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }
      return data;
    },
  });

  const handleEdit = (updatedPost) => {
    queryClient.setQueryData(
      username ? ["userPosts", username] : ["allPosts"],
      (oldPosts) =>
        oldPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
    );
  };

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        queryClient.setQueryData(
          username ? ["userPosts", username] : ["allPosts"],
          (oldPosts) => oldPosts.filter((post) => post._id !== postId)
        );
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Failed to load posts</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          isMyPost={authUser?._id === post.user?._id} 
          onEdit={handleEdit}
          onDelete={() => handleDelete(post._id)}
        />
      ))}
    </div>
  );
  
};

export default Posts;

