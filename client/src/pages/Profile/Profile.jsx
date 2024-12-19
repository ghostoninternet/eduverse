import { useAuth } from "../../contexts/AuthContext";
export const Infor = (props) => {
  return (
    <div className="flex flex-col gap-y-10 border-2 w-5/6 p-12 bg-white rounded-md">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <div>dlkajflksad</div>
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
        <div className="w-2/3 mt-20 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-semibold">Experience</h2>
            <Infor title="Projects" />
            <Infor title="Work history" />
          </div>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-semibold">Education</h2>
            <Infor title="Certificates" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
