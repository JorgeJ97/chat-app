import { Link } from 'react-router-dom';
import styles from './Register.module.css'
import { useState } from 'react';
import validate from '../../utils/validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import registerUser from '../../utils/registerUser';
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleSubmit = async (event) => {
        event.preventDefault()
        const submit = true
        const newErrors = validate(formValues, submit)

    // If there are no errors, it sends the data to the backend
    if (Object.keys(newErrors).length === 0) {
        const data = await registerUser(formValues)
        console.log(data)
        if(data.registration) {
            alert(data.msg)
            navigate('/')
        }
        else {
            return alert(data.msg)
        }
    } else {
        // If there are errors, set the errors to the state
        setErrors(newErrors);
        return alert('no se envia');
    }

    }
        

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setErrors(validate({...formValues, [name]: value}))
        setFormValues({...formValues, [name] : value})
    }

    return(
        <div className={styles.container2}>
        <div className={styles.container}>
             <div className={styles.logo}>
                <h2>Create Account</h2>
            </div>
        <form className={styles.form} onSubmit={(e)=> handleSubmit(e)}>

            <div className={styles.form_control}>
            <input className={errors.fullName ? styles.input_error : styles.input_success}
            type="text" 
            placeholder='Fullname' 
            name='fullName'
            value={formValues.fullName}
            onChange={(e) => handleChange(e) }
            />
            {errors.fullName && (
                <div>
                <small className={styles.errorSpan}>{errors.fullName}</small>
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon_exclamation} />
                
            </div>
            )}
            </div>


            <div className={styles.form_control}>
            <input className={errors.email ? styles.input_error : styles.input_success}
            type="email" 
            placeholder='e.g: person@gmail.com' 
            name='email'
            value={formValues.email}
            onChange={(e) => handleChange(e) }
            />
            {errors.email && (
                <div>
                <small className={styles.errorSpan}>{errors.email}</small>
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon_exclamation} />
                
            </div>
            )}
            </div>

            <div className={styles.form_control}>
            <input className={errors.password ? styles.input_error : styles.input_success}
            type="password" 
            placeholder='Password' 
            name='password'
            value={formValues.password} 
            onChange={(e) => handleChange(e) }
            />
            {errors.password && (
                <div>
                <small className={styles.errorSpan}>{errors.password}</small>
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon_exclamation} />
                
            </div>
            )}
            </div>

            <div className={styles.form_control}>
            <input className={errors.confirmPassword ? styles.input_error : styles.input_success}
            type="password" 
            placeholder='Confirm Password' 
            name='confirmPassword'
            value={formValues.confirmPassword} 
            onChange={(e) => handleChange(e) }
            />
            {errors.confirmPassword && (
                <div>
                <small className={styles.errorSpan}>{errors.confirmPassword}</small>
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon_exclamation} />
                
            </div>
            )}
            </div>

            <button type='submit'> Create User</button>
            <br />
            <span className={styles.form_span}> already have an account? <Link to='/'> Login</Link></span>
           </form>

        </div>

        </div>
    )

}


export default Register;