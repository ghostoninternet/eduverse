import { useAuth } from "../../../contexts/authContext";

export const Infor = (props) => {
  return (
    <div className="flex flex-col gap-y-4 w-5/6 border-2 p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <p className="text-base">{props.description || "No details provided."}</p>
    </div>
  );
};

const InstructorProfile = () => {
  const { authState } = useAuth();

  return (
    <>
      <div className="flex pb-16">
        <div className="w-1/3 flex flex-col items-center mt-20 gap-y-6">
          <img
            src={authState.avatarUrl || "https://via.placeholder.com/300"}
            alt="User Avatar"
            width={300}
            height={300}
            className="rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-semibold">{authState.username}</h2>
          <p className="text-lg">{authState.email}</p>
        </div>

        <div className="w-2/3 mt-20 flex flex-col gap-y-10">
          {/* Personal Information Section */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Personal Information</h2>

            <Infor title="Email" description={authState.email} />
            <Infor
              title="Location"
              description={authState.location || "Unknown"}
            />

          </div>

          {/* Professional Section */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Professional Details</h2>
            <Infor
              title="Job Title"
              description={authState.jobTitle || "No job title provided."}
            />
            <Infor
              title="Organization"
              description={
                authState.organization || "No organization specified."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorProfile;
