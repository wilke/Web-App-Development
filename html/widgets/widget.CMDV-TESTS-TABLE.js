(function() {
  
  
  // var promise = jQuery.Deferred();
//   promise.resolve();
//   promise.then( function () { alert('promise fulfilled'); });
//
//
//   var promise = jQuery.Deferred();
//   var promises = [];
//   promises.push(promise1);
//   promises.push(promise2);
//   jQuery.when.apply(this, promises).then(function() {
//       promise.resolve();
//   });
  
  
  var widget = Retina.Widget.extend({
    // most information in the about function is intended for conveying information
    // to the programmer using the widget
    // the requires array is a comma separated list of required javascript libraries
    // they will be loaded when the widget is loaded
    about: {
      title: "Test Table Widget",
      name: "CMDV-TESTS-TABLE",
      version: 1,
      author: "Andreas Wilke",
      requires: []
    }
  });

  // this will be called by Retina automatically to initialize the widget
  // note that the display function will not be called until this is finished
  // you can add functions that return promises to the return list, i.e.:
  // this.loadRenderer('table')
  // which would make the table renderer available to use before the display function is called
  // you can add multiple comma separated promises
  widget.setup = function() {
    return [
      Retina.load_renderer("table"),
      widget.loadData(),
    ];
  };


  widget.loadData = function() {
    
    var url = "http://localhost:8001/shock/api/node/";
    var request = $.ajax({
	                        dataType: "json",
	                        url: url,
                  });
    request.done( 
  	function( data ){
    	    console.log("LOAD DATA");
    	    console.log(data); 	 
          stm.DataStore.cmdvTests = [] ;
          
    	    for ( i = 0 ; i < data.data.length ; i++) {
            stm.DataStore.cmdvTests.push(data.data[i]) ;
            }
          // let myList = data.data.map( function(v,i){ return i } ) 	    
  	     }
      );
      request.fail(console.log("URL call " + url + " failed"));
    
  }

  // this will be called whenever the widget is displayed
  // the params should at least contain a space in the DOM for the widget to render to
  // if the widget is visual
  widget.display = function(params) {
    var widget = this ;
    var target = params.target ;
    
    
    if (! stm.DataStore.hasOwnProperty('cmdvTests')) {
      console.log('Data not loaded')
      widget.loadData().then( function() { Retina.WidgetInstances.mywidget[1].display();
    });
      return;
    }
    
    
    target.innerHTML = "<h3>CMDV-Test-Runner</h3>";
    
    console.log("HHHHHHHH");
    console.log(stm.DataStore.cmdvTests);
    
    var TestOverviewData = { 
      data : [] ,
      header : ['Node ID' , 'Some other' , 'ACME'] ,
    } ;
    
     // TestOverviewData['data'] = stm.DataStore.cmdvTests.map( function(i) { [i.id , i.version ] } ) ;
    
    for ( let i = 0 ; i < stm.DataStore.cmdvTests.length ; i++) { 
      console.log( stm.DataStore.cmdvTests[i].id);
      TestOverviewData.data.push([
                                  stm.DataStore.cmdvTests[i].id , 
                                  stm.DataStore.cmdvTests[i].version,
                                  'TOBI!',
                                ]);
    };
    
    // adding target for table
    var tableRendererTarget = document.createElement('div');
    target.appendChild(tableRendererTarget);
    
    var myTable = Retina.Renderer.create('table',
        { 
          'target': tableRendererTarget,
          'data' : TestOverviewData  
      
          // /'data': Retina.RendererInstances.table[0].exampleData()
    } );
    myTable.render();
    
    return widget
  };

  // this can be accessed anywhere within this widget
  // or through a reference to this widget
  widget.someVariable = 'someValue';

  // add subfunctions your widget needs like this
  widget.someFunction = function(params) {

  };

})();
