import CreateDataProduct from "@/components/CreateDataProduct/CreateDataProduct";
// import CreateDataProductFromTemplate from "@/components/CreateDataProductFromTemplate/CreateDataProductFromTemplate";
import { DataProduct } from "@/data/types";
import { Grid, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import Link from "next/link";
import styles from './page.module.css'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { common, green } from "@mui/material/colors";

export default async function TemplatesPage() {

    const dataProductsList = await fetch('http://localhost:3001/api/templates').then((res) =>
        res.json()
    );

    return (
        <main className={styles.main}>
            <Link href='/data-products'>Data Products</Link>
            <h1>Select a template</h1>
            <Grid className={styles.grid} container rowSpacing={3} columnSpacing={3}>
                {dataProductsList.map((dataProduct: any) => (
                    <DataProductTemplateList dataProduct={dataProduct} />
                ))}
                <Grid key={2} item >
                    <Card className={styles.card} sx={{ width: 564, height: 220 }}>
                        <CardContent >
                            <Typography className={styles.header}>
                                Create From Scratch
                            </Typography>
                            <Typography className={styles.description} variant="body2">
                                Create your own data product from scratch
                            </Typography>
                            <CardActions >
                                <CreateDataProduct />
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid key={3} item >
                    <Card className={styles.card} sx={{ width: 564, height: 220 }}>
                        <CardContent >
                            <Typography className={styles.header}>
                                AI Data Product Builder
                            </Typography>
                            <Typography className={styles.description} variant="body2">
                                Explain in a few words the data product that you want to create and what reports do you want to generate and the AI assistant will create a draft for you that you will be able to refine!
                            </Typography>
                            <CardActions className={styles.aiButton}>
                                <Button>
                                    <AutoFixHighIcon
                                        aria-label="menu"
                                        sx={{ mr: 2, color: common["white"] }} />
                                    <Link className={styles.aiText} underline="none" href={`/ai-assistant`}>
                                        Use AI Assistant
                                    </Link></Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </main>
    )
}

function DataProductTemplateList(dataProduct: any) {
    console.log(dataProduct.dataProduct)
    return (
        <Grid key={dataProduct.dataProduct.data[0].id} item >
            <Card className={styles.card} sx={{ width: 564, height: 192 }}>
                <CardContent >
                    <Typography className={styles.header}>
                        {dataProduct.dataProduct.data[0].name}
                    </Typography>
                    <Typography noWrap={true} className={styles.description} variant="body2">
                        {dataProduct.dataProduct.data[0].description}
                    </Typography>
                    <CardActions className={styles.button}>
                        <Button><Link className={styles.text} underline="none" href={`/data-products/${dataProduct.dataProduct.data[0].id}`}>Select</Link></Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}
