var element = document.getElementById('container');
var stage = new Kinetic.Stage({
  container: 'container',
  width: 800,
  height: 600
});

var layer = new Kinetic.Layer();
var group = new Kinetic.Group({draggable: true});

this.table = [];

drawPoly = function()
{
    poly = new Kinetic.Line({
     points: table,
     fill: '#00D2FF',
     stroke: 'black',
     strokeWidth: 5,
     closed: true,
     draggable: false
   });
   
   group.add(poly);
   poly.moveToBottom();
   group.draw();
   
   element.ondblclick = undefined;
};



element.ondblclick = function(evt) {
    var x = evt.pageX - element.offsetLeft;
    var y = evt.pageY - element.offsetTop;
    
    point = new Kinetic.Rect({
        x: x,
        y: y,
        width: 5,
        height: 5,
        fill: 'green',
        stroke: 'red',
        strokeWidth: 4,
        draggable: true
    });
    
    table.push(point.getAttr('x'));
    table.push(point.getAttr('y'));
    
    group.add(point);
    
    point.on('dragmove', function(){
        group = this.getParent();
        table = [];
        group.getChildren().forEach(function(point){
            table.push(point.getAttr('x'));
            table.push(point.getAttr('y'));
        });
        
        group.draw();
    });
    
    group.draw();
    
    
};

layer.add(group);

// add the layer to the stage
stage.add(layer);