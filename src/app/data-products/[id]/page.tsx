import styles from './page.module.css'
import EventCard from '@/components/EventCard/EventCard'
import { Grid } from '@mui/material'
import { DataProduct, TrackingScenario } from '@/data/types';
import AddTrackingScenario from '../../../components/AddTrackingScenario/AddTrackingScenario';
import { useState } from 'react';
import Xarrow from "react-xarrows";

interface Props {
    params: { id: string }
}

export default async function TemplateBuilderPage({ params }: Props) {
    const dataProduct: DataProduct = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/data-products/v1/${params.id}`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
    ).then(
        (res) => res.json()
    )
    const trackingScenarios = dataProduct.includes.trackingScenarios


    // read in the saved tracking scenarios
    // load them into state as array of tracking scenarios
    // render them as cards
    // be able to add remove them from array of tracking scenarios
    // save them to json file

    return (
        <div className={styles.main}>
            <h1>Template - {dataProduct.data[0].name}</h1>
            <Grid
                container
                alignItems={"flex-start"}
                justifyContent={"space-around"}
                columnGap={4}
                rowGap={5}
                sx={{ margin: "0 auto" }}
            >
                {trackingScenarios.map((trackingScenario: TrackingScenario) => (
                    <EventCard key={trackingScenario.id} trackingScenario={trackingScenario} params={params} />
                ))}

                <AddTrackingScenario id={params.id} />
            </Grid>
        </div>
    )
}