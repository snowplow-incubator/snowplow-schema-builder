"use client"

import { Box, Button, CardContent, Checkbox, Drawer, FormControlLabel, Grid, IconButton, TextField, Typography } from "@mui/material"
import styles from './Canvas.module.css'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useState } from 'react'

export default function Canvas({ id }: string) {
    console.log(id)
    let dataProducts = []
    const [open, setOpen] = useState(false);
    function toggleDrawer() {
        console.log("here")
        setOpen(!open)
    };


    if (typeof window !== 'undefined') {
        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify([]))
        }
        dataProducts = JSON.parse(localStorage.getItem(id))
    }

    console.log("dataProduct")
    console.log(dataProducts)



    // const trackingScenarios = dataProduct.includes.trackingScenarios
    // read in the saved tracking scenarios
    // load them into state as array of tracking scenarios
    // render them as cards
    // be able to add remove them from array of tracking scenarios
    // save them to json file

    // {dataProductsList.map((dataProduct: any) => (
    //     <DataProductTemplateList dataProduct={dataProduct} />
    // ))}
    return (
        <Grid
            container
            alignItems={"flex-start"}
            justifyContent={"space-around"}
            columnGap={4}
            rowGap={5}
            sx={{ margin: "0 auto" }}
        >{dataProducts.map((trackingScenario) =>
        (<CardContent className={styles.card} sx={{ width: 180, height: 180 }} >
            <IconButton
                onClick={toggleDrawer}
                size="large"
                edge="start"
                aria-label="menu"
                color='inherit'
            >
                <AdsClickIcon />
            </IconButton>
            <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                {trackingScenario.events[0].description}
            </Typography>
            <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                Entities Tracked {trackingScenario.entities.length}
            </Typography>
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Box component="form"
                    className={styles.form}
                    sx={{
                        '& > :not(style)': { m: 1, width: '50vw' },
                    }}
                    // onSubmit={handleUpdateTrackingScenario}
                    noValidate
                    autoComplete="off">
                    <h1>Event Details</h1>
                    <h3>Schema</h3>
                    <TextField
                        id="outlined"
                        name="schema"
                        defaultValue={trackingScenario.events[0].schema}
                        fullWidth
                    />
                    <h3>Description</h3>
                    <TextField
                        name="description"
                        defaultValue={trackingScenario.events[0].description}
                    />
                    <h3>Properties</h3>
                    <TextField
                        required
                        id="outlined"
                        name="id"
                        defaultValue={JSON.stringify(trackingScenario.events[0].properties)}
                        fullWidth
                    />
                    <br />
                    <h3>Entities</h3>

                    <TextField
                        required
                        id="outlined"
                        name="id"
                        defaultValue={JSON.stringify(trackingScenario.entities)}
                        fullWidth
                    />
                    <br />

                    {/* <FormControlLabel control={<Checkbox onChange={handleCheckbox} />} label="user" name="user" />
                    <FormControlLabel control={<Checkbox onChange={handleCheckbox} />} label="product" name="product" /> */}

                    <Button type="submit">Save</Button>
                    <br />
                    {/* <Button onClick={() => handleDelete(trackingScenario.id)}>DELETE</Button> */}
                </Box>
            </Drawer>
        </CardContent>))}</Grid>
    )
}
