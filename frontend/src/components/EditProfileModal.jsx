import { useEffect, useState } from "react";
import useUpdateUserProfile from "./useUpdateUserProfile";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    bio: "",
    currentPassword: "",
    newPassword: "",
  });

  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        bio: authUser.bio || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit Profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <textarea
              placeholder="Bio"
              className="input border border-gray-700 rounded p-2 input-md"
              value={formData.bio}
              name="bio"
              onChange={handleInputChange}
            />
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn btn-primary rounded-full btn-sm text-white"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">Close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditProfileModal;
