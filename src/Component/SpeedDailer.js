import React from 'react'
// import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const actions = [
    { icon: <AddIcon  />, name: 'Post' },
  ];
function SpeedDailer() {
    let history=useNavigate()
    const handleOpen=()=>{
    if(localStorage.getItem('token')){
        history('/addblog')
    }
    else{
        history('/login')
    }
    }
    return (
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position:"fixed",right:" 27px",top:" 32.7rem" }}
                icon={<SpeedDialIcon />}
                direction='left'
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleOpen}
                    />
                ))}
            </SpeedDial>
            );
}

export default SpeedDailer