const dataProducts = [
    {
        data: [
            {
                id: "e435ea5f-0044-4e39-ba4c-10c02a74a8ef",
                name: "Engagement tracking",
                organizationId: "618d215b-ef4a-404b-877a-4b32685e869c",
                domain: "Marketing",
                owner: "Marketing",
                description: "Tracking the ad engagement",
                status: "experimental",
                accessInstructions: "The data can be accessed through company Superset",
                trackingScenarios: [
                    {
                        id: "d1336abc-1b60-46f7-be2d-2105f2daf283",
                        url: "https://next.console.snowplowanalytics.com/api/msc/v1/organizations/f51dada7-4f11-4b6a-bbbd-2cf6a3673035/tracking-scenarios/v1/d1336abc-1b60-46f7-be2d-2105f2daf283"
                    }
                ]
            }
        ],
        includes: {
            "owners": [
                {
                    "id": "b82aaccd-584c-4a7d-9167-5001fbc52249",
                    "name": "IT department",
                    "organizationId": "618d215b-ef4a-404b-877a-4b32685e869c",
                    "members": [
                        "38fe3841-c4ba-4fdd-8a3e-f3aa1e065880"
                    ],
                    "contact": "engineers@example.com",
                    "description": "Best team <3"
                }
            ],
            "trackingScenarios": [
                {
                    "id": "d1336abc-1b60-46f7-be2d-2105f2daf283",
                    "version": 27,
                    "status": "published",
                    "name": "Search",
                    "appIds": [
                        "ios",
                        "android"
                    ],
                    "owner": "51982e6e-af2e-426e-b50e-9893b1dcdbdd",
                    "description": "Tracking the use of the search box",
                    "triggers": [
                        "On the homepage, when the user types in the search box"
                    ],
                    "event": {
                        "source": "iglu:com.example/ui_actions/jsonschema/1-0-0",
                        "schema": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "description": "Event to capture search submit",
                            "type": "object",
                            "required": [
                                "label",
                                "action"
                            ],
                            "properties": {
                                "action": {
                                    "type": "string",
                                    "enum": [
                                        "click"
                                    ]
                                },
                                "label": {
                                    "type": "string",
                                    "enum": [
                                        "Search"
                                    ]
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    "entities": {
                        "tracked": [
                            {
                                "source": "iglu:com.snowplowanalytics.snowplow/web_page/1-0-0",
                                "minCardinality": 1,
                                "maxCardinality": 1
                            }
                        ],
                        "enriched": [
                            {
                                "source": "iglu:com.snowplowanalytics.snowplow/ua_parser_context/1-0-0",
                                "minCardinality": 1,
                                "maxCardinality": 1
                            }
                        ]
                    },
                    "author": "30eae886-b8de-4411-9ce2-32fe5ecda610",
                    "message": "Fixed errors",
                    "date": "2023-04-25T14:27:10.184187Z"
                },
                {
                    "id": "224ed604-29f8-416b-ab51-bd46d5ab13a6",
                    "version": 27,
                    "status": "published",
                    "name": "Search",
                    "appIds": [
                        "ios",
                        "android"
                    ],
                    "owner": "51982e6e-af2e-426e-b50e-9893b1dcdbdd",
                    "description": "Tracking the use of the search box",
                    "triggers": [
                        "On the homepage, when the user types in the search box"
                    ],
                    "event": {
                        "source": "iglu:com.example/ui_actions/jsonschema/1-0-0",
                        "schema": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "description": "Event to capture search submit",
                            "type": "object",
                            "required": [
                                "label",
                                "action"
                            ],
                            "properties": {
                                "action": {
                                    "type": "string",
                                    "enum": [
                                        "click"
                                    ]
                                },
                                "label": {
                                    "type": "string",
                                    "enum": [
                                        "Search"
                                    ]
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    "entities": {
                        "tracked": [
                            {
                                "source": "iglu:com.snowplowanalytics.snowplow/web_page/1-0-0",
                                "minCardinality": 1,
                                "maxCardinality": 1
                            }
                        ],
                        "enriched": [
                            {
                                "source": "iglu:com.snowplowanalytics.snowplow/ua_parser_context/1-0-0",
                                "minCardinality": 1,
                                "maxCardinality": 1
                            }
                        ]
                    },
                    "author": "30eae886-b8de-4411-9ce2-32fe5ecda610",
                    "message": "Fixed errors",
                    "date": "2023-04-25T14:27:10.184187Z"
                }
            ]
        },
        "errors": []
    }
]

import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json(dataProducts)
}