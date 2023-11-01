// "use client"

// import { DataProduct } from "@/data/types"
// import { Grid, Card, CardContent, CardActions, Link, Button, Typography, Box, TextField } from "@mui/material"
// import { redirect } from "next/navigation"
// import { useState } from "react"
// import styles from './CreateDataProductFromTemplate.module.css'

// export default function CreateDataProductFromTemplate(dataProduct: any) {

//     const dataProductObj = dataProduct.dataProduct.dataProduct


//     const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         // console.log(e.target.schema.value)

//         const dataProduct = JSON.parse(e.target.schema.value)
//         // console.log(dataProduct)
//         const trackingScenarios = dataProduct.data[0].trackingScenarios

//         const dataProductNew: DataProduct = await fetch('http://localhost:3001/api/data-products', {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: dataProduct.data[0].name,
//                 description: dataProduct.data[0].description,
//                 domain: dataProduct.data[0].domain,
//                 owner: dataProduct.data[0].owner,
//                 accessInstructions: dataProduct.data[0].accessInstructions,
//                 status: "draft",
//             })
//         }).then(
//             (res) => res.json()
//         ).then((data) => {
//             for (let i = 0; i < trackingScenarios.length; i++)
//                 const id = data.id

//             const trackingScenario: any = await fetch(`http://localhost:3001/api/data-products/${id}`, {
//                 method: 'POST',


//             })
//             return
//         }

//     return (
//             <CardActions className={styles.button}>
//                 <Box component="form"
//                     onSubmit={handleAdd}
//                     className={styles.form}
//                     sx={{
//                         '& > :not(style)': { m: 1, width: '50vw' },
//                     }}>
//                     <TextField
//                         required
//                         id="outlined"
//                         name="schema"
//                         multiline
//                         rows={5}
//                         fullWidth
//                         defaultValue={JSON.stringify(dataProductObj)}
//                         sx={{ display: 'none' }}
//                     />
//                     <Button type="submit" className={styles.text}>Select</Button>
//                 </Box>
//             </CardActions>

//         )
//     }
