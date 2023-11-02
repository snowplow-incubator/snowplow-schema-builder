"use client"

import { Card, Drawer, Box, TextField, Button, ButtonGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import styles from './AddTrackingScenario.module.css'
import { v4 as uuidv4 } from 'uuid';

interface Props {
    id: string
}

export default function AddTrackingScenario({ id }: Props) {
    const [eventName, setEventName] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventType, setEventType] = useState("")
    const [entityName, setEntityName] = useState("")
    const [entityDescription, setEntityDescription] = useState("")
    const [entityType, setEntityType] = useState("")
    const [entities, setEntities] = useState([])
    const [events, setEvents] = useState([])
    // const [trackingScenarios, setTrackingScenarios] = useState([])

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };
    const [openEntity, setOpenEntity] = useState(false);
    function toggleEntityDrawer() { setOpenEntity(!openEntity) };

    if (localStorage.getItem(id) === null) {
        localStorage.setItem(id, JSON.stringify({ events: [], entities: [], trackingScenarios: [] }))
    }
    const localStorageData = JSON.parse(localStorage.getItem(id))

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntities({
            ...entities,
            [event.target.name]: event.target.checked,
        });
        console.log("entities")
        console.log(entities)
    };

    const trackingScenarios = localStorageData.trackingScenarios
    // console.log(trackingScenarios)

    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {

        const event = {
            "schema": `iglu:com.snowplowanalytics.snowplow/${eventName}/jsonschema/1-0-0`,
            "description": eventDescription,
            "properties": [
                {
                    "name": eventName,
                    "description": eventDescription,
                    "type": eventType,
                }
            ]
        }

        const trackingScenario =
        {
            "id": "d1336abc-1b60-46f7-be2d-2105f2daf283",
            "version": 27,
            "status": "published",
            "name": "Search",
            "appIds": [
                "ios",
                "android"
            ],
            "owner": "51982e6e-af2e-426e-b50e-9893b1dcdbdd",
            "description": "Tracking the use of the search box",
            "triggers": [
                "On the homepage, when the user types in the search box"
            ],
            "event": event,
            "entities": entities,
            "author": "30eae886-b8de-4411-9ce2-32fe5ecda610",
            "message": "Fixed errors",
            "date": "2023-04-25T14:27:10.184187Z"
        }

        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify({ events: [], entities: [], trackingScenarios: [] }))
        }
        const localStorageData = JSON.parse(localStorage.getItem(id))

        localStorageData.events.push(event)
        localStorageData.trackingScenarios.push(trackingScenario)
        localStorage.setItem(id, JSON.stringify(localStorageData))

    }

    const handleCreateEntity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const entity = {
            "schema": `iglu:com.snowplowanalytics.snowplow/${entityName}/jsonschema/1-0-0`,
            "description": `${entityDescription}`,
            "properties": [
                {
                    "name": `${entityName}`,
                    "description": `${entityDescription}`,
                    "type": `${entityType}`,
                }
            ]
        }

        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify({ events: [], entities: [], trackingScenarios: [] }))
        }

        const localStorageData = JSON.parse(localStorage.getItem(id))
        localStorageData.entities.push(entity)
        localStorage.setItem(id, JSON.stringify(localStorageData))
    }

    const publishedEntities = JSON.parse(localStorage.getItem(id)).entities
    console.log(publishedEntities)


    return (
        <Card>
            <ButtonGroup className={styles.card} >
                <Button className={styles.button} onClick={toggleDrawer}>
                    Create New Event
                </Button>
                <Button className={styles.button} onClick={toggleEntityDrawer}>
                    Create New Entity
                </Button>
            </ButtonGroup>

            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Box component="form"
                    onSubmit={handleAddEvent}
                    className={styles.form}
                    sx={{
                        '& > :not(style)': { m: 1, width: '50vw' },
                    }}
                    noValidate
                    autoComplete="off">
                    <h1>Event Details</h1>
                    <h3>Name</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="name"
                        fullWidth
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    <h3>Description</h3>
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        multiline
                        rows={3}
                        fullWidth
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                    <br />

                    {publishedEntities.map((entity) =>
                        <FormControlLabel control={<Checkbox onChange={handleCheckbox} />} label={entity.properties[0].name} name={entity.properties[0].name} />)
                    }




                    <Button type="submit">Save</Button>

                </Box>

            </Drawer>
            <Drawer
                anchor='right'
                open={openEntity}
                onClose={toggleEntityDrawer}
            >
                <Box component="form"
                    onSubmit={handleCreateEntity}
                    className={styles.form}
                    sx={{
                        '& > :not(style)': { m: 1, width: '50vw' },
                    }}
                    noValidate
                    autoComplete="off">
                    <h1>Entity Details</h1>
                    <h3>Name</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="name"
                        fullWidth
                        onChange={(e) => setEntityName(e.target.value)}
                    />
                    <h3>Properties</h3>

                    <TextField
                        required
                        id="outlined"
                        name="name"
                        label="name"
                        fullWidth
                        onChange={(e) => setEntityName(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        label="description"
                        fullWidth
                        onChange={(e) => setEntityDescription(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined"
                        name="type"
                        label="type"
                        fullWidth
                        onChange={(e) => setEntityType(e.target.value)}
                    />
                    <br />
                    <Button type="submit">Save</Button>
                </Box>
            </Drawer>
        </Card>
    )
}
