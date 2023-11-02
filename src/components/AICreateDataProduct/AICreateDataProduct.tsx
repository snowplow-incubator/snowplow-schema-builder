"use client";

import { useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextareaAutosize,
} from "@mui/material";

export default function AICreateDataProduct({
  open,
  cancel,
  entities,
  events,
  useCaseDescription,
  reports,
}: {
  open: boolean;
  cancel: () => void;
  entities: any[];
  events: any[];
  useCaseDescription: string;
  reports: { description: string }[];
}) {
  const [name, setName] = useState(useCaseDescription);
  const [domain, setDomain] = useState("");
  const [owner, setOwner] = useState("");
  const [vendor, setVendor] = useState("com.snowplowanalytics.snowplow");
  const [description, setDescription] = useState(`Reports:
- ${reports.map((report) => report.description).join("\n- ")}`);

  const submitClicked = async () => {
    const dataProduct: any = await fetch("/api/data-products", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        accessInstructions: "",
        status: "draft",
        owner: owner,
        domain: domain,
      }),
    }).then((res) => res.json());

    console.log(dataProduct);

    const id = dataProduct.id;

    const trackingScenario = {
      events: events.map((event) => {
        return {
          schema: `iglu:${vendor}/${event.name}/jsonschema/1-0-0`,
          description: event.description,
          properties: event.properties,
        };
      }),
      entities: entities.map((entity) => {
        return {
          schema: `iglu:${vendor}/${entity.name}/jsonschema/1-0-0`,
          description: entity.description,
          properties: entity.properties,
        };
      }),
      trackingScenarios: [],
    };

    const listOfTrackingScenarios = JSON.parse(localStorage.getItem(id) || '[]');
    listOfTrackingScenarios.push(trackingScenario);

    localStorage.setItem(id, JSON.stringify(listOfTrackingScenarios));

    window.location.href = `/data-products/${id}`;
  };

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>Create Data Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use the suggested events and entities to create a new Data Product.
        </DialogContentText>
        <TextField
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          label="Name of the product"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="normal"
          fullWidth
          multiline
          label="Description of the product"
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="normal"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          id="domain"
          label="Vendor for events and entities in the product"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="normal"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          id="domain"
          label="Business domain of the product"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="normal"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          id="owner"
          label="Owner of the product"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={submitClicked}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
