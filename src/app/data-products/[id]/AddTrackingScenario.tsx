"use client"

import { TrackingScenario } from "@/data/types"
import { useState } from "react"

interface Props {
    id: string
}

export default function AddTrackingScenario({ id }: Props) {

    const [name, setName] = useState("")
    const [schema, setSchema] = useState("")
    const [description, setDescription] = useState("")

    const handleAddTrackingScenario = async () => {
        // const res = await fetch('https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/tracking-scenarios/v1', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         scenario: {
        //             id: id,
        //             version: 1,
        //             status: "published",
        //             name: name,
        //             description: "testing out creating tracking scenario",
        //             event: {
        //                 "source": "iglu:com.example/ui_actions/jsonschema/1-0-0"
        //             },
        //         },
        //         message: description
        //     })
        // })
        const trackingScenarios: TrackingScenario[] = await fetch(`https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/tracking-scenarios/v1`, {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }
        ).then(
            (res) => res.json()
        )

        console.log(trackingScenarios)

        setName("")
        setSchema("")
        setDescription("")
    }


    // const trackingScenarios = dataProduct.includes.trackingScenarios
    return (
        <form onSubmit={handleAddTrackingScenario}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="schema">Schema</label>
            <input type="text" name="schema" value={schema} onChange={(e) => setSchema(e.target.value)} />
            <label htmlFor="description">How to Track</label>
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Save</button>
        </form>
    )
}