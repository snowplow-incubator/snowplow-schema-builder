'use client'

import { Card, CardContent, Typography, CardActions, Button, IconButton, Drawer, Box, TextField } from "@mui/material"
import React, { useState } from "react"
import Draggable from "react-draggable"
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { TrackingScenario, } from '@/data/types';
import styles from './EventCard.module.css'
import { NextResponse } from "next/server";

interface Props {
    trackingScenario: TrackingScenario,
    params: { id: string }
}

export default function EventCard({ trackingScenario, params }: Props) {

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };

    const [name, setName] = useState("")
    const [schema, setSchema] = useState("")
    const [description, setDescription] = useState("")


    const entitiesVal = (trackingScenario?.entities?.tracked ? trackingScenario?.entities?.tracked.length : 0) + (trackingScenario?.entities?.enriched ? trackingScenario?.entities?.enriched.length : 0)
    const handleCreateTrackingScenario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.target.name.value)
        // e.name
        const trackingScenario: any = await fetch(`http://localhost:3001/api/data-products/${e.target.id.value}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: e.target.name.value,
                schema: e.target.schema.value,
                description: e.target.description.value,
                id: e.target.id.value,
                version: e.target.version.value,
            })
        }).then((res) => res.json())
        setName("")
        setSchema("")
        setDescription("")
        console.log(trackingScenario)
    }

    const handleUpdateTrackingScenario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.target.name.value)
        // e.name
        const trackingScenario: any = await fetch(`http://localhost:3001/api/data-products/${e.target.id.value}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: e.target.name.value,
                schema: e.target.schema.value,
                description: e.target.description.value,
                id: e.target.id.value,
                version: e.target.version.value,
            })
        }).then((res) => res.json())
        setName("")
        setSchema("")
        setDescription("")
        console.log(trackingScenario)
    }
    const handleDelete = async (id) => {
        console.log("id")
        console.log(id)
        const res = await fetch(`https://next.console.snowplowanalytics.com/api/msc/v1/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/1a29bdac-1b3d-4522-a6d2-17127200a078`, {
            method: 'DELETE',
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        const data = await res.json()
        return NextResponse.json(data)
    }

    return (
        <Card sx={{ width: 250, height: 150 }} >
            <CardContent>
                <IconButton
                    onClick={toggleDrawer}
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    color='inherit'
                >
                    <AdsClickIcon />
                </IconButton>
                <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                    {trackingScenario.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} variant="body2" color="text.secondary" gutterBottom>
                    Entities Tracked {entitiesVal}
                </Typography>
            </CardContent>
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
                    onSubmit={handleUpdateTrackingScenario}
                    noValidate
                    autoComplete="off">
                    <h1>Event Details</h1>
                    <h3>Name</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="name"
                        defaultValue={trackingScenario.name}
                        fullWidth
                    />
                    <h3>Schema</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="schema"
                        defaultValue={trackingScenario.event.source}
                        fullWidth
                    />
                    <h3>Tracking Instructions</h3>
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        multiline
                        rows={5}
                        defaultValue={trackingScenario.description}
                        fullWidth
                    />
                    <TextField
                        required
                        id="outlined"
                        name="id"
                        multiline
                        rows={5}
                        defaultValue={trackingScenario.id}
                        fullWidth
                    />
                    <TextField
                        required
                        id="outlined"
                        name="version"
                        multiline
                        rows={5}
                        defaultValue={trackingScenario.version}
                        fullWidth
                    />
                    <br />
                    <Button type="submit">Save</Button>
                    <br />
                    <Button onClick={() => handleDelete(trackingScenario.id)}>DELETE</Button>
                </Box>
            </Drawer>
        </Card>
    )
}
