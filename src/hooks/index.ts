import { useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";

import { DATA_PRODUCTS_LIST, TRACKING_SCENARIOS_LIST, ACCESS_TOKEN } from "@/constants";

const header = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9EVXpSa0ZHUkRRNE5rVTROVVV5TjBVNU16RkVRa1JFUWpjMFJFWTRPVFEwTkRjNVFVWkNOQSJ9.eyJodHRwczovL3Nub3dwbG93YW5hbHl0aWNzLmNvbS9yb2xlcyI6eyJ1c2VyIjp7ImlkIjoiOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1Iiwib3JnYW5pemF0aW9uIjp7ImlkIjoiMTc3MjM0ZGYtZDQyNS00MTJlLWFkOGQtOGI5NzUxNWIyODA3IiwibmFtZSI6IlNub3dwbG93IE1TQyBBV1MifSwibmFtZSI6IkFQSS1LRVlfOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1In0sImdyb3VwcyI6WyJjb21fc25wbG93X21zY19hd3NfYWRtaW5fbmV4dCIsImNvbV9zbnBsb3dfbXNjX2F3c191c2VyX25leHQiXX0sImlzcyI6Imh0dHBzOi8vbmV4dC5pZC5zbm93cGxvd2FuYWx5dGljcy5jb20vIiwic3ViIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc25vd3Bsb3dhbmFseXRpY3MuY29tL2FwaS9tMm0iLCJpYXQiOjE2OTg3NjEwNDMsImV4cCI6MTY5ODg0NzQ0MywiYXpwIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.vaE2eKUKqCgQ9DQkd_6tOifAYIfMRwKqyTENA_LP8b7ZJcsEGYI_29EUugOClSA5MqBFInQYwZYTcnc282xelCyO29jGQ4MAk4xG7OgRVUWm7CjjMsN6CPkyioP-gVEDnl-feDCTWEAHEhvH95o26kfuK1S1s1hrab_-RoDa5Cl99ODLByjVVDrwOEwU1biVFX-PKJRjyZFpyFBZRMxkaWFBxhKZBXU_vMTm8oD-jGWjwjxRmJ3uQ1vStwoup9CSNQalJDD8pNOl3p-hPztbvS2e5-UeA-01rXLh3t98gcNjyfm1mxzRt-roxIyEWdTmjocdA4yLOMYKVhlZeRNMdg"
const config = {
    method: 'GET',
    headers: {
        "accept": "application/json",
        // "Authorization": `Bearer ${header}`
        "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9EVXpSa0ZHUkRRNE5rVTROVVV5TjBVNU16RkVRa1JFUWpjMFJFWTRPVFEwTkRjNVFVWkNOQSJ9.eyJodHRwczovL3Nub3dwbG93YW5hbHl0aWNzLmNvbS9yb2xlcyI6eyJ1c2VyIjp7ImlkIjoiOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1Iiwib3JnYW5pemF0aW9uIjp7ImlkIjoiMTc3MjM0ZGYtZDQyNS00MTJlLWFkOGQtOGI5NzUxNWIyODA3IiwibmFtZSI6IlNub3dwbG93IE1TQyBBV1MifSwibmFtZSI6IkFQSS1LRVlfOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1In0sImdyb3VwcyI6WyJjb21fc25wbG93X21zY19hd3NfYWRtaW5fbmV4dCIsImNvbV9zbnBsb3dfbXNjX2F3c191c2VyX25leHQiXX0sImlzcyI6Imh0dHBzOi8vbmV4dC5pZC5zbm93cGxvd2FuYWx5dGljcy5jb20vIiwic3ViIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc25vd3Bsb3dhbmFseXRpY3MuY29tL2FwaS9tMm0iLCJpYXQiOjE2OTg3NjEwNDMsImV4cCI6MTY5ODg0NzQ0MywiYXpwIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.vaE2eKUKqCgQ9DQkd_6tOifAYIfMRwKqyTENA_LP8b7ZJcsEGYI_29EUugOClSA5MqBFInQYwZYTcnc282xelCyO29jGQ4MAk4xG7OgRVUWm7CjjMsN6CPkyioP-gVEDnl-feDCTWEAHEhvH95o26kfuK1S1s1hrab_-RoDa5Cl99ODLByjVVDrwOEwU1biVFX-PKJRjyZFpyFBZRMxkaWFBxhKZBXU_vMTm8oD-jGWjwjxRmJ3uQ1vStwoup9CSNQalJDD8pNOl3p-hPztbvS2e5-UeA-01rXLh3t98gcNjyfm1mxzRt-roxIyEWdTmjocdA4yLOMYKVhlZeRNMdg`
    }
}

export function useDataProductsList() {
    const url = `${DATA_PRODUCTS_LIST}`
    const fetcher = (...args: any) => fetch(url, config).then((res) => res.json());
    const { data, error, isLoading } = useSWR(url ? url : null, config ? fetcher : null);
    return { dataProductsList: data, error: error, isLoading: isLoading }
}

// export function useTrackingScenarioList(id: string) {

//     const fetcher = (...args: any) => fetch(id, config).then((res) => res.json());
//     const { data, error, isLoading } = useSWR(id ? id : null, config ? fetcher : null);

//     return { trackingScenariosList: data, error: error, isLoading: isLoading }
// }