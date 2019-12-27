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

const linkInput = document.getElementById('link-input');

function AddNode() {
  let link = linkInput.value;
  $.post("/add-node-click", {link: link}, function(data, status){

  });
}
