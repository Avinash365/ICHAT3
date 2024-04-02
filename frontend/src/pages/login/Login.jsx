import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="lable p-2">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="w-full input file-input-bordered h-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="label">
                            <span className="text-base label-text" >Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input file-input-bordered h-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to={"/signup"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Dont't"}have an account?
                    </Link>
                    <div>
                        <button className="btn btn-block btn-sm mt-2">
                            {loading ? <span className='loading loading-spinner '></span> : "Login"}
                        </button>
                    </div>
                </form>

            </div>
        </div>

    )
}
export default Login;