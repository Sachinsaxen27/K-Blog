import React, { useContext, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import '../App.css'
import BlogAPI from '../ComponentAPI/BlogAPI'
function BlogAlert() {
    const context = useContext(BlogAPI)
    const { status,Alerts } = context
    useEffect(() => {
        if (status.msg) {
          setTimeout(() => {
            Alerts('', '');
          }, 3000);
        }
      }, [status]);
    return (
        <>
            {status.msg && <Stack sx={{ width: '22rem',zIndex:'1000000000000'}} spacing={2} className='alert'>
                {status.type === "Danger" && <Alert severity="error">{status.msg}</Alert>}
                {status.type === 'Success' && <Alert severity="success">{status.msg}</Alert>}
            </Stack>}
        </>
    )
}

export default BlogAlert