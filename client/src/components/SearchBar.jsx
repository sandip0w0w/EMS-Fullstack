import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Search } from "lucide-react";

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const handleMouseDownPassword = (event) => {
        event.preventDefault();

    };

    return (
        <TextField
            placeholder="Search employees..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            variant="outlined"
            size="small"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                                onMouseDown={handleMouseDownPassword}
                                edge="start"
                            >
                                <Search size={'13'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                width: "100%",
                height: "100%",

                '& .MuiOutlinedInput-root': {
                    height: "100%",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                },
                '& .MuiInputBase-input': {
                    fontSize: "13px"
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#615EFE",
                    boxShadow: "0px 0px 0px 1px #615efe4b"

                },
            }}
        />
    );
}

export default SearchBar;