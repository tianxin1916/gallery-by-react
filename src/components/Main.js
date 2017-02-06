require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var  yeomanImage = require('../images/yeoman.png');
var imgDatas=[
   {
  "filName":"1.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"2.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"3.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"4.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"5.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"6.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"7.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"8.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"9.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  {
  "filName":"10.jpg",
  "title":"My photo",
  "desc":"This is my first react project."

  },
  ];
var imgDatasArr=(function getImagUrl(imgDatasArr){
  for(var i=0;i<imgDatas.length;i++){
    var imgArr=imgDatasArr[i];
     imgArr.imageUrl=require('../images/'+imgArr.filName);
     imgDatasArr[i]=imgArr;
  }
  return imgDatasArr;

})(imgDatas);

function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high-low)+low);
}
function get30Deg(){
  return ((Math.random()>0.5?"":"-")+ Math.random()*30);
}
var  ImgFigure=React.createClass(
  {
    handleClick:function(e){
      if(this.props.arrange.isCenter){
         this.props.inverse();
       }else{
         this.props.center();
       }
     
      e.stopPropagation();
      e.preventDefault();

    },
    render(){
      var StyleObj={};
         if(this.props.arrange.pos){
           console.log(this.props.arrange.pos);
           StyleObj=this.props.arrange.pos;
          }
          if(this.props.arrange.rotate){
            var valueArr=['Webkit',"Moz","Ms","O",""];
             for(var i=0;i<valueArr.length;i++){
                StyleObj[valueArr[i]+'Transform']="rotate("+this.props.arrange.rotate+"deg)";
             }
          }
          if(this.props.arrange.isCenter){
             StyleObj.zIndex=15;
          }
         
          var imgFigureClassName="img-figure";
          imgFigureClassName+=this.props.arrange.isInverse?" is-inverse":"";
        return (
           <div className={imgFigureClassName} style={StyleObj} onClick={this.handleClick}>
            <img src={this.props.data.imageUrl}/>
            <div className="img-desc"><h2>{this.props.data.title}</h2></div>
            <div className="img-back">
              <p>{this.props.data.desc}</p>
            </div>
           </div>
        )
    }
  }

  )
var Controller=React.createClass({
  handleClick:function(){
    if(this.props.arrange.isCenter){
         this.props.inverse();
       }else{
         this.props.center();
       }
  },
  render:function(){
    var controllClassName="controller-unit";
      if(this.props.arrange.isCenter){
        controllClassName+=" is-center";
        if(this.props.arrange.isInverse){
            controllClassName+=" is-inverse";
        }
      }
    return (
        <span className={controllClassName} onClick={this.handleClick}>
        </span>
      )
  }
})
var AppComponent=React.createClass({
  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  },
  inverse:function(index){
    return function(){
      var imgsArrangeArr=this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
      this.setState({imgsArrangeArr:imgsArrangeArr});
    }.bind(this)
  },
  reArrangeImg:function(centerIndex){
       var imgsArrangeArr=this.state.imgsArrangeArr,
       Constant=this.Constant,
       centerPos=Constant.centerPos,
       hPosRange=Constant.hPosRange,
       vPosRange=Constant.vPosRange,
       hPosRangeLeftSecX=hPosRange.leftSecX,
       hPosRangeRightSecX=hPosRange.rightSecX,
       hPosRangeY=hPosRange.y,
       vPosRangeX=vPosRange.x,
       vPosRangeY=vPosRange.topY,
       imgsArrangeTopArr=[],
       topImgNum=Math.floor(Math.random()*2),
       topImgSpliceIndex=0,
       imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
       //首先居中对齐
       imgsArrangeCenterArr[0]={
         pos:centerPos,
         rotate:0,
         isCenter:true
       }
       //取出布局上面的图片
       topImgSpliceIndex=Math.floor(Math.random()*(imgsArrangeArr.length-topImgNum));
       imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

       //布局位于上侧的图片
       imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index]={
            pos:{
               top:getRangeRandom(vPosRangeY[0],vPosRangeY[1]),
               left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
               },
             rotate:get30Deg(),
             isCenter:false

      }})
       //布局左右
       for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
          var hPosRangeLORX=null;
          if(i<k){
             hPosRangeLORX=hPosRangeLeftSecX;
          }else{
             hPosRangeLORX=hPosRangeRightSecX;
          }
          imgsArrangeArr[i]={
              pos:{
                 top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                 left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
              },
              rotate:get30Deg()
          }
       }
       if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
       }
       imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
       this.setState({imgsArrangeArr:imgsArrangeArr})

        console.log(this.state.imgsArrangeArr);


  },
  center: function(index) {
    return function() {
      this.reArrangeImg(index);
    }.bind(this);
  },
  getInitialState:function(){
     return{
        imgsArrangeArr:[
            // pos:
           ]
     }
  },
  componentDidMount:function(){
    var stage = this.refs.stageContent;
    console.log(stage);
    var stageWidth=stage.scrollWidth,stageHeight=stage.scrollHeight;
    var hafStageW=Math.floor(stageWidth/2),hafStageH=Math.floor(stageHeight/2);
    var img=this.refs.imgFigure0;
    var imgWidth=320,imgHeight=380;
    var hafImgW=Math.floor(imgWidth/2),hafImgH=Math.floor(imgHeight/2);
    //center
    this.Constant.centerPos={
      left:hafStageW-hafImgW,
      top:hafStageH-hafImgH
    };
    //left,right
    this.Constant.hPosRange.leftSecX[0]=-hafImgW;
     this.Constant.hPosRange.leftSecX[1]=hafStageW-hafImgW*3;
    this.Constant.hPosRange.rightSecX[0]=hafStageW+hafImgW;
    this.Constant.hPosRange.rightSecX[1]=2*hafStageW-hafImgW;
    this.Constant.hPosRange.y[0]=-hafImgH;
    this.Constant.hPosRange.y[1]=2*hafStageH-hafImgH;
    //top
    this.Constant.vPosRange.x[0]=hafStageW-2*hafImgW;
    this.Constant.vPosRange.x[1]=hafStageW;
    this.Constant.vPosRange.topY[0]=-hafImgH;
    this.Constant.vPosRange.topY[1]=hafStageH-hafImgH*3;
    this.reArrangeImg(0);

  },
  render() {
      var controllerUnits=[],imgFigures=[];
   
      imgDatasArr.forEach(function(value,index){
     if(!this.state.imgsArrangeArr[index]){
             
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
       
      }
        imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/ >);
        controllerUnits.push(<Controller key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
      }.bind(this))

    return (
        <section className="stage" ref="stageContent">
          <div className="img-box">
            {imgFigures}
          </div>
          <div className="controller">
            {controllerUnits}
          </div>
        </section>
    );
  }
})

AppComponent.defaultProps = {
};

export default AppComponent;