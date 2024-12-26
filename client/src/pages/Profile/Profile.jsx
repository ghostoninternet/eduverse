import { useAuth } from "../../contexts/AuthContext";
import { UppercaseFirstLetter } from "../../utils/string";
export const Infor = (props) => {
  return (
    <div className="flex flex-col gap-y-10 border-2 w-5/6 p-12 bg-white rounded-md">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <div>{props.description}</div>
    </div>
  );
};

const Profile = () => {
  const { authState } = useAuth();

  return (
    <div className="bg-slate-200">
      <div className="flex min-h-screen pb-16">
        <div className="w-1/3 flex flex-col items-center mt-20 gap-y-4">
          <img
            src={authState.avatarUrl}
            width={300}
            height={300}
            className="shadow-lg"
          />
          <div className="flex items-center justify-center gap-x-2">
            <h2 className="text-2xl font-semibold">{authState.username}</h2>
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Personal Information</h2>
            <Infor title="Gender" description={UppercaseFirstLetter(authState.gender)} />
            <Infor title="Email" description={authState.email} />
            <Infor
              title="Location"
              description={authState.location || "Unknown"}
            />
          </div>

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
    </div>
  );
};

export default Profile;
