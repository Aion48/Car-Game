
var ratio;
var shapepoints = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  ratio = windowWidth / windowHeight;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ratio = windowWidth / windowHeight;
}

function draw() {
  background(220);

  //Driver
  var d_side = width / 25;
  //rect((width/2) - (d_side/2),(height/2) - (d_side/2),( d_side),(d_side));
  strokeWeight(5)
  for(var i = 1; i < shapepoints.length; i++ ){

    line(shapepoints[i-1][0],shapepoints[i-1][1],shapepoints[i][0],shapepoints[i][1])
  }
  if(shapepoints.length >= 1){

        line(shapepoints[shapepoints.length - 1][0],shapepoints[shapepoints.length - 1][1],mouseX,mouseY);

  }
  strokeWeight(1)


  for(var i = 0; i < shapepoints.length; i++ ){
    circle( shapepoints[i][0],shapepoints[i][1],width / 100);
  }

    circle(mouseX,mouseY,width / 100);


  //line()






}
function mouseClicked() {
  var push = true;
  if(shapepoints.length >= 2){
    for(var i = 1; i < shapepoints.length - 1; i++ ){
      var mouseline0 = new Point(shapepoints[shapepoints.length - 1][0],shapepoints[shapepoints.length - 1][1]);
      var mouseline1 = new Point(mouseX,mouseY);
      var oldline0 = new Point(shapepoints[i-1][0],shapepoints[i-1][1]);
      var oldline1 = new Point(shapepoints[i][0],shapepoints[i][1]);
      var intersectionPo = intersectionP(getCoe(mouseline0,mouseline1),getCon(mouseline0,mouseline1),getCoe(oldline0,oldline1),getCon(oldline0,oldline1));

      if(intersectionPo != -2 && intersectionPo != -1 ){
        if(mouseline0.x > mouseline1.x){
          if(oldline0.x > oldline1.x){
            if((intersectionPo.x > mouseline1.x && intersectionPo.x < mouseline0.x) && (intersectionPo.x > oldline1.x && intersectionPo.x < oldline0.x)){
              push = false;
            }
          }else{
            if((intersectionPo.x > mouseline1.x && intersectionPo.x < mouseline0.x) && (intersectionPo.x < oldline1.x && intersectionPo.x > oldline0.x)){
              push = false;
            }
          }
        }else{
          if(oldline0.x > oldline1.x){
            if((intersectionPo.x < mouseline1.x && intersectionPo.x > mouseline0.x) && (intersectionPo.x > oldline1.x && intersectionPo.x < oldline0.x)){
              push = false;
            }
          }else{
            if((intersectionPo.x < mouseline1.x && intersectionPo.x > mouseline0.x) && (intersectionPo.x < oldline1.x && intersectionPo.x > oldline0.x)){
              push = false;
            }
          }
        }
      }else{
        if(intersectionPo == -1){
          push = false;
        }
      }


    }
  }
  if(push == true){
      shapepoints.push([mouseX,mouseY]);
  }
}

function getCoe(p1,p2){
  var coefficient = (p2.y - p1.y) / (p2.x - p1.x);
  return coefficient;
}

function getCon(p1,p2){
    var coe = getCoe(p1,p2);
    var bep = coe * p1.x;
    var yintercept = p1.y - bep;
    return yintercept;

}

function intersectionP(coe1,con1,coe2,con2){

  if(coe1 != coe2){
    var intersectionX = (con2 - con1) / (coe1 - coe2);
    var intersectionY = (intersectionX * coe1) + con1;
    var intersectionPoint = new Point(intersectionX,intersectionY);
    return intersectionPoint;
  }else{
    if( con1 == con2){
      return -2;
    }else{
      return -1;
    }
  }

}


function Point(x,y){
  this.x = x;
  this.y = y;
}
