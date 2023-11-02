import { useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";

import { DATA_PRODUCTS_LIST, TRACKING_SCENARIOS_LIST, ACCESS_TOKEN } from "@/constants";

const config = {
    method: 'GET',
    headers: {
        "accept": "application/json",
        // "Authorization": `Bearer ${header}`
        "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9EVXpSa0ZHUkRRNE5rVTROVVV5TjBVNU16RkVRa1JFUWpjMFJFWTRPVFEwTkRjNVFVWkNOQSJ9.eyJodHRwczovL3Nub3dwbG93YW5hbHl0aWNzLmNvbS9yb2xlcyI6eyJ1c2VyIjp7ImlkIjoiOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1Iiwib3JnYW5pemF0aW9uIjp7ImlkIjoiMTc3MjM0ZGYtZDQyNS00MTJlLWFkOGQtOGI5NzUxNWIyODA3IiwibmFtZSI6IlNub3dwbG93IE1TQyBBV1MifSwibmFtZSI6IkFQSS1LRVlfOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1In0sImdyb3VwcyI6WyJjb21fc25wbG93X21zY19hd3NfYWRtaW5fbmV4dCIsImNvbV9zbnBsb3dfbXNjX2F3c191c2VyX25leHQiXX0sImlzcyI6Imh0dHBzOi8vbmV4dC5pZC5zbm93cGxvd2FuYWx5dGljcy5jb20vIiwic3ViIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc25vd3Bsb3dhbmFseXRpY3MuY29tL2FwaS9tMm0iLCJpYXQiOjE2OTg5MzQ2NzQsImV4cCI6MTY5OTAyMTA3NCwiYXpwIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WzG7yXqtTfjTzmOtg_V2vWpcpb-7UYzsYC3DhDiRqu75HF2d8iwSRhd4Vs9WMKosVirCSPgxXZ-WJCNsz_LFvEeA6zA9a2T1hOhokXGdI9QXxOyhjAMYlbH0f9c-lOT4rz-3bc9pLB81ny1OJMtWhfOa4OMyZhrlosQPr6ktEe8hRXWFBB2PldAKUMj6qsbBD3ZCfgkLgIOOzTigVQBRWPyjqocniDmIPvsdD6v6W4KtStvY7Yo94eEVInaWtCi1dUZ5NsNjA9kKbQio6_oh7NFiQudIUOzx88HTA53gv5BX5drJsfUWycoD8mparhgBjl2hqMLmicz2GRkssMClXQ`
    }
}

export function useDataProductsList() {
    const url = `${DATA_PRODUCTS_LIST}`
    const fetcher = (...args: any) => fetch(url, config).then((res) => res.json());
    const { data, error, isLoading } = useSWR(url ? url : null, config ? fetcher : null);
    return { dataProductsList: data, error: error, isLoading: isLoading }
}
