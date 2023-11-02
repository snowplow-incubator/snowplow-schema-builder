import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const userInput = await req.json()
    const res = await fetch(`${process.env.HOMEPAGE}/organizations/${process.env.ORGANIZATION_ID}/data-products/v1`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

        },
        body: JSON.stringify({
            name: userInput.name,
            description: userInput.description,
            domain: userInput.domain,
            owner: userInput.owner,
            accessInstructions: userInput.description,
            status: "draft"
        }),
    })
    const data = await res.json()
    return NextResponse.json(data)
}
