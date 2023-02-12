import React, {useRef, useEffect} from 'react'

export default function Network() {
    const ref = useRef(null);
    let container;
    useEffect(() => {
        container = ref.current;
        console.log(container);
        container = document.querySelector('#mynetwork');
        console.log(container);
    }, []);

    const api_req = {
        "message": "sucess",
        "status": 200,
        "data": {
            "_id": {
                "$oid": "63e7984e579f78e749f134a1"
            },
            "data": [
                [
                    1,
                    1,
                    3,
                    45
                ],
                [
                    2,
                    2,
                    1,
                    22
                ],
                [
                    3,
                    3,
                    2,
                    64
                ],
                [
                    4,
                    1,
                    3,
                    28
                ],
                [
                    5,
                    3,
                    2,
                    64
                ],
                [
                    6,
                    3,
                    2,
                    64
                ],
                [
                    7,
                    3,
                    2,
                    64
                ],
                [
                    8,
                    3,
                    2,
                    64
                ],
                [
                    9,
                    3,
                    2,
                    64
                ],
                [
                    10,
                    3,
                    2,
                    64
                ]
            ],
            "schema": [
                [
                    "OBID",
                    "NOMINAL"
                ],
                [
                    "Test-1",
                    "BINARY SYMMETRIC"
                ],
                [
                    "Test-2",
                    "ORDINAL"
                ],
                [
                    "Test-3",
                    "INTERVAL"
                ]
            ],
            "userid": "63e76f9fe8ef42ff4d30ea5b"
        }
    }
    
    const api_cluster = {
        "0": [
            0,
            5,
            6
        ],
        "1": [
            1,
            6,
            8
        ],
        "2": [
            4,
            2,
            7
        ],
        "3": [
            9,
            3
        ]
    }
    
    const api_data = api_req.data.data
    
    const visdata = []
    
    api_data.forEach((elem, idx) => {
        visdata.push({ id: idx + 1, label: elem[0].toString() })
    })
    
    const nodes = new vis.DataSet(visdata)
    
    const visedges = []
    
    Object.keys(api_cluster).forEach(function (key) {
        api_cluster[key].forEach((node) => {
            if (parseInt(key) != node )
                visedges.push({ from: parseInt(key) + 1, to: node + 1 })
        })
    })
    
    const edges = new vis.DataSet(visedges)
    
    // create a network
    // const container = document.getElementById("mynetwork");
    const data = {
        nodes: nodes,
        edges: edges,
    }
    
    const options = {};
    const network = new vis.Network(container, data, options);
    
    Object.keys(api_cluster).forEach(function (key, idx) {
        network.clusterByConnection(parseInt(key) + 1, {
            clusterNodeProperties: {
                label: `Cluster: ${idx + 1}`,
                shape: "database"
            }
        })
    })
    
    const cluster_ids = []
    
    Object.keys(network.clustering.clusteredNodes).forEach(function (key) {
        if (!cluster_ids.includes(network.clustering.clusteredNodes[key].clusterId)) {
            cluster_ids.push(network.clustering.clusteredNodes[key].clusterId)
        }
    })
    
    const clusters = {}
    
    cluster_ids.forEach((id) => {
        clusters[id] = []
    })
    
    Object.keys(network.clustering.clusteredNodes).forEach(function (key) {
        clusters[network.clustering.clusteredNodes[key].clusterId].push(network.clustering.clusteredNodes[key])
    })
    
    network.on('click', (e)=>{
        if (typeof(e.nodes[0])==="number") {
            console.log(api_data[e.nodes[0]-1]);
        }
        else {
            console.log(clusters[e.nodes[0]])
            clusters[e.nodes[0]].forEach((elem)=>{
                console.log(api_data[elem.node.id-1])
            })
        }
    })
    
    // document.querySelector('#club').addEventListener('click', ()=>{
        
    // })
  return (
    <div>
        <div ref={ref} id="mynetwork"></div>
    </div>
  )
}
