import { Link } from 'react-router-dom';
import { useState } from 'react';
import validate from '../../utils/validate';
import registerUser from '../../utils/registerUser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submit = true;
        const newErrors = validate(formValues, submit);

        if (Object.keys(newErrors).length === 0) {
            const data = await registerUser(formValues);
            console.log(data);
            if (data.registration) {
                alert(data.msg);
                navigate('/');
            } else {
                alert(data.msg);
            }
        } else {
            setErrors(newErrors);
            alert('No se envia');
        }
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setErrors(validate({ ...formValues, [name]: value }));
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='flex items-center justify-center h-screen bg-zinc-800'>

        <div className='flex flex-col items-center justify-center min-w-[400px] mx-auto rounded-lg bg-zinc-900'>
            <div className='w-full p-6 rounded-lg shadow-md'>
                <div className=' pt-3 pb-8'>
                    <h1 className='text-center font-bold text-3xl text-white'>Sign Up
                        <span className=' text-blue-600'> ChatApp</span>
                    </h1>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className='mb-4 pb-5 relative flex items-center justify-center'>
                        <label className={`input input-bordered flex items-center gap-2 w-full h-10`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input className="grow"
                                type="text"
                                placeholder="Full Name"
                                name='fullName'
                                value={formValues.fullName}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {errors.fullName && (
                             <div>
                                 <small className="text-red-500 absolute left-0 bottom-[-4px]">{errors.fullName}</small>
                                  <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
                              </div>
                           )}
                    </div>

                    <div className='mb-4 pb-5 relative flex items-center justify-center'>
                        <label className="input input-bordered flex items-center gap-2 w-full h-10" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input className="grow"
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={formValues.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {errors.email && (
                             <div>
                                 <small className="text-red-500 absolute left-0 bottom-[-4px]">{errors.email}</small>
                                  <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
                              </div>
                           )}
                    </div>

                    <div className='mb-4 pb-5 relative flex items-center justify-center'>
                        <label className="input input-bordered flex items-center gap-2 w-full h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input className="grow"
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={formValues.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {errors.password && (
                             <div>
                                 <small className="text-red-500 absolute left-0 bottom-[-4px]">{errors.password}</small>
                                  <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
                              </div>
                           )}
                    </div>

                    <div className='mb-4 pb-5 relative flex items-center justify-center'>
                        <label className="input input-bordered flex items-center gap-2 w-full h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input className="grow"
                                type="password"
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                value={formValues.confirmPassword}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {errors.confirmPassword && (
                             <div>
                                 <small className="text-red-500 absolute left-0 bottom-[-4px]">{errors.confirmPassword}</small>
                                  <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
                              </div>
                           )}
                    </div>

                    <div className='flex justify-center items-center mb-2'>
                        <button className='btn btn-block bg-blue-700 text-white text-lg hover:bg-blue-800'>Login</button>
                    </div>

                    <span className='text-base text-white font-medium'
                    > Already have an account? {' '} <Link className='hover:underline text-blue-500' to= '/'> Login</Link>
                    </span>


                </form>
            </div>

        </div>
    </div>

);
};

export default Register;












        // <div className='flex items-center justify-center m-0'>
        //     <div className="flex items-center justify-center h-screen">
        //         <div className="  bg-white rounded-lg shadow-lg w-full min-w-[400px]">
        //             <div className=" rounded  bg-slate-50 border-b border-slate-300 py-4 px-8">
        //                 <h2 className=" text-xl font-semibold text-black text-center">Create Account
        //                     <span className="text-blue-500"> ChatApp</span>
        //                 </h2>
        //             </div>
        //             <form className="py-8 px-10" onSubmit={(e) => handleSubmit(e)}>


        //                 <div className="mb-3 pb-5 relative flex items-center justify-center">
        //                     <input
        //                         className={`w-full p-[10px] block bg-transparent text-sm rounded border-solid border ${errors.fullName ? 'border-red-500 focus:outline-none input-error' : 'border-slate-800 outline-slate-500 focus:outline'}`}
        //                         type={'text'}
        //                         placeholder={'Full Name'}
        //                         name={'fullName'}
        //                         value={formValues.fullName}
        //                         onChange={(e) => handleChange(e)}
        //                     />
        //                     {errors.fullName && (
        //                         <div>
        //                             <small className="text-red-500 absolute left-0 bottom-0">{errors.fullName}</small>
        //                             <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
        //                         </div>
        //                     )}
        //                 </div>
        //                 <div className="mb-3 pb-5 relative flex items-center justify-center">
        //                     <input
        //                         className={`w-full p-[10px] block bg-transparent text-sm rounded border-solid border ${errors.fullName ? 'border-red-500 focus:outline-none input-error' : 'border-slate-800 outline-slate-500 focus:outline'}`}
        //                         type={'text'}
        //                         placeholder={'Full Name'}
        //                         name={'fullName'}
        //                         value={formValues.fullName}
        //                         onChange={(e) => handleChange(e)}
        //                     />
        //                     {errors.fullName && (
        //                         <div>
        //                             <small className="text-red-500 absolute left-0 bottom-0">{errors.fullName}</small>
        //                             <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
        //                         </div>
        //                     )}
        //                 </div>
        //                 <div className="mb-3 pb-5 relative flex items-center justify-center">
        //                     <input
        //                         className={`w-full p-[10px] block bg-transparent text-sm rounded border-solid border ${errors.fullName ? 'border-red-500 focus:outline-none input-error' : 'border-slate-800 outline-slate-500 focus:outline'}`}
        //                         type={'text'}
        //                         placeholder={'Full Name'}
        //                         name={'fullName'}
        //                         value={formValues.fullName}
        //                         onChange={(e) => handleChange(e)}
        //                     />
        //                     {errors.fullName && (
        //                         <div>
        //                             <small className="text-red-500 absolute left-0 bottom-0">{errors.fullName}</small>
        //                             <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
        //                         </div>
        //                     )}
        //                 </div>
        //                 <div className="mb-3 pb-5 relative flex items-center justify-center">
        //                     <input
        //                         className={`w-full p-[10px] block bg-transparent text-sm rounded border-solid border ${errors.fullName ? 'border-red-500 focus:outline-none input-error' : 'border-slate-800 outline-slate-500 focus:outline'}`}
        //                         type={'text'}
        //                         placeholder={'Full Name'}
        //                         name={'fullName'}
        //                         value={formValues.fullName}
        //                         onChange={(e) => handleChange(e)}
        //                     />
        //                     {errors.fullName && (
        //                         <div>
        //                             <small className="text-red-500 absolute left-0 bottom-0">{errors.fullName}</small>
        //                             <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 absolute top-[12px] right-[10px]" />
        //                         </div>
        //                     )}
        //                 </div>

                        

        //                 {/* <InputComponent
        //                     type='text'
        //                     placeholder='Full Name'
        //                     name="fullName"
        //                     value={formValues.fullName}
        //                     handleChange={handleChange}
        //                     error={errors.fullName}
        //                 />
        //                 <InputComponent
        //                     type='email'
        //                     placeholder='Email'
        //                     name="email"
        //                     value={formValues.email}
        //                     handleChange={handleChange}
        //                     error={errors.email}
        //                 />
        //                 <InputComponent
        //                     type='password'
        //                     placeholder='Password'
        //                     name="password"
        //                     value={formValues.password}
        //                     handleChange={handleChange}
        //                     error={errors.password}
        //                 />
        //                 <InputComponent
        //                     type='password'
        //                     placeholder='Confirm Password'
        //                     name="confirmPassword"
        //                     value={formValues.confirmPassword}
        //                     handleChange={handleChange}
        //                     error={errors.confirmPassword}
        //                 /> */}

        //                 <div>
        //                     <button className='bg-blue-700 uppercase text-base text-white btn btn-block  mt-2 hover:bg-slate-800' /*disabled={loading}*/>
        //                         Create User
        //                         {/* {loading ? <span className='loading loading-spinner'></span> : "Sign Up"} */}
        //                     </button>
        //                 </div>

        //                 {/* <button className=" bg-blue-700 text-white rounded-lg px-4 py-2 uppercase text-sm font-semibold w-full mb-2" type="submit">Create User</button> */}
        //                 <span className="text-black text-xs uppercase">already have an account? {' '}<Link to="/" className="text-blue-600 hover:underline">Login</Link></span>
        //             </form>
        //         </div>
        //     </div>

        // </div>
