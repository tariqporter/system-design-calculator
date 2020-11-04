import React, { createRef, useState } from 'react';
import { TextField, Typography, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import './App.css';
import { calculate } from './calculate';

export default function App() {
  const [eq, setEq] = useState('');
  const [answer, setAnswer] = useState(['', '']);
  const inputRef = createRef();

  const onChange = (e) => {
    const val = e.target.value;
    const ans = calculate(val);
    setAnswer(ans);
    setEq(val);
  };

  const clear = () => {
    setAnswer(['', '']);
    setEq('');
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <div>
        <TextField
          inputRef={inputRef}
          style={{ width: 300 }}
          label="Enter equation"
          value={eq}
          onChange={onChange}
          autoFocus
          InputProps={{
            endAdornment: (
              <IconButton onClick={clear} size="small">
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        <div>
          <Typography display="inline" variant="h4">
            {answer[0]}
          </Typography>
          <Typography display="inline" variant="h6" color="textSecondary">
            {answer[1]}
          </Typography>
        </div>
      </div>
    </div>
  );
}
