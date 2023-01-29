export const isAlphabate = (value) => {
  const regMatch = /^[a-zA-Z]*$/.test(value);

  if (regMatch) {
    return true;
  } else {
    return false;
  }
};

export const isNumber = (value) => {
  const regexMatch = /^[0-9]*$/.test(value);
  if (regexMatch) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = (value) => {
  const regMatch = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  if (regMatch) {
    return true;
  } else {
    return false;
  }
};

export const isValidDoc = (val) => {
  let error = { doc: "" };
  if (val.type == "" || val.type != "application/pdf") {
    error.doc = "Document should be pdf only";
    return error;
  }
  if (val.size > 15e6) {
    error.doc = "Please upload a file greter than 15 MB";
    return error;
  }
  if (val.size > 50e6) {
    error.doc = "Please upload a file smaller than 50 MB";
    return error;
  }
  return error;
};

export const isValidInfo = (val) => {
  const regexMatch = /^[a-zA-Z0-9.,@_]*$/.test(val);
  if (regexMatch) {
    return true;
  } else {
    return false;
  }
};

export const validateIsEmpty = (val) => {
  let error = {
    name: "",
    email: "",
    phone: "",
    country: "",
    info: "",
    doc: "",
  };
  if (val.name == "") {
    error.name = "Name is required";
  }
  if (val.email == "") {
    error.email = "Email is required";
  }
  if (val.phone == "") {
    error.phone = "Phone is required";
  }
  if (val.info == "") {
    error.info = "Additional is required";
  }
  if (val.doc == "") {
    error.doc = "Document is required";
  }
  return error;
};
