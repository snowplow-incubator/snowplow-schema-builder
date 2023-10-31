import DataProductCardList from "@/components/DataProductCardList/DataProductCardList";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";
import styles from './page.module.css'

export default async function DataProductsPage() {
    return (
        <main className={styles.main}>
            <h1>Data Products</h1>
            <h3>The domains in which your organization is collecting Snowplow Data</h3>
            <DataProductCardList />
        </main >
    )
}