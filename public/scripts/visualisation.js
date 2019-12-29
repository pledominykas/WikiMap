// TODO: Change graph style
let cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#69e',
        'label': 'data(name)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#369',
        'target-arrow-color': '#369',
        'target-arrow-shape': 'triangle',
        'label': 'data(label)',
        'font-size': '14px',
        'color': '#777'
      }
    }
  ]
});

let layoutProperties = {
  name: 'cola',
  animate: true,
  randomize: false,
  fit: false,
  infinite: true
};

// Set up node on tap listener
cy.on('tap', 'node', function(evt){
  ExpandNode(evt.target);
});

const linkInput = document.getElementById('link-input');
const onlyFirstParagraphCheck = document.getElementById('onlyFirstParagraph-checkbox');

function AddNodeClick() {
  let url = linkInput.value;
  $.post("/add-node-click", {url: url}, function(data, status){
    AddNode(url);
  });
}

// TODO: Add error handling
// Function for adding nodes to the graph
function AddNode(url){
  let node;
  let nodeId = ParseIdFromUrl(url);
  if(cy.$('#'+nodeId).length === 0){
    node = cy.add({
      group: 'nodes',
      data: { id: nodeId, url: url, name: ParseNameFromUrl(url) },
      position: { x: 200, y: 300 }
    });
  }
  else{
    return cy.$('#'+nodeId)[0];
  }
  return node;
}

// TODO: Add error handling
// Function for adding edges to the graph
function AddEdge(from, to){
  try{
    cy.add({
      group: 'edges',
      data: { id: from.id() + '-' + to.id(), source: from.id(), target: to.id(), label: '' }
     });
  }
  catch(err){}
}

// Function for expanding nodes in the graph
function ExpandNode(node){
  $.post("/expand-node-click", {url: node.data().url, onlyFirstParagraph: onlyFirstParagraphCheck.checked}, function(data, status){
    nodes = JSON.parse(data);
    for(let childNode of nodes){

      AddEdge(node, AddNode(childNode));
    }
    cy.layout(layoutProperties).run();
  });
}

// Function for parsing the wiki article name from the url
function ParseNameFromUrl(url){
  let parts = url.split('/');
  return parts[parts.length-1].replace(/_/g, ' ');
}

function ParseIdFromUrl(url){
  let parts = url.split('/');
  return parts[parts.length-1];
}
