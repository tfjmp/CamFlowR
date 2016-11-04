var search = function() {
  cy.nodes().unselect();
  var b = document.getElementById('search').value;
  var eles = cy.nodes("[label*='"+b+"']");
  if(eles.empty()){
    vex.dialog.alert("Sorry, no node matching your query was found.");
    return;
  }
  eles.each(function(i, node){
    node.select();
  });
  cy.fit(eles, 10);
};

HTMLWidgets.widget({

  name: 'CamFlowVisualiser',

  type: 'output',

  factory: function(el, width, height) {

    var test = false;

    return {
      renderValue: function(x) {


        var notSupported = function(){
          var box = vex.dialog.alert({ unsafeMessage: 'Display in your browser to enjoy all features.<br/><img src="https://raw.githubusercontent.com/CamFlow/CamFlowR/master/www/helper.jpg"/>'});
          setTimeout( function(){box.close();}, 2000 );
        };

        var addButton = function(){
          var body = document.getElementsByTagName("BODY")[0]
          var para = document.createElement("div");
          para.innerHTML='<input type="checkbox" id="ancestors" name="ancestors" value="ancestors" onclick="showAncestor();"checked>Show Ancestor<br>\
      		  <input type="checkbox" id="successors" name="successors" value="successors" onclick="showSuccessor();" checked>Show Successor<br>\
      		  <input type="checkbox" id="control" name="control" value="control" onclick="ignoreControl();">Ignore Control Flow';
          body.appendChild(para);
        };

        var addSearch = function(){
          var body = document.getElementsByTagName("BODY")[0]
          var para = document.createElement("div");
          para.innerHTML = '<form id="tfnewsearch" action="javascript:search()">\
					     <input type="text" id="search" size="21" maxlength="120" placeholder="Search..."></input>\
               <input type="submit">\
				      </form>';
          body.appendChild(para);
        };

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
  							'text-halign': 'center',
                'width': 'label',
                'border-color': '#000000',
                'border-width': '1px',
                'padding-left': '5px',
                'padding-right': '5px',
                'padding-top': '5px',
                'padding-bottom': '5px'
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
        cy.panzoom({zoomOnly: true});
        if($.isFunction(browser.includes)){
          if(!browser.includes('RStudio')){
            var cxtmenuApi = cy.cxtmenu( prov_menu );
            addButton();
            addSearch();
            cy.navigator({});
          }else{
            notSupported();
          }
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

function showAncestor(){
  var show = document.getElementById("ancestors").checked;
  cy.prov_core().setShowAncestors(show);
}
function showSuccessor(){
  var show = document.getElementById("successors").checked;
  cy.prov_core().setShowSuccessors(show);
}
function ignoreControl(){
  var ignore = document.getElementById("control").checked;
  cy.prov_core().setIgnoreControlFlow(ignore);
}
