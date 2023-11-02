"use client"

import { Box, Button, CardContent, Checkbox, Drawer, FormControlLabel, Grid, IconButton, TextField, Typography } from "@mui/material"
import styles from './Canvas.module.css'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useState } from 'react'
import Draggable from "react-draggable";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function Canvas({ id }: string) {
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
            localStorage.setItem(id, JSON.stringify([{ events: [], entities: [], trackingScenarios: [] }]))
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
        const entities = []

        for (let i = 0; i < dataProducts[0].entities.length; i++) {
            if (entitiesAdd.hasOwnProperty(dataProducts[0].entities[i].description)) {
                if (entitiesAdd[dataProducts[0].entities[i].description]) {
                    entities.push(dataProducts[0].entities[i])
                }
            }
        }

        const trackingScenarios = dataProducts[0].trackingScenarios

        for (let i = 0; i < trackingScenarios.length; i++) {
            if (trackingScenarios[i].id === event.target.id.value) {
                trackingScenarios.splice(i, 1);

            }
        }

        const trackingScenario =
        {
            id: event.target.id.value,
            dataProductId: event.target.dataProductId.value,
            status: event.target.status.value,
            name: event.target.name.value,
            description: event.target.description.value,
            event: {
                description: event.target.description.value,
                name: event.target.name.value,
                properties: JSON.parse(event.target.properties.value)
            },
            entities: entities,
        }

        trackingScenarios.push(trackingScenario)

        const dataProductNew = [{
            entities: dataProducts[0].entities,
            events: dataProducts[0].events,
            trackingScenarios: trackingScenarios
        }]

        console.log(dataProductNew)

        localStorage.setItem(id, JSON.stringify(dataProductNew))

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
        <>
            <Button className={styles.button} href="/data-products/"><FileUploadOutlinedIcon />Publish</Button>
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
                        <Grid item key={trackingScenario.id} >
                            <CardContent className={styles.card} sx={{ width: 180, height: 130 }} >
                                <Grid>
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

                                </Grid>

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
                                            name="name"
                                            defaultValue={trackingScenario.event.name}
                                            fullWidth
                                        />
                                        <h3>Description</h3>
                                        <TextField
                                            name="description"
                                            defaultValue={trackingScenario.description}
                                        />
                                        <h3>Status</h3>
                                        <TextField
                                            sx={{ display: 'none' }}
                                            name="id"
                                            defaultValue={trackingScenario.id}
                                        />
                                        <TextField
                                            sx={{ display: 'none' }}
                                            name="dataProductId"
                                            defaultValue={trackingScenario.dataProductId}
                                        />
                                        <TextField
                                            name="status"
                                            defaultValue={trackingScenario.status}
                                        />
                                        <TextField
                                            sx={{ display: 'none' }}
                                            name="properties"
                                            defaultValue={JSON.stringify(trackingScenario.event.properties)}
                                        />
                                        <h3>Entities</h3>
                                        {/* entitiesAdd.hasOwnProperty(dataProducts[0].entities[i].description) */}
                                        {entities.map((entity) => (
                                            <>
                                                <FormControlLabel key={entity.description} control={<Checkbox onChange={handleCheckbox} />} label={entity.description} name={entity.description} />
                                                <br />
                                            </>
                                        ))}
                                        <Button type="submit">Save</Button>
                                        <br />
                                    </Box>
                                </Drawer>
                            </CardContent>
                            <Grid
                                container
                                alignItems={"flex-start"}
                                justifyContent={"space-around"}
                                columnGap={0}
                                className={styles.entityGrid}
                                rowGap={1}
                            >
                                {trackingScenario.entities.map((entity) => (
                                    <Grid className={styles.entity} item>{entity.schema.split("/")[1]}</Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Draggable>
                ))}
            </Grid>
        </>
    )
}
