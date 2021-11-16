import React from "react";
import { Field, Formik } from "formik";

import "./App.css";

/**
Email must be a valid email address.
Password must be longer than 8 characters.
Colour is multichoice, where only one option may be selected, and the options are Blue, Green, Red, Black and Brown.
Animals is multichoice, where multiple options can be selected, and the options are Bear, Tiger, Snake, and Donkey.
If Tiger is selected then a textbox Type of tiger is revealed and this is a required field.
 */
function App() {
  return (
    <div className="app">
      <Formik
        initialValues={{
          email: "",
          password: "",
          animal: "",
          color: "",
          tiger: "",
          colors: ["Blue", "Green", "Red", "Black", "Brown"],
          animals: ["Bear", "Tiger", "Snake", "Donkey"],
        }}
        validate={(values) => {
          const errors = {};
          if (values.password.length <= 8) {
            errors.password = "Password must be longer than 8 characters";
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.tiger) {
            errors.tiger = "Tiger is required";
          }
          if (!values.color) {
            errors.color = "Select atleast one color";
          }
          if (!values.animal) {
            errors.animal = "Select an animal";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            email: values.email,
            password: values.password,
            animal: values.animal,
            color: values.color,
            tiger: values.tiger,
          };
          setTimeout(() => {
            alert(JSON.stringify(data, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                className={errors.email && errors.email && "input-error"}
              />
              <span className="error">{errors.email && errors.email}</span>
            </div>
            <div className="form_group mt-24">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                className={errors.password && errors.password && "input-error"}
              />
              <span className="error">
                {errors.password && errors.password}
              </span>
            </div>
            <div className="form_group mt-24">
              <fieldset>
                <legend>
                  Select colors
                  {values.colors.map((color) => {
                    return (
                      <>
                        <Field
                          type="radio"
                          name="color"
                          value={color}
                          onChange={handleChange}
                        />
                        {color}
                      </>
                    );
                  })}
                </legend>
              </fieldset>
              <span className="error">{errors.color && errors.color}</span>
            </div>
            <div className="form_group mt-24">
              <fieldset>
                <legend>
                  Select Animals
                  {values.animals.map((animal) => {
                    return (
                      <>
                        <Field
                          type="radio"
                          value={animal}
                          name="animal"
                          onChange={handleChange}
                        />
                        {animal}
                      </>
                    );
                  })}
                </legend>
              </fieldset>
              <span className="error">{errors.animal && errors.animal}</span>
            </div>
            {values.animal === "Tiger" && (
              <div className="form_group mt-24">
                <textarea
                  type="tiger"
                  name="tiger"
                  onChange={handleChange}
                  className={errors.tiger && errors.tiger && "input-error"}
                  required
                ></textarea>
                <span className="error">{errors.tiger && errors.tiger}</span>
              </div>
            )}

            <div className="form_group mt-24">
              <button disabled={isSubmitting} type="submit">
                Submit form
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
