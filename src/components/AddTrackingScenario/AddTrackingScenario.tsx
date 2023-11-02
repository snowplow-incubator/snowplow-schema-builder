"use client"

import { Card, Drawer, Box, TextField, Button, ButtonGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import styles from './AddTrackingScenario.module.css'
import { v4 as uuidv4 } from 'uuid';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
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
    const [entitiesAdd, setEntitiesAdd] = useState([])
    const [events, setEvents] = useState([])
    // const [trackingScenarios, setTrackingScenarios] = useState([])

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };
    const [openEntity, setOpenEntity] = useState(false);
    function toggleEntityDrawer() { setOpenEntity(!openEntity) };
    let dataProduct = [{ event: [], entities: [], trackingScenarios: [] }]
    let entitiesList = []

    if (typeof window !== 'undefined') {
        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify([{ events: [], entities: [], trackingScenarios: [] }]))
        }
        dataProduct = JSON.parse(localStorage.getItem(id))
    }

    entitiesList = dataProduct[0].entities

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntitiesAdd({
            ...entitiesAdd,
            [event.target.name]: event.target.checked,
        });
    };


    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        const entities = []

        for (let i = 0; i < dataProduct[0].entities.length; i++) {
            if (entitiesAdd.hasOwnProperty(dataProduct[0].entities[i].description)) {
                if (entitiesAdd[dataProduct[0].entities[i].description]) {
                    entities.push(dataProduct[0].entities[i])
                }
            }
        }
        const event = {
            "schema": `iglu:com.snowplowanalytics.snowplow/${eventName}/jsonschema/1-0-0`,
            "description": eventDescription,
            "name": eventName,
            "properties": [
                {
                    "name": eventName,
                    "description": eventDescription,
                    "type": eventType,
                }
            ]
        }

        console.log("gets here")


        const trackingScenario =
        {
            "id": uuidv4(),
            "version": 27,
            "status": "published",
            "name": eventName,
            "appIds": [
                "ios",
                "android"
            ],
            "owner": "51982e6e-af2e-426e-b50e-9893b1dcdbdd",
            "description": eventDescription,
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

        localStorageData[0].events.push(event)
        localStorageData[0].trackingScenarios.push(trackingScenario)
        localStorage.setItem(id, JSON.stringify(localStorageData))

    }

    const handleCreateEntity = async (e: React.FormEvent<HTMLFormElement>) => {
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
        localStorageData[0].entities.push(entity)
        localStorage.setItem(id, JSON.stringify(localStorageData))
    }



    return (
        <Card className={styles.card}>
            <Button className={styles.button} onClick={toggleDrawer}>
                <NearMeOutlinedIcon />
                Create New Event
            </Button>
            <Button className={styles.button} onClick={toggleEntityDrawer}>
                <ViewInArIcon />

                Create New Entity
            </Button>
            <Button className={styles.aiButton} href="/ai-assistant/">
                <AutoFixHighIcon />
                AI Assistant
            </Button>

            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Box component="form"
                    onSubmit={handleAddEvent}
                    className={styles.form}
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50vw' },
                    }}>

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
                    <h3>Status</h3>
                    <TextField
                        sx={{ display: 'none' }}
                        name="id"
                        fullWidth
                    />
                    <TextField
                        sx={{ display: 'none' }}
                        name="dataProductId"
                        fullWidth
                    />
                    <TextField
                        name="status"
                        fullWidth
                    />
                    <TextField
                        sx={{ display: 'none' }}
                        name="properties"
                        fullWidth
                    />
                    <h3>Entities</h3>
                    <br />
                    {entitiesList.map((entity) => (
                        <>
                            <FormControlLabel key={entity.description} control={<Checkbox onChange={handleCheckbox} />} label={entity.description} name={entity.description} />
                            <br />
                        </>))}
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
                    <br />
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        label="description"
                        fullWidth
                        onChange={(e) => setEntityDescription(e.target.value)}
                    />
                    <br />

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
