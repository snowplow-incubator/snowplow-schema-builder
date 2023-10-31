import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch(`https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/data-products/v1`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
    )
    const data = await res.json()
    return NextResponse.json(data.data)
}

export async function POST(req: Request) {
    const userInput = await req.json()
    const res = await fetch(`https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/data-products/v1`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

        },
        body: JSON.stringify({
            name: userInput.name,
            description: userInput.description,
            domain: "ActivationEngineering",
            owner: "Engineering",
            accessInstructions: userInput.description
        }),
    })
    const data = await res.json()
    return NextResponse.json(data)
}