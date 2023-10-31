
export type DataProduct = {
    data: [
        {
            id: string,
            name: string,
            organizationId: string,
            domain: string,
            owner: string,
            description: string,
            status: string,
            accessInstructions: string,
            trackingScenarios: [
                {
                    id: string,
                    url: string
                }
            ] | []
        }
    ],
    includes: {
        owners: [
            {
                id: string,
                name: string,
                organizationId: string,
                members: string[],
                contact: string,
                description: string
            }
        ],
        trackingScenarios: TrackingScenario[] | []
    },
    errors: Object[]
}



export type TrackingScenario = {
    id: string,
    version: Number,
    status: string,
    name: string | undefined,
    appIds: string[],
    owner: string,
    description: string | undefined,
    triggers: string[],
    event: {
        source: string,
        schema: {
            $schema: string | undefined,
            description: string,
            type: string,
            required: string[],
            properties: {
                action: {
                    type: string,
                    enum: [string]
                },
                label: {
                    type: string,
                    enum: string[]
                }
            },
            additionalProperties: Boolean
        }
    },
    entities: {
        tracked: [
            {
                source: string,
                minCardinality: Number,
                maxCardinality: Number
            }
        ],
        enriched: [
            {
                source: string,
                minCardinality: Number,
                maxCardinality: Number
            }
        ]
    },
    author: string,
    message: string,
    date: string
}


export const defaultTrackingScenario = {
    version: 1,
    status: "published",
    owner: "na",
    description: "",
    triggers: [""],
    event: {
        schema: {
            type: "object",
            additionalProperties: false
        }
    },
    author: "",
    message: "",
}