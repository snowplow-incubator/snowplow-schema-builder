"use client"

import { DataProduct } from "@/data/types"
import { Grid, Card, CardContent, Button, Box, Drawer, TextField, CardActions, Link } from "@mui/material"
import { useState } from "react"
import styles from './CreateDataProduct.module.css'
import { redirect, useRouter } from 'next/navigation'

export default function CreateDataProduct() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState("")
    const [accessInstructions, setAccessInstruction] = useState("")
    const [status, setStatus] = useState("draft")
    const [domain, setDomain] = useState("")

    const [open, setOpen] = useState(false);
    function toggleDrawer() { setOpen(!open) };

    const handleAddDataProduct = async (e) => {
        e.preventDefault()
        const dataProduct: any = await fetch("http://localhost:3001/api/data-products", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                accessInstructions: accessInstructions,
                status: status,
                owner: owner,
                domain: domain,
            }),
        }).then((res) => res.json());

        console.log("dataProduct");
        console.log(dataProduct);

        const id = dataProduct.id;

        const trackingScenario = {
            events: [],
            entities: [],
            trackingScenarios: []
        };

        const listOfTrackingScenarios = JSON.parse(localStorage.getItem(id) || '[]');
        listOfTrackingScenarios.push(trackingScenario);

        localStorage.setItem(id, JSON.stringify(listOfTrackingScenarios));

        window.location.href = `/data-products/${id}`;
    }


    // const handleAddDataProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    //     const dataProduct: void = await fetch('http://localhost:3001/api/data-products', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: e.target.name.value,
    //             description: e.target.description.value,
    //             accessInstructions: e.target.accessInstructions.value,
    //             status: e.target.status.value,
    //             owner: e.target.owner.value,
    //             domain: e.target.domain.value
    //         })
    //     }).then(
    //         (res) => res.json()
    //     )
    // }

    return (
        <Card>
            <Button onClick={toggleDrawer} className={styles.button}>Select</Button>
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
            >
                <Box component="form"
                    onSubmit={handleAddDataProduct}
                    className={styles.form}
                    sx={{
                        '& > :not(style)': { m: 1, width: '50vw' },
                    }}
                    noValidate
                    autoComplete="off">
                    <h1>Data Product Details</h1>
                    <h3>Name</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="name"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <h3>Status</h3>
                    <TextField
                        required
                        id="outlined"
                        name="status"
                        fullWidth
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <br />
                    <h3>Owner</h3>
                    <TextField
                        required
                        id="outlined"
                        name="owner"
                        fullWidth
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    <br />
                    <h3>Domain</h3>
                    <TextField
                        required
                        id="outlined"
                        name="domain"
                        fullWidth
                        onChange={(e) => setDomain(e.target.value)}
                    />
                    <br />
                    <h3>Description</h3>
                    <TextField
                        required
                        id="outlined"
                        name="description"
                        multiline
                        rows={2}
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <h3>Access Instructions</h3>
                    <TextField
                        required
                        id="outlined"
                        name="accessInstructions"
                        multiline
                        rows={2}
                        fullWidth
                        onChange={(e) => setAccessInstruction(e.target.value)}
                    />
                    <br />

                    <Button type="submit">Save</Button>

                </Box>
            </Drawer>
        </Card>
    )
}
