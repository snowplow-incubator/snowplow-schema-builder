"use client"

import { Box, Button, CardContent, Checkbox, Drawer, FormControlLabel, Grid, IconButton, TextField, Typography } from "@mui/material"
import styles from './Canvas.module.css'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useState } from 'react'
import Draggable from "react-draggable";

export default function Canvas({ id }: string) {
    console.log(id)
    let dataProducts = [{ event: [], entities: [], trackingScenarios: [] }]
    let entities = []
    let trackingScenarios = []
    const [open, setOpen] = useState("");
    function toggleDrawer(id) {
        setOpen(id)
    };

    const [entitiesAdd, setEntitiesAdd] = useState([])

    if (typeof window !== 'undefined') {
        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify([]))
        }
        dataProducts = JSON.parse(localStorage.getItem(id))
        console.log(dataProducts)
    }

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntitiesAdd({
            ...entitiesAdd,
            [event.target.name]: event.target.checked,
        });
    };

    const handleUpdateScenario = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.value)
    };
    trackingScenarios = dataProducts[0].trackingScenarios
    entities = dataProducts[0].entities
    console.log(trackingScenarios)

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
        >
            {trackingScenarios.map((trackingScenario) =>
            (
                <Draggable>
                    <Grid item key={trackingScenario.id} ><CardContent className={styles.card} sx={{ width: 180, height: 180 }} >
                        <IconButton
                            onClick={() => toggleDrawer(trackingScenario.id)}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            color='inherit'
                        >
                            <AdsClickIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                            {trackingScenario.event.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                            Entities Tracked {trackingScenario.entities.length}
                        </Typography>
                        <Drawer
                            anchor='right'
                            open={open === trackingScenario.id}
                            onClose={toggleDrawer}
                        >
                            <Box component="form"
                                className={styles.form}
                                sx={{
                                    '& > :not(style)': { m: 1, width: '50vw' },
                                }}
                                onSubmit={handleUpdateScenario} >
                                <h1>Event Details</h1>
                                <h3>Name</h3>
                                <TextField
                                    id="outlined"
                                    name="schema"
                                    defaultValue={trackingScenario.event.name}
                                    fullWidth
                                />
                                <h3>Description</h3>
                                <TextField
                                    name="description"
                                    defaultValue={trackingScenario.description}
                                />
                                <h3>ID</h3>
                                <TextField
                                    name="id"
                                    defaultValue={trackingScenario.id}
                                />
                                <h3>Entities</h3>

                                {entities.map((entity) => (
                                    <FormControlLabel key={entity.description} control={<Checkbox onChange={handleCheckbox} />} label={entity.description} name={entity.description} />
                                ))}
                                <Button type="submit">Save</Button>
                                <br />
                            </Box>
                        </Drawer>
                    </CardContent>
                    </Grid>
                </Draggable>))}
        </Grid>
    )
}
