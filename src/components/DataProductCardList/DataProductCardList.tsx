'use client'

import { Card, CardContent, Typography, CardActions, Button, IconButton, Drawer, Box, TextField, Grid, Link } from "@mui/material"
import React, { useState } from "react"
import { useDataProductsList } from "@/hooks";
import styles from './DataProductCardList.module.css'

export default function DataProductCardList() {
    const { dataProductsList, isLoading, error } = useDataProductsList()
    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Grid className={styles.grid} container rowSpacing={3} columnSpacing={3}>
            {dataProductsList.data.map((dataProduct: any) => (
                <DataProductCard key={dataProduct.id} dataProduct={dataProduct} />
            ))}
            <Grid item >
                <Card className={styles.createCard} sx={{ width: 373, height: 323 }}>
                    <CardContent>
                        <Link className={styles.button} underline="none" component="button" ><Link className={styles.button} underline="none" href={`/data-products/templates`}>Create New Data Product</Link></Link>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

function DataProductCard(dataProduct: any) {
    return (
        <Grid item >
            <Card className={styles.card} sx={{ width: 373, height: 323 }}>
                <CardContent >
                    <Typography className={styles.header}>
                        {dataProduct.dataProduct.name}
                    </Typography>
                    <Typography className={styles.pill}>
                        Product
                    </Typography>
                    <Typography noWrap={true} className={styles.description} variant="body2">
                        {dataProduct.dataProduct.description}
                    </Typography>
                    <CardActions >
                        <Link className={styles.link} underline="none" component="button" ><Link className={styles.text} underline="none" href={`/data-products/${dataProduct.dataProduct.id}`}>Explore Me</Link></Link>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}