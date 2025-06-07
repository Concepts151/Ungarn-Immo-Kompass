import { readUserSession, readUser } from "@/utils/action";
import { login, signup } from "./action/index";
import { createClient } from "@/utils/supabase/server";
import Signout from "./components/Signout";
import ModalExample from "./components/LoginModal";
import LoginModal from "./components/LoginModal";
import Login from "./components/Login";

export default async function LoginPage() {
  const { data } = await readUserSession();

  if (data.session) {
    console.log("session availabel:", data.session);
  }

  const userProfile = await readUser();

  console.log(userProfile!);

  

  return (
    <>
      {/* <form className="m-5 container mx-auto" style={{ width: "500px" }}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="form-control mb-3"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="form-control mb-3"
        />
        <button
          formAction={login}
          className="btn btn-primary container-sm mb-3"
        >
          Log in
        </button>
        <button formAction={signup} className="btn btn-secondary container">
          Sign up
        </button>
      </form> */}

      <div className="mx-auto mb-5" style={{ width: "500px" }}>
        {data.session && (
          <>
            <div className="mx-auto container-sm mb-2">session active</div>
            <Signout />
            {JSON.stringify(userProfile!, null, 2)}
          </>
        )}
      </div>

      <div className="mx-auto" style={{ width: "500px" }}>
        <div className="">signup-login modal</div>

        <div className="">
          <Login user={userProfile!}/> 
        </div>
      </div>
    </>
  );
}
