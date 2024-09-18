import {
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Modal, Select } from "antd";
import { useCallback, useState } from "react";

const initialEdges = [];

const initialNodes = [];
function Flow() {
  const [node, setnode] = useState(initialNodes);
  const [edge, setedge] = useState(initialEdges);
  const [OpenModel, setOpenModel] = useState(false);
  const [nodeName, setnodeName] = useState("");
  const [selectModalValue, setselectModalValue] = useState(false);
  const [options, setoptions] = useState([]);
  const [successOpt, setsuccessOpt] = useState([]);
  const [failurOpt, setfailurOpt] = useState([]);
  const nodeChange = useCallback(
    (changes) => setnode((nod) => applyNodeChanges(changes, nod)),
    []
  );

  console.log(edge);
  console.log(node);
  const edgeChange = useCallback(
    (changes) => setedge((edg) => applyEdgeChanges(changes, edg)),
    []
  );

  // connect one node with another node
  const onConnect = useCallback((params) => {
    setedge((edg) => addEdge(params, edg));
    setselectModalValue(true);
  }, []);

  const addNode = () => {
    const newNode = {
      id: (node.length + 1).toString(), // Set a unique id
      data: { label: nodeName }, // Dynamic label
      position: { x: Math.random() * 250, y: Math.random() * 250 }, // Random position for new node
      sourcePosition: "right", // Default source position
      targetPosition: "left",
      //... sir ka data
      // targetPosition:"ri"
    };
    console.log(newNode);
    setnode((nod) => [...nod, newNode]); // Add the new node to the existing nodes
    setOpenModel(false);
    setnodeName("");
  };
  // Function to remove an edge (disconnect nodes)
  const removeEdge = (edgeId) => {
    setedge((edg) => edg.filter((e) => e.id !== edgeId));
  };
  return (
    <div style={{ height: "100%" }}>
      <button
        style={{ padding: "5px", borderRadius: "5px" }}
        className=" p-2 rounded-md border m-1"
        onClick={() => setOpenModel(true)}
      >
        Add Node
      </button>
      <Modal
        open={selectModalValue}
        onCancel={() => {
          // const removedObject = edge.pop();
          // setedge(removedObject);
          removeEdge(edge[edge.length - 1]?.id);
          setselectModalValue(false);
        }}
        onOk={() => setselectModalValue(false)}
      ></Modal>
      <Modal
        open={OpenModel}
        onCancel={() => {
          setOpenModel(false);
          setnodeName("");
        }}
        footer={false}
      >
        <div className=" mt-5 w-full flex flex-col gap-2">
          <div className=" flex flex-col gap-2">
            <div className=" w-full">
              <p>Type</p>
              <Select
                className=" w-full"
                options={[
                  {
                    value: "A",
                    label: "A",
                  },
                  {
                    value: "B",
                    label: "B",
                  },
                  {
                    value: "C",
                    label: "C",
                  },
                ]}
              ></Select>
            </div>
            <div>
              <p>Options</p>
              <div className=" flex gap-2">
                <input
                  type="text"
                  placeholder="Node Name"
                  value={nodeName}
                  className=" w-full border outline-none px-2 rounded-md h-10"
                  onChange={(e) => setnodeName(e.target.value)}
                />
                <button
                  onClick={() => {
                    setnodeName("");
                    setoptions([
                      ...options,
                      {
                        question: nodeName,
                        value: `option ${options?.length + 1}`,
                      },
                    ]);
                    setsuccessOpt([
                      ...successOpt,
                      {
                        label: nodeName,
                        value: `option ${options?.length + 1}`,
                      },
                    ]);
                    setfailurOpt([
                      ...successOpt,
                      {
                        label: nodeName,
                        value: `option ${options?.length + 1}`,
                      },
                    ]);
                  }}
                  className=" h-10 px-3 rounded-md border"
                >
                  Add
                </button>
              </div>
              <div className=" flex flex-col gap-1 mt-1">
                {options?.map((option, index) => (
                  <div key={index} className="flex rounded-md  gap-2">
                    <p className=" border px-2 w-full rounded-md ">
                      {option?.question}
                    </p>
                    <p
                      onClick={() => {
                        const dataa = options?.filter((p, i) => i !== index);
                        console.log(dataa);
                        setoptions([...dataa]);
                      }}
                      className=" border px-2 rounded-md"
                    >
                      Delete
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full">
              <p>Success</p>
              <Select
                onSelect={(e) => {
                  const dataa = failurOpt?.filter((p) => p?.value !== e);
                  setfailurOpt([...dataa]);
                }}
                className=" w-full"
                options={successOpt}
              ></Select>
            </div>
            <div className=" w-full">
              <p>Failure</p>
              <Select className=" w-full" options={failurOpt}></Select>
            </div>
          </div>
          <div
            className=" cursor-pointer w-full rounded-md border text-white bg-blue-400 font-semibold  grid place-content-center h-10"
            // style={{ padding: "5px", borderRadius: "5px" }}

            onClick={() => addNode()}
          >
            Add Node
          </div>
        </div>
      </Modal>
      <div className=" h-[95vh]">
        <ReactFlow
          nodes={node}
          onNodesChange={nodeChange}
          edges={edge}
          onEdgesChange={edgeChange}
          onConnect={onConnect}
          onEdgeClick={(_, edge) => removeEdge(edge.id)} // Remove edge on click
        >
          <Background />
          <Controls />
          {/* hiii */}
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
