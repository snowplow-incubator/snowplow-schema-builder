// import { NextResponse } from "next/server"
// import { version } from "os"

// // Get data product by ID
// export async function GET() {
//     const res = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/data-products/v1/32b1a470-8d5a-4c3e-bfef-a0121cef73e2`, {
//         method: 'GET',
//         headers: {
//             "accept": "application/json",
//             "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
//         }
//     }
//     )
//     const data = await res.json()
//     return NextResponse.json(data)
// }

// export async function POST(req: Request) {
//     const userInput = await req.json()
//     const res = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/tracking-scenarios/v1`, {
//         method: 'POST',
//         headers: {
//             "accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

//         },
//         body: JSON.stringify({
//             "scenario": {
//                 "dataProductId": userInput.dataProductId,
//                 "name": userInput.name,
//                 "description": userInput.description,
//                 "event": {
//                     "source": "iglu:com.test/diana_test2/jsonschema/1-0-1",
//                 }
//             },
//             "message": "update",
//         }),
//     })
//     const data = await res.json()
//     return NextResponse.json(data)
// }

// export async function PUT(req: Request) {
//     const userInput = await req.json()
//     console.log(userInput)
//     const res = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/tracking-scenarios/v1/${userInput.id}`, {
//         method: 'PUT',
//         headers: {
//             "accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

//         },
//         body: JSON.stringify({
//             "scenario": {
//                 "id": userInput.id,
//                 "dataProductId": userInput.dataProductId,
//                 "version": userInput.version,
//                 "name": userInput.name,
//                 "description": userInput.description,
//                 "event": {
//                     "source": "iglu:com.test/diana_test2/jsonschema/1-0-1",
//                 },
//                 "entities": {
//                     "tracked": [
//                         {
//                             "source": "iglu:com.snowplowanalytics.snowplow/web_page/1-0-0",
//                             "minCardinality": 1,
//                             "maxCardinality": 1
//                         }
//                     ],
//                     "enriched": [
//                         {
//                             "source": "iglu:com.snowplowanalytics.snowplow/ua_parser_context/1-0-0",
//                             "minCardinality": 1,
//                             "maxCardinality": 1
//                         }
//                     ],
//                 },
//                 "status": "draft"
//             },
//             "message": "update",
//         }),
//     })
//     const data = await res.json()
//     return NextResponse.json(data)
// }

// export async function DELETE() {
//     const res = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/tracking-scenarios/v1/00dcfd02-7db2-4fc9-90a5-45769cb2e03f`, {
//         method: 'DELETE',
//         headers: {
//             "accept": "application/json",
//             "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
//         }
//     })
//     const data = await res.json()
//     return NextResponse.json(data)
// }

// curl - X 'DELETE' \
// 'https://next.console.snowplowanalytics.com/api/msc/v1/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/36a4eb60-727d-46a9-a15d-486b703b2392' \
// -H 'accept: */*' \
// -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9EVXpSa0ZHUkRRNE5rVTROVVV5TjBVNU16RkVRa1JFUWpjMFJFWTRPVFEwTkRjNVFVWkNOQSJ9.eyJodHRwczovL3Nub3dwbG93YW5hbHl0aWNzLmNvbS9yb2xlcyI6eyJ1c2VyIjp7ImlkIjoiOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1Iiwib3JnYW5pemF0aW9uIjp7ImlkIjoiMTc3MjM0ZGYtZDQyNS00MTJlLWFkOGQtOGI5NzUxNWIyODA3IiwibmFtZSI6IlNub3dwbG93IE1TQyBBV1MifSwibmFtZSI6IkFQSS1LRVlfOWZhNzIxZDUtZWI2NS00OGIwLTkxM2MtZDQ1ZTJiNzMyOGI1In0sImdyb3VwcyI6WyJjb21fc25wbG93X21zY19hd3NfYWRtaW5fbmV4dCIsImNvbV9zbnBsb3dfbXNjX2F3c191c2VyX25leHQiXX0sImlzcyI6Imh0dHBzOi8vbmV4dC5pZC5zbm93cGxvd2FuYWx5dGljcy5jb20vIiwic3ViIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc25vd3Bsb3dhbmFseXRpY3MuY29tL2FwaS9tMm0iLCJpYXQiOjE2OTg3NjEwNDMsImV4cCI6MTY5ODg0NzQ0MywiYXpwIjoidXBRZGNCRDRXeXZBeDZTWDJQdnpvMWgwQ1ZoeVdBZUUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.vaE2eKUKqCgQ9DQkd_6tOifAYIfMRwKqyTENA_LP8b7ZJcsEGYI_29EUugOClSA5MqBFInQYwZYTcnc282xelCyO29jGQ4MAk4xG7OgRVUWm7CjjMsN6CPkyioP-gVEDnl-feDCTWEAHEhvH95o26kfuK1S1s1hrab_-RoDa5Cl99ODLByjVVDrwOEwU1biVFX-PKJRjyZFpyFBZRMxkaWFBxhKZBXU_vMTm8oD-jGWjwjxRmJ3uQ1vStwoup9CSNQalJDD8pNOl3p-hPztbvS2e5-UeA-01rXLh3t98gcNjyfm1mxzRt-roxIyEWdTmjocdA4yLOMYKVhlZeRNMdg'
