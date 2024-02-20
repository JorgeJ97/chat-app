
const validate = ({password, confirmPassword, fullName, email}, submit = false) => {
    let errors = {}
    if(fullName !== '' && fullName.length <= 3 ) {errors.fullName = 'Full name should be greater than 3 characters'}
    if(password !== '' && password.length < 8) {errors.password = 'Password must contain at least 8 characters'}
    if(confirmPassword !== '' && password !== confirmPassword) {errors.confirmPassword = 'Password and confirm password should be same '}

    if(submit) {
        if(fullName === '')  errors.fullName =  'Full name cannot be blank' 
        if(email === '') errors.email =  'Email cannot be blank'
        if(password === '') errors.password = 'Need a password' 
        if(confirmPassword === '') errors.confirmPassword =  'Confirm password cannot be blank'
    }

    return errors;

}

export default validate;