"use client"

import { useState, useCallback } from 'react'

import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
 
import 'reactflow/dist/style.css';

function nameFromSchema(schema: string) {
  return schema.split("/")[1];
}

function EventNodeLabel({ event, isEvent }: { event: any, isEvent: boolean }) {
    return (
      <>
        <i>{isEvent ? "Event" : "Entity"}</i>
        <h3>{nameFromSchema(event.schema)}</h3>
        <small>{event.description}</small>
      </>
    );
}

function FlowForData({ initialEvents, initialEntities, initialTrackingScenarios }: { initialEvents: any[], initialEntities: any[], initialTrackingScenarios: any[] }) {
  const initialNodes = initialEvents
    .map((event: any, i: number) => {
      return {
        id: event.schema,
        position: { x: i * 250, y: 0 },
        data: { label: <EventNodeLabel event={event} isEvent={true} /> },
      };
    })
    .concat(
      initialEntities.map((entity: any, i: number) => {
        return {
          id: entity.schema,
          position: { x: i * 250, y: 200 },
          data: { label: <EventNodeLabel event={entity} isEvent={false} /> },
        };
      })
    );
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

    return <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
}

export default function Flow({ id }: { id: string }) {
  console.log(id);
  let dataProducts = [{ events: [], entities: [], trackingScenarios: [] }];
  let entities: any[] = [];
  let trackingScenarios = [];
  const [open, setOpen] = useState("");
  function toggleDrawer(id: any) {
    setOpen(id);
  }

  const [entitiesAdd, setEntitiesAdd] = useState([]);

  if (typeof window !== "undefined") {
    dataProducts = JSON.parse(localStorage.getItem(id) || '[]');
    console.log(dataProducts);
  }

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntitiesAdd({
      ...entitiesAdd,
      [event.target.name]: event.target.checked,
    });
  };

  const handleUpdateScenario = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  trackingScenarios = dataProducts[0].trackingScenarios;
  entities = dataProducts[0].entities;
  let events = dataProducts[0].events;
  console.log(trackingScenarios);

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: <EventNodeLabel event={{name: 'fdsfadjkj'}} /> } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: <EventNodeLabel event={{name: 'fadjkj'}} /> } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(dataProducts)

  // const trackingScenarios = dataProduct.includes.trackingScenarios
  // read in the saved tracking scenarios
  // load them into state as array of tracking scenarios
  // render them as cards
  // be able to add remove them from array of tracking scenarios
  // save them to json file

  // {dataProductsList.map((dataProduct: any) => (
  //     <DataProductTemplateList dataProduct={dataProduct} />
  // ))}
  return (
    <FlowForData
      initialEvents={events}
      initialEntities={entities}
      initialTrackingScenarios={trackingScenarios}
    />
  );
}
