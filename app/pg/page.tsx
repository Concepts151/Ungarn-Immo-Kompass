import { readUser, readUserSession } from "@/utils/action";
import Login from "./components/Login";
import Register from "./components/Register";
import Signout from "./components/Signout";
import { useSessionStore } from "../store";
import SessionClient from "./components/SessionClient";

export default async function LoginPage() {
  const { data } = await readUserSession();

  if (data.session) {
    console.log("session availabel:", data.session);
  }
  const user = data.session?.user?.identities;
  const userName = user?.[0].identity_data?.name;
  const userProfile = await readUser();

  console.log(userProfile!, userName);

  //   const getSessionUser = useSessionData((state) => state.getUserSession);

  //   getSessionUser();

  //   const sessiondata = useSessionData((state)=>state.userSession)

  return (
    <>
      <SessionClient session={data.session} />
      <div className="mx-auto mb-5" style={{ width: "500px" }}>
        {data.session && (
          <>
            <h5 className="mt-5">hi! {userName}</h5>
            <div className="mx-auto container-sm mb-2 text-success">
              session active
            </div>
            <Signout />
            {JSON.stringify(userProfile!, null, 2)}
            {/* {JSON.stringify(sessiondata!, null, 2)} */}
          </>
        )}
      </div>

      <div className="mx-auto mb-4" style={{ width: "500px" }}>
        <div className="">signup-login modal</div>

        <div className="">
          <Login user={userProfile!} />
        </div>
      </div>

      <div className="mx-auto" style={{ width: "500px" }}>
        <h6 className="">Sign up sequence</h6>
        <Register />
      </div>
    </>
  );
}
