import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import Team from "./Card";
import styled from "styled-components";


const Card = styled.div`
background: #224488;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-content: space-around;
border-radius: 20px;
margin-bottom: 2%;
margin: 0;
`;

const InputBox = styled.form`
background: black;
border: 2px solid grey;
display: flex;
flex-direction: column;
margin: 0;
justify-content: center;
color: white;
font-family: 'Neucha', cursive;
align-content: space-around;
`;

const Submit = styled.button`
background: black;
color: white;
.disabled {
  background: grey;
  color: red;
}
`;
// const MemberContainer = styled.div`
// background: #228656;
// display: flex;
// flex-direction: row;
// justify-content: space-evenly;
// border-radius: 20px;
// `;

// const TeamList = styled.div`
// background: black;
// border: 2px solid grey;
// width: 200px;
// display: flex;
// flex-direction: column;
// margin: 0;
// justify-content: center;
// font-family: 'Neucha', cursive;
// border-radius: 8px;
// `;

// const Name = styled.h2 `
// color: Blue;
// `;

// const Email = styled.p`
// color: green;
// `;

// const Role = styled.p`
// color: yellow;
// `;
// const Bio = styled.p`
// color: orange;
// `;
// const Terms = styled.p`
// color: silver;
// `;
// const Pass = styled.p`
// color: red;
// `;

export default function Form() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  //reqres.in
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    role: "",
    terms: ""
  });



  const [ButtonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    role: "",
    terms: ""
  });

  const formSchema = yup.object().shape({
    username: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required(),
    terms: yup.boolean().oneOf([true], "Cannot continue without Agreement"),
    role: yup.string(),
    bio: yup.string().required("Brief information"),
    password: yup.string().required("Password is required"),
  });

  
  console.log("error state", errors);

 useEffect(() => {
    formSchema.isValid(formState).then(valid => {
	setButtonDisabled(!valid);
    });
  }, [formState]);

  // onSubmit function
  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        setPost(response.data);
        setUser([...user, response.data]);
        setFormState({
          username: "",
          email: "",
          password: "",
          bio: "",
          role: "",
          terms: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  
  // onChange function
  const inputChange = e => {
    console.log("input changed!", e.target.value);

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const validateChange = event => {
    event.persist()
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0]
        });
      });
  };

  return (
    <Card>
    <InputBox onSubmit={formSubmit}>
      <label htmlFor="username">
      Username
        <input
          id="username"
          type="text"
          name="username"
          onChange={inputChange}
          value={formState.username}
          placeholder ="What do we call you?"
        />
        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          onChange={inputChange}
          multiple
          placeholder ="someone@something.com"
          value={formState.email}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          onChange={inputChange}
          minLength="8" required 
          autoComplete="new-password"
          value={formState.password}
          placeholder ="Make it a good one, atleast 8."
          />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      
      <label htmlFor="bio">
        Tell us a bit about yourself.
        <textarea
          name="bio"
          onChange={inputChange}
          value={formState.bio}
          placeholder ="At least a couple sentences."
        />
        {errors.bio.length > 0 ? (
          <p className="error">{errors.bio}</p>
        ) : null}
      </label>

      <label htmlFor="role">
        What is your specialty?
        <select id="role" name="role" onChange={inputChange}>
          <option value="Gamer">Gamer</option>
          <option value="Beta Tester">Beta Testing</option>
          <option value="Artist">Art</option>
          <option value="Coding">Coding</option>
        </select>
      </label>

      <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
      </label>
      <pre>{JSON.stringify(post, null, 2)}
      
      </pre>
      <Submit disabled={ButtonDisabled} type="submit">
        Submit
      </Submit>
    </InputBox>
    <Team user={user} />
    </Card>
    
  );
 
}

