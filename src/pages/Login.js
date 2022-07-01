
import React, { useState } from "react";

import {useNavigate} from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const navigate = useNavigate()

//   useEffect(() => {
//     
//   }, []);

  const handleLogin = () => {
    navigate(`/room?username=${username}&group=${group}`)
  };
  return (
    <div>
      <ul>
        <li>
          <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        </li>
        <li>
          <select name="group" value={group} id="group" onChange={(e)=>setGroup(e.target.value)}>
            <option value=""> pilih</option>
            <option value="php">php</option>
            <option value="javascript">javascript</option>
            <option value="golang">golang</option>
          </select>
        </li>
        <li>
          <button onClick={handleLogin}>login</button>
        </li>
      </ul>
    </div>
  );
}

export default Login;
