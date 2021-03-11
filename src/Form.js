import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import ErrorMessage from "./ErrorMsg";

const CustomStyle = {
  width: 231,
  height: 46,
  textTransform: "none",
  fontSize: 20,
  backgroundColor: "#5cc8a1",
  color: "#fff",
  fontFamily: "Roboto",
  textAlign: "center",
  borderRadius: 8,
  border: "0",
  boxShadow: [
    "0px 8px 28px -6px rgba(24, 39, 75, 0.12)",
    "0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
  ].join(","),
  "&:hover": {
    backgroundColor: "#5cc8a1",
    boxShadow: [
      "0px 8px 28px -6px rgba(24, 39, 75, 0.12)",
      "0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
    ].join(","),
  },
};

function FormComponent() {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const [value, setValue] = useState();
  const [country, setCountry] = useState();
  const onSubmit = (data, e) => {
    alert(JSON.stringify(data));
    e.target.reset();
    setValue("");
  };

  return (
    <div className="form-container">
      <form className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="thanks-message">
          <h1>Thank you so much for taking the time!</h1>
          <p>Please provide the below details!</p>
        </div>
        <div className="form-area">
          <label className="form-label">First Name:</label>
          <input
            className="form-field fle"
            name="firstName"
            placeholder="John"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.firstName} />

          <label className="form-label">Last Name:</label>
          <input
            className="form-field fle"
            name="lastName"
            placeholder="Doe"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.lastName} />

          <label className="form-label">Address:</label>
          <textarea
            className="form-field add"
            name="address"
            placeholder="Enter your full Postal Address"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.address} />

          <label className="form-label">Country:</label>
          <select
            className="form-field ctry"
            value={country}
            name="country"
            ref={register({ required: true })}
            onChange={(event) => setCountry(event.target.value || undefined)}
          >
            <option value=""></option>
            {getCountries().map((country) => (
              <option key={country} value={country}>
                {en[country]}
              </option>
            ))}
          </select>
          <ErrorMessage error={errors.country} />

          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-field fle"
            name="email"
            placeholder="example@sample.com"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.email} />

          <div className="phoneNumber">
            <label className="form-label">Phone Number:</label>
            <br />
            <input
              className="form-field countryCode"
              placeholder={value ? value.slice(0, 3) : "+91"}
              type="text"
              name="countryCode"
              value={value ? value.slice(0, 3) : "+91"}
              readOnly
              ref={register}
            ></input>
            <span style={{ display: "inline-block", width: 20 }}></span>
            <PhoneInput
              className="form-field ph-no"
              country={country}
              placeholder="1234567890"
              value={value}
              onChange={setValue}
              name="phone"
              ref={register({ required: true })}
            />
          </div>
          <ErrorMessage error={errors.phone} />
          <br />
          <br />
          <input style={CustomStyle} disabled={isSubmitting} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
