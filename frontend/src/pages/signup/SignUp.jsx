// import { sign } from "jsonwebtoken";
import { useState} from "react";
import { Link } from "react-router-dom";
import useSignup from '../../hooks/useSignup'


const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {loading, signup } = useSignup();  

    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo from preventDeffault() to preventDefault()
        await signup(inputs);   
        console.log(inputs); // Log the inputs after signup is complete
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">Sign up
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="lable p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Avinash Jha"
                            className="w-full input file-input-bordered h-10"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="lable p-2">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full input file-input-bordered h-10"
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="label">
                            <span className="text-base label-text" >Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Re Enter Password"
                            className="w-full input file-input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <Link
                        to={"/login"}
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                        href='#'
                    >
                        have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    ); 
}
export default SignUp;