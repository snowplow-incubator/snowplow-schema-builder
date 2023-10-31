'use client'

import { Card, CardContent, Typography, CardActions, Button, IconButton, Drawer, Box, TextField, Grid, Link } from "@mui/material"
import React, { useState } from "react"
import { useDataProductsList } from "@/hooks";

export default function DataProductCardList() {
    const { dataProductsList, isLoading, error } = useDataProductsList()
    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {dataProductsList.data.map((dataProduct: any) => (
                <DataProductCard key={dataProduct.id} dataProduct={dataProduct} />
            ))}
            <Grid item xs={4}>
                <Card sx={{ width: 320, height: 290 }}>
                    <CardContent>
                        <Button variant="contained"><Link href={`/data-products/templates`}>Create New Data Product</Link></Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

function DataProductCard(dataProduct: any) {
    return (
        <Grid item >
            <Card sx={{ width: 320, height: 290 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {dataProduct.dataProduct.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        product
                    </Typography>
                    <Typography variant="body2">
                        {dataProduct.dataProduct.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`/data-products/${dataProduct.dataProduct.id}`}>Explore</Link>
                </CardActions>
            </Card>
        </Grid>
    )
}