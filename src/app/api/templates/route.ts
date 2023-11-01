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
        errors: []
    },
    {
        data: [
            {
                id: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                name: "Snowstorm Schema Builder Test",
                organizationId: "177234df-d425-412e-ad8d-8b97515b2807",
                domain: "Product",
                owner: "John Reid",
                status: "draft",
                trackingScenarios: [
                    {
                        id: "218a2f04-60e6-416a-84c0-1b3c77dfe2e8",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/218a2f04-60e6-416a-84c0-1b3c77dfe2e8"
                    },
                    {
                        id: "2edee76f-9972-4358-8b59-3973fb174c56",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/2edee76f-9972-4358-8b59-3973fb174c56"
                    },
                    {
                        id: "323f4ef1-b683-4bbc-bbbe-a9a19e18f902",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/323f4ef1-b683-4bbc-bbbe-a9a19e18f902"
                    },
                    {
                        id: "6b73516b-10cb-4b03-a547-eefe07382127",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/6b73516b-10cb-4b03-a547-eefe07382127"
                    },
                    {
                        id: "7848f7b4-835e-44a9-b48b-c8f90b63146f",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/7848f7b4-835e-44a9-b48b-c8f90b63146f"
                    },
                    {
                        id: "99d4cd1a-4e09-43d7-97eb-a31165cc31aa",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/99d4cd1a-4e09-43d7-97eb-a31165cc31aa"
                    },
                    {
                        id: "ac042f24-8557-4068-b77d-4d2688b51139",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/ac042f24-8557-4068-b77d-4d2688b51139"
                    },
                    {
                        id: "e1729a93-13e4-4490-aa94-591e18c6fd3c",
                        url: "https://next.console.snowplowanalytics.com/organizations/177234df-d425-412e-ad8d-8b97515b2807/tracking-scenarios/v1/e1729a93-13e4-4490-aa94-591e18c6fd3c"
                    }
                ]
            }
        ],
        includes: {
            owners: [
            ],
            trackingScenarios: [
                {
                    id: "2edee76f-9972-4358-8b59-3973fb174c56",
                    version: 3,
                    status: "published",
                    name: "onboarding_add_email",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    description: "Testing adding a description",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    author: "9fa721d5-eb65-48b0-913c-d45e2b7328b5",
                    message: "update",
                    date: "2023-10-31T17:36:37.984450Z"
                },
                {
                    id: "e1729a93-13e4-4490-aa94-591e18c6fd3c",
                    version: 2,
                    status: "draft",
                    name: "onboarding_add_phone_number",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:23:08.727470Z"
                },
                {
                    id: "7848f7b4-835e-44a9-b48b-c8f90b63146f",
                    version: 1,
                    name: "onboarding_agree_terms_and_conditions",
                    status: "draft",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:24:42.758893Z"
                },
                {
                    id: "ac042f24-8557-4068-b77d-4d2688b51139",
                    version: 1,
                    status: "draft",
                    name: "onboarding_begin",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:23:27.611361Z"
                },
                {
                    id: "323f4ef1-b683-4bbc-bbbe-a9a19e18f902",
                    version: 1,
                    status: "draft",
                    name: "onboarding_complete",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:22:26.911879Z"
                },
                {
                    id: "6b73516b-10cb-4b03-a547-eefe07382127",
                    version: 1,
                    status: "draft",
                    name: "onboarding_enable_location",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:22:43.543470Z"
                },
                {
                    id: "218a2f04-60e6-416a-84c0-1b3c77dfe2e8",
                    version: 1,
                    status: "draft",
                    name: "onboarding_enable_notifications",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:23:45.962609Z"
                },
                {
                    id: "99d4cd1a-4e09-43d7-97eb-a31165cc31aa",
                    version: 1,
                    status: "draft",
                    name: "onboarding_verify_phone_number",
                    dataProductId: "5369ff75-7f6e-405d-b2f5-6394d271b33c",
                    appIds: [
                    ],
                    description: "",
                    event: {
                        source: "iglu:com.snplow.msc.aws/onboarding_event/jsonschema/1-0-0"
                    },
                    entities: {
                        tracked: [
                            {
                                source: "iglu:com.snowplowanalytics.console/user/jsonschema/1-0-1"
                            }
                        ]
                    },
                    author: "ba405b93-85de-4709-aa88-527e0d9b7ef9",
                    message: "",
                    date: "2023-10-31T13:24:03.299407Z"
                }
            ]
        },
        errors: [
        ]
    }
]


import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json(dataProducts)
}