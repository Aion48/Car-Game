

var drawphase = true;
var shapepoints = [];
var originpX;
var originpY;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);



  strokeWeight(5)
  for(var i = 1; i < shapepoints.length; i++ ){

    line(shapepoints[i-1][0],shapepoints[i-1][1],shapepoints[i][0],shapepoints[i][1]);
  }
  if(shapepoints.length >= 1 && drawphase == true){

        line(shapepoints[shapepoints.length - 1][0],shapepoints[shapepoints.length - 1][1],mouseX,mouseY);

  }
  strokeWeight(1)


  for(var i = 0; i < shapepoints.length; i++ ){
    circle( shapepoints[i][0],shapepoints[i][1],width / 100);
  }

  if(drawphase == true){
    circle(mouseX,mouseY,width / 100);
  }

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

  if(shapepoints.length > 0){
    if(Math.sqrt(Math.pow(mouseX - shapepoints[0][0],2) + Math.pow(mouseY - shapepoints[0][1],2)) > 35){
      if(push == true){
        if(drawphase == true){
          shapepoints.push([mouseX,mouseY]);
        }
      }
    }else{
        shapepoints.push([originpX,originpY]);
        drawphase = false;

    }
  }else{
    if(push == true){
      if(drawphase == true){
        shapepoints.push([mouseX,mouseY]);
        originpX = mouseX;
        originpY = mouseY;
      }
    }
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
