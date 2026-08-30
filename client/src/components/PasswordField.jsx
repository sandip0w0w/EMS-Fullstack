import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordField() {
  const inputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => {
    const input = inputRef.current;

    const start = input?.selectionStart;
    const end = input?.selectionEnd;

    setShowPassword((prev) => !prev);

    requestAnimationFrame (() => {
      if (input && start !== null && end !== null){
      input.setSelectionRange(start, end);
      input.focus();
      }
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  return (
    <TextField
      label="Password"
      value = {password}
      onChange={(e) => setPassword(e.target.value)}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      size="small"
      inputRef = {inputRef}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordField;