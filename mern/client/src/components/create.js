import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    familyName: "",
    givenName: "",
    phoneNumbers: "",
    emailAddresses: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ familyName: "", givenName: "", phoneNumbers: "", emailAddresses: "", });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="familyName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="familyName"
            value={form.familyName}
            onChange={(e) => updateForm({ familyName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="givenName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="givenName"
            value={form.givenName}
            onChange={(e) => updateForm({ givenName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumbers">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumbers"
            value={form.phoneNumbers}
            onChange={(e) => updateForm({ phoneNumbers: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailAddresses">E-mail</label>
          <input
            type="text"
            className="form-control"
            id="emailAddresses"
            value={form.emailAddresses}
            onChange={(e) => updateForm({ emailAddresses: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
            style={{'background-color':' rgb(0 45 116)', 'color':'white'}}
          />
        </div>
      </form>
    </div>
  );
}
