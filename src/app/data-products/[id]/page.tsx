import styles from './page.module.css'
import EventCard from '@/components/EventCard/EventCard'
import { Grid } from '@mui/material'
import { DataProduct, TrackingScenario } from '@/data/types';
import AddTrackingScenario from './AddTrackingScenario';

interface Props {
    params: { id: string }
}

export default async function TemplateBuilderPage({ params }: Props) {
    const dataProduct: DataProduct = await fetch(`https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/data-products/v1/${params.id}`, {
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
    // const dataProduct = dataProductList.find((dataProduct) => dataProduct.id === params.id)


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
                columnGap={1}
                rowGap={1}
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