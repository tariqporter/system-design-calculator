import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import "./App.css";
import { calculate } from "./calculate";

export default function App() {
  const [eq, setEq] = useState("");
  const [answer, setAnswer] = useState(["", ""]);

  const onChange = (e) => {
    const val = e.target.value;
    const ans = calculate(val);
    setAnswer(ans);
    setEq(val);
  };

  return (
    <div className="App">
      <div>
        <TextField
          style={{ width: 300 }}
          label="Enter equation"
          value={eq}
          onChange={onChange}
          autoFocus
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
