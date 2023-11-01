"use client"
import styles from './page.module.css'
import EventCard from '@/components/EventCard/EventCard'
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { DataProduct, TrackingScenario } from '@/data/types';
import AddTrackingScenario from '../../../components/AddTrackingScenario/AddTrackingScenario';
import { useEffect } from 'react';
import Xarrow from "react-xarrows";
import Canvas from '@/components/Canvas/Canvas';

interface Props {
    params: { id: string }
}

export default function TemplateBuilderPage({ params }: Props) {
    return (
        <div className={styles.main}>
            <Canvas id={params.id} />
            <AddTrackingScenario id={params.id} />
        </div >
    )
}