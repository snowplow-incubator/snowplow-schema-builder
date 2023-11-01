"use client"

import { Card, Drawer, Box, TextField, Button, ButtonGroup } from "@mui/material"
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

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };
    const [openEntity, setOpenEntity] = useState(false);
    function toggleEntityDrawer() { setOpenEntity(!openEntity) };

    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        const trackingScenario = {
            "events": [
                {
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
            ],
            "entities": entities,
            "trackingScenarios": [
            ]
        }

        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify([]))
        }
        const listOfTrackingScenarios = JSON.parse(localStorage.getItem(id))
        listOfTrackingScenarios.push(trackingScenario)

        localStorage.setItem(id, JSON.stringify(listOfTrackingScenarios))

        setEventName("")
        setEventDescription("")
        setEventType("")
    }

    const handleCreateEntity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = uuidv4()
        const entity = JSON.stringify({
            "schema": `iglu:com.snowplowanalytics.snowplow/${entityName}/jsonschema/1-0-0`,
            "description": `${entityDescription}`,
            "properties": [
                {
                    "name": `${entityName}`,
                    "description": `${entityDescription}`,
                    "type": `${entityType}`,
                }
            ]
        })

        console.log("entities")
        setEntities([...entities, entity])
        console.log(entities)





        setEntityDescription("")
        setEntityName("")
        setEntityType("")
    }


    return (
        <Card sx={{ width: 250, height: 70, position: 'fixed', bottom: 0 }} >
            <ButtonGroup>
                <Button onClick={toggleDrawer}>
                    Create New Event
                </Button>
                <Button onClick={toggleEntityDrawer}>
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
