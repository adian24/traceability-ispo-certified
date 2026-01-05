import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from "@mui/icons-material/AddCircle";
import "./dynamicForm.css";

function CustomDynamicForm() {
  const [inputFields, setInputFields] = useState([{ 
      cert_name: '', 
      cert_year: '', 
      cert_iso: '',  
      cert_file: ''
    }]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeInput = (i, event) => {
    const newInputFields = inputFields.map(items => {
      if(i === items) 
        items[event.target.name] = event.target.value || event.target.files
      return items;
    })
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { 
      cert_name: '', 
      cert_year: '', 
      cert_iso: '', 
      cert_file: '' 
    }])
  }


  const handleRemoveFields = index => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value === index), 1);
    setInputFields(values);
  }


  return (
    <div className='dynamic-form'>
      {/* <p>Certificate</p> */}
      <form onSubmit={handleSubmit} >
        {inputFields.map(inputField => (
          <div key={inputField} className="d-flex justify-content-between">
            {/* certificate name */}
            <input
              className="input-name"
              name="cert_name"
              label="Certificate Name"
              placeholder='certificate name'
              value={inputField.cert_name}
              onChange={event => handleChangeInput(inputField, event)}
            />
            
            {/* validity period */}
            <input
            className='input-name'
              name='cert_year'
              id="certificateYear"
              label="Validity Period"
              type="date"
              value={inputField.cert_year}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChangeInput(inputField, event)}
            />

            <select
                className="input-name"
                name="cert_iso"
                id="certificate"
                value={inputField.cert_iso}
                onChange={event => handleChangeInput(inputField, event)}
            >
              <option disabled selected>
                Certificate
              </option>
              <option value={9001}>ISO 9001</option>
              <option value={22001}>ISO 22001</option>
              <option value={14001}>ISO 14001</option>
              <option value={45001}>ISO 45001</option>
              <option value={13485}>ISO 13485</option>
              <option value={"ISPO"}>ISPO</option>
              </select>

            <input
              className='input-name'
              name='cert_file'
              id="file"
              label="Document"
              type="file"
              value={inputField.cert_file}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChangeInput(inputField, event)}
            />
            
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField)}>
              <RemoveIcon />
            </IconButton>
            
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
            
          </div>
        ))}
        <button
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon></Icon>}
          onClick={handleSubmit}>
          Send
        </button>    
      </form>
    </div>
  );
}

export default CustomDynamicForm;