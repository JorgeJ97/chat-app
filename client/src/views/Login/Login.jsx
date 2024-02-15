import styles from './Login.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginUser from '../../utils/loginUser'

const Login= () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log({[name] : value})
        setValues({...values, [name]: value})

    }



    const handleSubmit = (e) => {
        e.prevenDefault()

    }
    return (

        <div className={styles.container}>

        <div className={styles.login_container}>
            <div className={styles.header}>
                <h2>Login</h2>
            </div>

            <form className={styles.login_form} onSubmit={(e) => handleSubmit(e)}>

                <div className={styles.form_control}>
                    <input
                     type="email"
                     placeholder='Email'
                     name='email'
                     value={values.email}
                     onChange={(e) => handleChange(e)}
                     />
                </div>

                <div className={styles.form_control}>
                    <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <button type='submit'>Submit</button>
                <br />
                <span>You do not have an account? <Link to= '/register'> Create an account</Link></span>

            </form>
        </div>

        </div>

    )

}

export default Login;