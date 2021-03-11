import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <span className="form-span">*This is required</span>;
      case "minLength":
        return (
          <span className="form-span">*Phone Number must be of 10 digits</span>
        );
      case "maxLength":
        return (
          <span className="form-span">*Phone Number must be of 10 digits</span>
        );
      default:
        return null;
    }
  }

  return null;
}
