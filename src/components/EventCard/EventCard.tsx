'use client'

import { Card, CardContent, Typography, CardActions, Button, IconButton, Drawer } from "@mui/material"
import React, { useState } from "react"
import Draggable from "react-draggable"
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { v4 as uuidv4 } from 'uuid';
import CreateEvent from "@/app/data-products/[id]/AddTrackingScenario";
import { DataProduct, TrackingScenario, defaultTrackingScenario } from '@/data/types';

interface Props {
    trackingScenario: TrackingScenario | undefined,
    params: { id: string }
}

export default function EventCard({ trackingScenario, params }: Props) {

    const [open, setOpen] = useState(false);
    // const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     const formData = new FormData(e.currentTarget);

    //     let newEvent: TrackingScenario = {
    //         ...defaultTrackingScenario,
    //         id: uuidv4(),
    //         name: formData.get("name")?.toString(),
    //         appIds: ["test"],
    //         owner: "me",
    //         description: formData.get("description")?.toString(),
    //         triggers: ["onClick"],
    //         event: {
    //             source: "iglu:com.example/ui_actions/jsonschema/1-0-0",
    //             schema: {
    //                 $schema: formData.get("schema")?.toString(),
    //                 description: "This is a new",
    //                 type: "object",
    //                 required: [
    //                     "label",
    //                     "action"
    //                 ],
    //                 properties: {
    //                     action: {
    //                         type: "string",
    //                         enum: [
    //                             "click"
    //                         ]
    //                     },
    //                     label: {
    //                         type: "string",
    //                         enum: [
    //                             "Search"
    //                         ]
    //                     }
    //                 },
    //                 additionalProperties: false
    //             }
    //         },
    //         entities: {
    //             tracked: [
    //                 {
    //                     source: "iglu:com.snowplowanalytics.snowplow/web_page/1-0-0",
    //                     minCardinality: 1,
    //                     maxCardinality: 1,
    //                 }
    //             ],
    //             enriched: [
    //                 {
    //                     source: "iglu:com.snowplowanalytics.snowplow/ua_parser_context/1-0-0",
    //                     minCardinality: 1,
    //                     maxCardinality: 1
    //                 }
    //             ]
    //         },
    //         author: "30eae886-b8de-4411-9ce2-32fe5ecda610",
    //         message: "Fixed errors",
    //         date: "2023-04-25T14:27:10.184187Z",
    //     }
    // }


    function toggleDrawer() { setOpen(!open) };

    if (!trackingScenario) {
        return (
            <div>
                <Button onClick={toggleDrawer}>Add Event</Button>
                <Drawer
                    anchor='right'
                    open={open}
                    onClose={toggleDrawer}
                >
                    <CreateEvent id={params.id} />
                </Drawer>
            </div >
        )
    }
    return (
        <Draggable >
            <Card sx={{ width: 150, height: 150 }} >
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
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {trackingScenario.name}
                    </Typography>
                </CardContent>
                <Drawer
                    anchor='right'
                    open={open}
                    onClose={toggleDrawer}
                >
                    <form>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" defaultValue={trackingScenario.name} />
                        <label htmlFor="schema">Schema</label>
                        <input type="text" name="schema" />
                        <label htmlFor="description">How to Track</label>
                        <input type="text" name="description" />
                        <button type="submit">Save</button>
                    </form>
                </Drawer>
            </Card>
        </Draggable>
    )
}
