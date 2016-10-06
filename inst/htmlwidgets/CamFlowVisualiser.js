HTMLWidgets.widget({

  name: 'CamFlowVisualiser',

  type: 'output',



  factory: function(el, width, height) {

    var test = false;

    return {
      renderValue: function(x) {
        var notSupported = function(){
          var box = vex.dialog.alert({ unsafeMessage: 'Display in your browser to enjoy all features.<br/><img src="helper.jpg"/>'});
          setTimeout( function(){box.close();}, 2000 );
        };

        var body = document.getElementsByTagName("BODY")[0]
        //body.appendChild(vex);
        vex.defaultOptions.className = 'vex-theme-flat-attack';
        cy = cytoscape({
  				container: el,

  				boxSelectionEnabled: false,

  				layout: {
  					name: 'dagre',
  					rankDir: 'TB'
  				},

  				style: [
  					{
  						selector: 'node',
  						style: {
  							'content': 'data(label)',
  							'text-opacity': 0.5,
  							'text-valign': 'center',
  							'text-halign': 'right',
  							'width': 'data(weight)',
  							'height': 'data(weight)'
  						}
  					},

  					{
  						selector: 'node[type="entity"]',
  						style: {
  							'background-color': '#FFB266',
  							'shape': 'ellipse'
  						}
  					},

  					{
  						selector: 'node[type="agent"]',
  						style: {
  							'background-color': '#66FF66',
  							'shape': 'octagon'
  						}
  					},

  					{
  						selector: 'node[type="activity"]',
  						style: {
  							'background-color': '#ccd9ff',
  							'shape': 'rectangle'
  						}
  					},

  					{
  						selector: 'node[weight>40][type="activity"]',
  						style: {
  							'background-color': '#809fff'
  						}
  					},

  					{
  						selector: 'node[weight>50][type="activity"]',
  						style: {
  							'background-color': '#3366ff'
  						}
  					},

  					{
  						selector: 'node[weight>60][type="activity"]',
  						style: {
  							'background-color': '#0033cc'
  						}
  					},

  					{
  						selector: 'edge',
  						style: {
  							'label': 'data(label)',
  							'edge-text-rotation': 'autorotate',
  							'text-wrap': 'wrap',
  							'width': 3,
  							'length': 'auto',
  							'source-arrow-shape': 'triangle',
  							'line-color': 'data(color)',
  							'source-arrow-color': 'data(color)',
  							'curve-style': 'bezier',
  							'control-point-step-size': 40,
  							'font-size': 6,
  							'text-outline-color': '#FFFFFF',
  							'text-outline-width': 1,
  						}
  					},
  					{
  						selector: 'edge[label="wasInformedBy"]',
  						style: {
  							'length': '50',
  						}
  					},
  					{
  					  selector: ':parent',
  					  style: {
  						'background-opacity': 0.333
  					  }
  					},
  					{
  						selector: ':selected',
  						style: {
  							'border-width': 3,
  							'border-color': '#333'
  						}
  					},
  					{
  						selector: '.faded',
  						style: {
  							'opacity': 0.25
  						}
  					}
  					,
  					{
  						selector: 'node.prov_successor',
  						style: {
  							'border-width': 3,
  							'border-color': 'blue'
  						}
  					}
  					,
  					{
  						selector: 'node.prov_ancestor',
  						style: {
  							'border-width': 3,
  							'border-color': 'red'
  						}
  					}
  				]
  			});
        var browser = navigator.userAgent;
        if($.isFunction(browser.includes)){
          notSupported();
        }else{
          notSupported();
        }
        cy.prov_json().parse(x.message);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
