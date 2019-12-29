// TODO: Change graph style
let cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#69e',
        'label': 'data(id)',
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
  ],

  style: cytoscape.stylesheet()
  .selector('edge')
      .css({
        'width': 3,
        'line-color': '#369',
        'target-arrow-color': '#369',
        'target-arrow-shape': 'triangle',
        'label': 'data(label)',
        'font-size': '14px',
        'color': '#777'
      })
    .selector('node')
      .css({
        'content': 'data(id)',
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'text-outline-color': '#888',
        'background-color': '#888'
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'text-outline-color': 'black'
      }),

  layout: {
    name: 'grid',
    rows: 1
  }

});

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

// Function for adding nodes to the graph
function AddNode(url){
  return cy.add({
    group: 'nodes',
    data: { id: ParseNameFromUrl(url), url: url },
    position: { x: 200, y: 300 }
  });
}

function AddEdge(from, to){
  cy.add({
    group: 'edges',
    data: { id: from.id() + '-' + to.id(), source: from.id(), target: to.id() }
   });
}

// Function for expanding nodes in the graph
function ExpandNode(node){
  $.post("/expand-node-click", {url: node.data().url, onlyFirstParagraph: onlyFirstParagraphCheck.checked}, function(data, status){
    nodes = JSON.parse(data);
    for(let childNode of nodes){
      AddEdge(node, AddNode(childNode));
    }
  });
}

// Function for parsing the wiki article name from the url
function ParseNameFromUrl(url){
  let parts = url.split('/');
  return parts[parts.length-1].replace(/_/g, ' ');
}
