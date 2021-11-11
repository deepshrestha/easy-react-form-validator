const  useFormValidator = (props) => {
  const { useState } = require("react");
  const [fields, setFields] = useState(props);

  const emailPattern = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  const formValid = function (errors) {
    let valid = true;
    Object.values(errors).forEach(function (value) {
      value.length !== 0 && (valid = false);
    });

    return valid;
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    let errors = fields.errors;
    Object.keys(errors).map((error) => {
      
      if(event.target[error] !== undefined && fields[error] !== null)
        validate(
          error,
          (event.target[error].placeholder === undefined) ? (event.target[error][0].placeholder == undefined ? event.target[error].options[0].innerHTML : event.target[error][0].placeholder) : event.target[error].placeholder,
          fields[error],
          (event.target[error].type === undefined) ? event.target[error][0].type : event.target[error].type,
          fields.errors
        );
    });

    if (formValid(errors)) {
      if (props.mode === "I") resetForm(event);
      return true;
    } else {
      let errors = fields.errors;
      Object.keys(errors).every(function (key) {
        if (errors[key].length > 0) {
          if(key === "radio")
            event.target[key][0].focus();
          else
            event.target[key].focus();
          return false;
        }else {
          return true;
        }
      });
      return false;
    }
  };

  const doValidate = (event) => {
    const { name, placeholder, value, type } = event.target;
    let errors = fields.errors;
    if (type === "select-multiple") {
      let optionValue = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      validate(name, 
        (placeholder === undefined) ? (event.target.options[0].innerHTML) : placeholder, 
        optionValue, 
        type, 
        errors
      );
    } else validate(name, placeholder, value, type, errors);
  }

  const onHandleChange = (event) => {
    doValidate(event);
  };

  const onHandleBlur = (event) => {
    doValidate(event);
  };

  const validate = (name, placeholder, value, type, errors) => {
    switch (type) {
      case "text":
      case "password":
      case "textarea":
      case "select-one":
      case "select-multiple":
        errors[name] =
          value.length == 0 && props.errors.hasOwnProperty(name)
            ? `The ${placeholder ?? name} field is required`
            : "";
        break;
      case "checkbox":
      case "radio":
        errors[name] = (document.querySelector(`input[type=${type}]:checked`) === null)
          ? `The ${placeholder ?? name} field is required`
          : "";
        break;
      case "email":
        errors[name] =
          value.length == 0 && props.errors.hasOwnProperty(name)
            ? `The ${placeholder ?? name} field is required`
            : (!emailPattern.test(value) && props.errors.hasOwnProperty(name)
              ? "The Email is invalid!"
              : ""
            );
        break;
      default:
        break;
    }

    setFields({
      ...fields,      
      [name]: value,
      errors
    });
  };

  const resetForm = (event) => {
    let resetFields = {
      ...props,
    };
    Object.keys(fields).forEach((field) => {
      if (event.target[field] !== undefined) {
        event.target[field].value = "";

        let checkboxElement = document.querySelectorAll("input[type='checkbox']");
        if(checkboxElement.length > 0)
        {
          checkboxElement.forEach((element) => {
            element.checked = false;
          })
        }

        let radioElement = document.querySelectorAll("input[type='radio']");
        if(radioElement.length > 0)
        {
          radioElement.forEach((element) => {
            element.checked = false;
          });
        }
      }
    });
    
    setFields({
      ...fields,
      ...resetFields,
    });
  };

  return {
    onHandleChange,
    onHandleSubmit,
    onHandleBlur,
    fields,
    setFields,
  };
}

const errorMessage = (errorMsg) => {
  return errorMsg;
}

module.exports = {
  useFormValidator,
  errorMessage
}