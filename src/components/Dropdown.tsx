import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IPropsDropdown {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    label?: string;
}

const Dropdown = ({value, options, onChange, label}: IPropsDropdown) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                value={value}
                label={label}
                onChange={handleChange}
            >
                {options.map((option, idx) => <MenuItem key={idx} value={option}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default Dropdown;