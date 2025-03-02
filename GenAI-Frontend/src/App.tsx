import { useEffect, useState } from 'react';
import './App.css';
import { Card, MuiDropDown } from "./Card";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { jobIndustries, jobTypes } from './utils';

type formType = "name" | "company" | "industry" | "type" | "role" | "experiences" | "reason";

const defaultFormData = {
  name: "",
  company: "",
  industry: "",
  type: "",
  role: "",
  experiences: "",
  reason: ""
};

function App() {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [responseData, setResponseData] = useState("");


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (field: formType) => (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setFormData(prevState => ({ ...prevState, [field]: selectedValue }));
  };

  const handleClear = () => {
    console.log("clicked clear")
    setFormData(defaultFormData)
  }

  const handleSubmit = () => {
    console.log("formData:", formData)
    fetch("http://localhost:9000/generate", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setResponseData(data["text"])
      })
      .catch(error => console.error(error));
  }

  // Log the formData whenever it changes
  useEffect(() => {
    console.log('formData updated:', formData);
  }, [formData]);

  return (
    <>
      <div className="header">Cover Letter template generator</div>

      <div className="container">
        {/* Form Container */}
        <div className="form-container">

          <TextField
            required
            id="outlined-basic"
            name="name"
            value={formData["name"]}
            label="Name"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="company"
            value={formData["company"]}
            label="Company"
            variant="outlined"
            onChange={handleChange}
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <MuiDropDown
              id="Industry"
              labelId="industryItem"
              placeholder="Industry"
              value={formData["industry"]}
              label="Industry"
              items={jobIndustries}
              handleDropdownChange={handleDropdownChange("industry")}
            />
          </FormControl>

          <TextField
            required
            id="outlined-basic"
            name="role"
            value={formData["role"]}
            label="Role"
            variant="outlined"
            onChange={handleChange}
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <MuiDropDown
              id="jobType"
              labelId="jobTypeItem"
              placeholder="Job Type"
              value={formData["type"]}
              label="Job Type"
              items={jobTypes}
              handleDropdownChange={handleDropdownChange("type")}
            />
          </FormControl>

          <TextField
            id="outlined-multiline-static"
            name="experiences"
            value={formData["experiences"]}
            label="Past Experiences"
            multiline
            rows={4}
            onChange={handleChange}
          />

          <TextField
            id="outlined-multiline-static"
            name="reason"
            value={formData["reason"]}
            label="Reason"
            multiline
            rows={4}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Generate</button>
          <button onClick={() => handleClear()}>Clear</button>
        </div>

        {/* Response Container */}
        <div className="response-container">
          <h3>Generated Cover Letter</h3>
          <pre className="wrapped-text">{responseData}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
