import { useState, useContext } from "react";
import { appContext } from "../context";
import AuthServices from "../services/AuthServices";

export default function Signup({ closeModal }) {
  const { setUser, setToken } = useContext(appContext);
  const [load, setLoad] = useState(false);
  const [json, setJson] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJson({ ...json, [name]: value });
  };

  const handleClick = async () => {
    setLoad(true);
    await AuthServices.signup(json).then((res) => {
      // setLoad(false);
      // setStatus(res.status);
      // setTempToken(res.data.data.token);
      // setAuthEmail(res.data.data.authEmailId);
      console.log(res);
      closeModal();
      setLoad(false);
    });
  };

  return (
    <>
      <div className=" w-full grid grid-flow-col justify-center min-h-screen ">
        <div className="w-max col-span-1">
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://th.bing.com/th/id/OIP.6B26s8XaHqx_CC20pL5-FAHaHa?pid=ImgDet&rs=1"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign up your account
                </h2>
              </div>
              <>
                <form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="username" className="sr-only">
                        Username
                      </label>
                      <input
                        name="username"
                        type="text"
                        required
                        className="relative block w-full rounded-md my-4  border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full border rounded-md my-4 border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleClick}
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
