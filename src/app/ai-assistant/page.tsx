"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { parse } from "marked";

import { TextField, Button, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import AIResponseDetail from '@/components/AIResponseDetail/AIResponseDetail';

function PageContent() {
  const [useCaseDescription, setUseCaseDescriptionState] = useState(localStorage.getItem("useCaseDescription") || "");
  const [loading, setLoading] = useState(false);
  let localStorageReports = localStorage.getItem('reports');
  const [reports, setReportsState] = useState((localStorageReports && JSON.parse(localStorageReports)) ?? [
    {
      description: 'Evaluate the performance of marketing campaigns',
    }
  ]);
  const setUseCaseDescription = (value: string) => {
    localStorage.setItem("useCaseDescription", value);
    setUseCaseDescriptionState(value);
  };
  const setReports = (value: {description: string}[]) => {
    localStorage.setItem("reports", JSON.stringify(value));
    setReportsState(value);
  }
  const [response, setResponse] = useState(localStorage.getItem("response") || "");

  const callApi = async () => {
    setLoading(true);
    let data = JSON.stringify({ useCaseDescription, reports });
    console.log("Calling api", data);

    const response = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((res) => res.json());
    console.log(response.content);
    localStorage.setItem("response", response.content);
    setResponse(response.content);
    setLoading(false);
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <h1>🪄 AI Assistant</h1>
      </Grid>

      <Grid xs={12}>
        <h3>🎯 What use case will this data product address?</h3>
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Use case description"
          variant="filled"
          value={useCaseDescription}
          onChange={(e) => setUseCaseDescription(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
      </Grid>

      <Grid xs={12}>
        <h3>❓ What reports do you want to build using the data?</h3>
      </Grid>
      {reports.map((report: any, i: number) => (
        <>
          <Grid xs={1}></Grid>
          <Grid xs={9}>
            <TextField
              fullWidth
              label="Report description"
              variant="filled"
              value={report.description}
              onChange={(e) => {
                let newReports = [...reports];
                newReports[i].description = e.target.value;
                setReports(newReports);
              }}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid xs={2}>
            <Button
              variant="outlined"
              color="error"
              style={{ marginTop: "10px" }}
              onClick={() => {
                let newReports = [...reports];
                newReports.splice(i, 1);
                setReports(newReports);
              }}
            >
              ➖ Remove
            </Button>
          </Grid>
        </>
      ))}
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Button
          onClick={() => {
            let newReports = [...reports];
            newReports.push({ description: "" });
            setReports(newReports);
          }}
          variant="outlined"
          color="success"
        >
          ➕ Add Report
        </Button>
      </Grid>

      <Grid xs={12}>
        {loading ? (
          "Loading..."
        ) : (
          <Button onClick={callApi} variant="contained">
            ⚙️ Generate events and entities
          </Button>
        )}
      </Grid>

      {!loading && response && (
        <>
          <Grid xs={12}>
            <h1 style={{ marginTop: "30px" }}>🤖 Response</h1>
          </Grid>
          <AIResponseDetail
            useCaseDescription={useCaseDescription}
            reports={reports}
            response={response}
          />
          <Grid xs={12}>
            <details>
              <summary>Raw 🤖 response</summary>
              <Paper elevation={3} style={{ padding: "10px" }}>
                <div dangerouslySetInnerHTML={{ __html: parse(response) }} />
              </Paper>
            </details>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default function AIAssistantPage() {
    return (
      <main className={styles.main}>
        <PageContent />
      </main>
    );
}
