"use client"

import { TrackingScenario } from "@/data/types"
import { Card, CardContent, IconButton, Typography, Drawer, Box, TextField, Button } from "@mui/material"
import { useState } from "react"
import styles from './AddTrackingScenario.module.css'

interface Props {
    id: string
}

export default function AddTrackingScenario({ id }: Props) {
    const [name, setName] = useState("")
    const [schema, setSchema] = useState("")
    const [description, setDescription] = useState("")

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };

    const handleAddTrackingScenario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trackingScenario: any = await fetch(`http://localhost:3001/api/data-products/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                dataProductId: id,
                name: e.target.name.value,
                schema: e.target.schema.value,
                description: e.target.description.value

            })
        }).then(
            (res) => res.json()
        )
        setName("")
        setSchema("")
        setDescription("")
    }

    return (
        <Card sx={{ width: 250, height: 50, position: 'fixed', bottom: 0 }} >
            <Button onClick={toggleDrawer}>
                Create New Event
            </Button>
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Box component="form"
                    onSubmit={handleAddTrackingScenario}
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
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h3>Schema</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="schema"
                        fullWidth
                        onChange={(e) => setSchema(e.target.value)}
                    />
                    <h3>Tracking Instructions</h3>
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        multiline
                        rows={5}
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <Button type="submit">Save</Button>

                </Box>

            </Drawer>
        </Card>
    )
}
