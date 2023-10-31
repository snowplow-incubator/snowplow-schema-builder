import dataProductsJson from 'src/data/data.json'
import { defaultTrackingScenario, TrackingScenario } from '@/data/types';
import { v4 as uuidv4 } from 'uuid';

import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//     const res = await req.json()
//     const fs = require("fs");

//     console.log(res.id)

//     const path = "src/data/data.json";

//     const jsonString = fs.readFileSync(path)
//     const dataProducts = JSON.parse(jsonString)

//     const dataProduct = dataProducts.find((dataProduct: { data: { id: any; }[]; }) => dataProduct.data[0].id === res.id)
//     console.log(dataProduct.data[0].trackingScenarios)

//     let newTrackingScenario: TrackingScenario = {
//         ...defaultTrackingScenario,
//         id: uuidv4(),
//         name: res.name,
//         description: res.description,
//         event: {
//             source: res.schema,
//             schema: {
//                 $schema: res.schema,
//                 description: res.description,
//                 type: "object",
//                 required: [
//                     "label",
//                     "action"
//                 ],
//                 properties: {
//                     action: {
//                         type: "string",
//                         enum: [
//                             "click"
//                         ]
//                     },
//                     label: {
//                         type: "string",
//                         enum: [
//                             "Search"
//                         ]
//                     }
//                 },
//                 additionalProperties: false
//             }
//         }

//     }

//     dataProduct.includes.trackingScenarios.push(newTrackingScenario)

//     // try {
//     //     fs.writeFileSync(path, JSON.stringify(dataProducts, null, 2));
//     //     console.log("Data successfully saved");
//     // } catch (error) {
//     //     console.log("An error has occurred ", error);
//     // }
//     return NextResponse.json(dataProductsJson)
// }


// Get data product by ID
export async function GET() {
    // const userInput = await req.json()
    // console.log(userInput)
    const res = await fetch(`https://console.snowplowanalytics.com/api/msc/v1/organizations/3883f10d-d184-4c33-af53-32ae57aaf14b/data-products/v1/32b1a470-8d5a-4c3e-bfef-a0121cef73e2`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
    )
    const data = await res.json()
    return NextResponse.json(data)
}

