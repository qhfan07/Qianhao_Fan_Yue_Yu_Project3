import Post from "./Post";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ username }) => {
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
          isMyPost={username === post.username}
          onEdit={() => console.log("Edit post", post._id)}
          onDelete={() => console.log("Delete post", post._id)}
        />
      ))}
    </div>
  );
};

export default Posts;
