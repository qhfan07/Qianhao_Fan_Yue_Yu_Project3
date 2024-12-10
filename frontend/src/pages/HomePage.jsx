import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";

const HomePage = () => {
  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center w-full border-b border-gray-700 py-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Create Post */}
      <CreatePost />

      {/* Posts */}
      <Posts />
    </div>
  );
};

export default HomePage;
