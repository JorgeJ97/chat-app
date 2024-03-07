import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const { loading, login } = useLogin()

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setValues({ ...values, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(values);

    }
    return (
        <div className='flex items-center justify-center h-screen bg-zinc-800'>

            <div className='flex flex-col items-center justify-center min-w-[400px] mx-auto rounded-lg bg-zinc-900'>
                <div className='w-full p-6 rounded-lg shadow-md'>
                    <div className=' pt-3 pb-8'>
                        <h1 className='text-center font-bold text-3xl text-white'>Login
                            <span className=' text-blue-600'> ChatApp</span>
                        </h1>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className='mb-3 pb-5 relative flex items-center justify-center'>
                            <label className="input input-bordered flex items-center gap-2 w-full h-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input className="grow"
                                    type="email"
                                    placeholder="Email"
                                    name='email'
                                    value={values.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                        </div>

                        <div className='mb-3 pb-5 relative flex items-center justify-center'>
                            <label className="input input-bordered flex items-center gap-2 w-full h-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input className="grow"
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    value={values.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                        </div>

                        <div className='flex justify-center items-center mb-2'>
                            <button className='btn btn-block bg-blue-700 text-white text-lg hover:bg-blue-800' disabled={loading} >
                                {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                            </button>
                        </div>

                        <span className='text-base text-white font-medium'
                        >{"Don't"} have an account? <Link className='hover:underline text-blue-500' to='/register'> Create account</Link>
                        </span>


                    </form>
                </div>

            </div>
        </div>
    )

}

export default Login;