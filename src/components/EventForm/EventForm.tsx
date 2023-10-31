import * as React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

export default function TemporaryDrawer() {
    const [open, setOpen] = useState(false);

    function toggleDrawer() { setOpen(!open) };
    return (
        <React.Fragment>
            <Button onClick={toggleDrawer}>Add Event</Button>
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Grid
                    justifyContent='center'
                    container spacing={2}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid item xs={8}>
                        <h1>Event Details</h1>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth id="outlined-basic" label="Schema" variant="outlined" />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="How to Track"
                            multiline
                            rows={
                                5}
                        />
                    </Grid>
                </Grid>
            </Drawer>
        </React.Fragment>

    );
}
