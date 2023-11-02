"use client";

import { useState } from "react";

import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AICreateDataProduct from "../AICreateDataProduct/AICreateDataProduct";

function parseResponse(response: string) {
  const regex = /(\n\[[\s\S]+\n\])[\s\S]+(\n\[[\s\S]+\n\])/;
  const found = response.match(regex);

  if (found?.length === 3) {
    return {
      events: JSON.parse(found[1]),
      entities: JSON.parse(found[2]),
    };
  } else {
    return null;
  }
}

function toSnakeCase(str: string) { 
    let match = str && str.match( 
/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) 
    return match && match.map((s) => s.toLowerCase()).join("_"); 
} 

function filterProperties(properties: any[]) {
  return properties.filter((property) => {
    return ["string", "number", "boolean", "integer"].includes(property.type);
  });
}

function processEventsOrEntities(events: any[]) {
    return events.map(event => {
        return {
            name: toSnakeCase(event.name),
            description: event.description,
            properties: filterProperties(event.properties).map(property => {
                return {
                    name: toSnakeCase(property.name),
                    description: property.description,
                    type: property.type,
                }
            })
        }
    })
}

function EventOrEntityCard({
  eventOrEntity,
  remove,
}: {
  eventOrEntity: any;
  remove: () => void;
}) {
  return (
    <Card>
      <CardHeader title={eventOrEntity.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {eventOrEntity.description}
        </Typography>

        <br />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Property</b>
              </TableCell>
              <TableCell>
                <b>Type</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterProperties(eventOrEntity.properties).map(
              (property: any, n: number) => (
                <TableRow key={n}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.description}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardActions>
        <Button onClick={remove} size="small" variant="outlined" color="error">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ResponseDetail({
  useCaseDescription,
  reports,
  response,
}: {
  useCaseDescription: string;
  reports: { description: string }[];
  response: string;
}) {
  let parsed = parseResponse(response);
  const [entities, setEntities] = useState(
    processEventsOrEntities(parsed?.entities ?? [])
  );
  const [events, setEvents] = useState(
    processEventsOrEntities(parsed?.events ?? [])
  );
  const [creatingDataProduct, setCreatingDataProduct] = useState(false);

  return (
    <>
      <Grid xs={12}>
        <h2>Entities</h2>
      </Grid>
      {entities.map((entity: any, i: number) => (
        <Grid xs={4} key={i}>
          <EventOrEntityCard
            eventOrEntity={entity}
            remove={() => {
              let newEntities = [...entities];
              newEntities.splice(i, 1);
              setEntities(newEntities);
            }}
          />
        </Grid>
      ))}
      <Grid xs={12}>
        <h2>Events</h2>
      </Grid>
      {events.map((event: any, i: number) => (
        <Grid xs={4} key={i}>
          <EventOrEntityCard
            eventOrEntity={event}
            remove={() => {
              let newEvents = [...events];
              newEvents.splice(i, 1);
              setEvents(newEvents);
            }}
          />
        </Grid>
      ))}
      <Grid xs={12} style={{ marginTop: "50px", marginBottom: "50px" }}>
        {creatingDataProduct ? null : (
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              setCreatingDataProduct(true);
            }}
          >
            Create Data Product using the events and entities
          </Button>
        )}
        <AICreateDataProduct
          useCaseDescription={useCaseDescription}
          reports={reports}
          entities={entities}
          events={events}
          open={creatingDataProduct}
          cancel={() => setCreatingDataProduct(false)}
        />
      </Grid>
    </>
  );
}
