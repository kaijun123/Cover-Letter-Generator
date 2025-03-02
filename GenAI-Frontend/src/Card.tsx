import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";


interface MuiDropDownProps {
  // className: string;
  labelId: string; // links the MenuItem (dropdown item) to the Select (dropdown component)
  id: string; // links to the Select component itself
  value: string;
  label: string
  placeholder: string;
  items: string[],
  handleDropdownChange: (event: SelectChangeEvent) => void
}

export const MuiDropDown: React.FC<MuiDropDownProps> = ({
  labelId,
  id,
  value,
  label,
  placeholder,
  items,
  handleDropdownChange
}) => {

  return (
    <>
      <InputLabel id={labelId}>{placeholder}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={handleDropdownChange}
      >
        <MenuItem value="">
          <em>Not Applicable</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item} >
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};


export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div>{children}</div>;
};