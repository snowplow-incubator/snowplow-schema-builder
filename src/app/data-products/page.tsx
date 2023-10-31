import { DataProduct } from "@/data/types";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";
import CreateDataProduct from "../../components/CreateDataProduct/CreateDataProduct";
import styles from './page.module.css'

export default async function DataProductsPage() {
    const dataProductList: any[] = await fetch('http://localhost:3001/api/data-products').then(
        (res) => res.json()
    )

    // console.log(dataProductList)

    return (
        <main className={styles.main}>
            <h1>Data Products</h1>
            <h3>The domains in which your organization is collecting Snowplow Data</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {dataProductList.map((dataProduct: any) => (
                    <DataProductCard key={dataProduct.id} dataProduct={dataProduct} />
                ))}
                <Grid item xs={4}>
                    <Card sx={{ width: 320, height: 290 }}>
                        <CardContent>
                            <Button variant="contained">Create New Data Product</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </main>
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