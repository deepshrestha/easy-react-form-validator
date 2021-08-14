# What is this

A very simple light-weight react form validator for all react developers. It can be used as a custom hooks.

# Pre-requisites

Need to install nodejs from 'https://nodejs.org'

# Installation

```
To add this package in dependencies
npm i easy-react-form-validator -S or --save 

To add this package in devDependencies
npm i easy-react-form-validator -D or --save-dev

```

# Usage

```
import {useFormValidator, errorMessage} from 'easy-react-form-validator';

const initialState = {
    fullName: '',
    address: '',
    email: '',
    password: '',
    errors: {
        fullName: '',
        email: '',
        password: ''
    }
};

const {
    onHandleChange,
    onHandleSubmit,
    onHandleBlur,
    fields
} = useFormValidator(initialState)

const { errors } = fields

Where,

The properties of an object "initialState" must be the form input elements. The "errors" property is used to validate the input form elements.

For Example:

1. Create input type element
2. Do not forget to add input properties such as name and placeholder
3. Add the handler functions to validate the form such as onHandleSubmit,   onHandleChange, onHandleBlur
4. To display the error, add a div underneath each input type element.

For Example:

<form className="..." onSubmit={onHandleSubmit}>
    <input type="text" 
           name="fullName" 
           placeholder="Full Name" 
           onChange={onHandleChange} 
           onBlur={onHandleBlur} />
    <div className="...">
        {errors.fullName.length > 0 && errorMessage(errors.fullName) }
    </div>

    <input type="email"
           name="email" placeholder="Email" 
           onChange={onHandleChange} 
           onBlur={onHandleBlur} />
    <div className="...">
        {errors.email.length > 0 && errorMessage(errors.email) }
    </div>
    ...
    ...
</form>

```