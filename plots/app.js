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
            ],
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

const head_1 = api_req.data.schema.map((item)=>{
    return item[0]
})
console.log(head_1)
let tr = document.createElement("tr");
for(let i=0;i<head_1.length;i++){
    let td = document.createElement('th');
    td.textContent = head_1[i];
    tr.appendChild(td);
}
const el = document.getElementById("random_c").appendChild(tr);






const api_data = api_req.data.data

const visdata = []

api_data.forEach((elem, idx) => {
    visdata.push({ id: idx + 1, label: elem[0].toString() })
})

const nodes = new vis.DataSet(visdata)

const visedges = []

Object.keys(api_cluster).forEach(function (key) {
    api_cluster[key].forEach((node) => {
        // if (parseInt(key) != node )
            visedges.push({ from: parseInt(key) + 1, to: node + 1 })
    })
})

const edges = new vis.DataSet(visedges)

// create a network
const container = document.getElementById("mynetwork");
const data = {
    nodes: nodes,
    edges: edges,
}

const options = {
    nodes: {
        shape: "dot",
        scaling: {
          min: 10,
          max: 30,
          label: {
            min: 8,
            max: 30,
            drawThreshold: 12,
            maxVisible: 20,
          },
        },
        font: {
          size: 12,
          face: "Tahoma",
        },
      },
    edges: {
        width: 0.15,
        color: { inherit: "from" },
        smooth: {
          type: "continuous",
        },
      },
};
const network = new vis.Network(container, data, options);
var randomColor = Math.floor(Math.random()*16777215).toString(16);
Object.keys(api_cluster).forEach(function (key, idx) {
    network.clusterByConnection(parseInt(key)+1, {
        clusterNodeProperties: {
            label: `Cluster: ${idx+1}`,
            shape: "dot",
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
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

// const dt = api_req.data.schema.map((item)=>{
//     return item[0]
// })
// console.log(head_1)
// let tr = document.createElement("tr");
// for(let i=0;i<head_1.length;i++){
//     let td = document.createElement('th');
//     td.textContent = head_1[i];
//     tr.appendChild(td);
// }

network.on('click', (e)=>{
    const els = document.getElementById("random_c");
    els.innerHTML = "";
    document.getElementById("random_c").appendChild(tr)
    if (typeof(e.nodes[0])==="number") {
        const dt = api_data[e.nodes[0]-1];
        console.log(api_data[e.nodes[0]-1]);
        let trd = document.createElement("tr");
        for(let i=0;i<dt.length;i++){
            let tdd = document.createElement('td');
            tdd.textContent = dt[i];
            trd.appendChild(tdd);
        }
        els.appendChild(trd);
    }
    else {
        console.log(clusters[e.nodes[0]])
        clusters[e.nodes[0]].forEach((elem)=>{
            console.log(api_data[elem.node.id-1])
            let dt = api_data[elem.node.id-1]
            let trd = document.createElement("tr");
            for(let i=0;i<dt.length;i++){
                let tdd = document.createElement('td');
                tdd.textContent = dt[i];
                trd.appendChild(tdd);
            }
            els.appendChild(trd);
        })
    }
})


// document.querySelector('#club').addEventListener('click', ()=>{
    
// })