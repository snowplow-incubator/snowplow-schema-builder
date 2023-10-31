"use client"

import { DataProduct } from "@/data/types"
import { Grid, Card, CardContent } from "@mui/material"
import { useState } from "react"

export default function CreateDataProduct() {

    const [name, setName] = useState("")
    const [schema, setSchema] = useState("")
    const [description, setDescription] = useState("")

    const handleAddDataProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        const dataProduct: DataProduct = await fetch('http://localhost:3001/api/data-products', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                schema: schema,
                description: description
            })
        }).then(
            (res) => res.json()
        )
        console.log(dataProduct)
        return
    }

    return (
        <form onSubmit={handleAddDataProduct}>
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