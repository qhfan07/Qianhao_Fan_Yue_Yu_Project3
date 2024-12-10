import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Posts from "../components/Posts";
import EditProfileModal from "../components/EditProfileModal";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const { username } = useParams();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const { data: user, isLoading, isError, refetch } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
  });

  const isMyProfile = authUser?._id === user?._id;

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (isError || !user) {
    return <p className="text-center mt-4">User not found</p>;
  }

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
      <div className="flex items-center gap-4 px-4 py-2">
        <Link to="/">
          <button className="btn btn-outline rounded-full btn-sm">Back</button>
        </Link>
        <h1 className="text-xl font-bold">{user?.username}</h1>
      </div>
      <div className="p-4">
        <p className="text-sm">{user?.bio || "No bio provided."}</p>
        {isMyProfile && <EditProfileModal authUser={authUser} />}
      </div>
      <div className="mt-4">
        <Posts username={username} userId={user?._id} />
      </div>
    </div>
  );
};

export default ProfilePage;
