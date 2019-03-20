
//轮播图
class BannerPic{
	constructor(obj){
		let defaultObj = {
			"boxDom":null,//轮播图的容器
			"imgDoms":[],//存放所有图片dom的数组(img标签)
			"spanL":null,
			"spanR":null,
			"width":"500",
			"height":"300",
			"imgs":[],
			"opacity":"1",
			"douSize":12,//豆豆的大小
			"border":"1px solid white",
			"douSpace" : 10,//豆豆的间距
			"douColor" : "",//豆豆的颜色
			"douHighColor":"white",//高亮颜色
			"douIsCircle":true,//是否是圆的
			"doudouDirection":"上",//"上"，"右"，"下"，"左"，

			"currIndex":0,//当前显示的图片序号
			"myTimer":null,
			"timeSpace":2000
		};

		//属性
		for(let key in defaultObj){
			if(obj[key]==undefined){
				this[key] = defaultObj[key];
			}else{
				this[key] = obj[key];
			}
		}

		this.width = this.boxDom.offsetWidth;
		this.height = this.boxDom.offsetHeight;

		this.initUI();
		this.createUI();
		this.addEvent();
		this.autoPlay();
	}

	initUI(){
		this.boxDom.style.position = "relative";
		this.boxDom.style.overflow = "hidden";
	}

	createUI(){

		//1、创建所有的img标签
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `position: absolute;
					left:0px;
					top:0px;
					width: 100%;
					height: 100%;
					opacity:0;`;
			if(i==0){
				imgDom.style.opacity = "1";
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}

		//2、创建UL（豆豆的容器）
		let ulDom = document.createElement("ol");
		ulDom.style.cssText=`position: absolute;
					list-style: none;				
					z-index: 3;`;

		switch(this.doudouDirection){
			case "上":
						ulDom.style.top="40px";
						ulDom.style.left= (this.width-this.douSize*2*this.imgs.length)/2 +"px";
						break;
			case "下":
						ulDom.style.bottom="80px";
						ulDom.style.right= "150px";
						break;
		}
		this.boxDom.appendChild(ulDom);
		//3、创建li（豆豆）
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText =`
					float:left;
					width:${this.douSize}px;
					height: ${this.douSize}px;
					margin-right: ${this.douSpace}px;
					background-color: ${this.douColor};
					border:${this.border};
				`;
			if(this.douIsCircle){
				liDom.style.borderRadius = "50%";
			}
			if(i==0){
				liDom.style.backgroundColor = this.douHighColor;
			}
			ulDom.appendChild(liDom);
		}
	}


	addEvent(){
		//2、停止播放（给box绑定事件）
		this.boxDom.onmouseenter = ()=>{
			this.stopPlay();
		}

		//3、继续播放（给box绑定事件）
		this.boxDom.onmouseleave = ()=> {
			this.autoPlay();
		}

		// 点击向前向后
		

		//4、跳转(给li)
		let liDoms = this.boxDom.lastElementChild.children;
		for(let i=0;i<liDoms.length;i++){
			let obj = this;

			liDoms[i].onclick = function(){
				obj.goImg(this.getAttribute("index"));
			}
			liDoms[i].onmouseenter = function(){
				obj.goImg(this.getAttribute("index"));
			}		
		}
	}
	
	autoPlay(){
			this.myTimer = setInterval(()=>{
				//一、数据处理
				//1、改变数据
				let outIndex = this.currIndex;
				 this.currIndex++;

				//2、边界处理
				if( this.currIndex>this.imgs.length-1){
					 this.currIndex=0;
				}

				//二、改变外观
				 this.showImg( this.currIndex,outIndex);

			},this.timeSpace);

	}

	stopPlay(){
		window.clearInterval(this.myTimer);
	}

	goImg(index){
		//一、数据处理
		//1、改变数据
		let outIndex = this.currIndex;
		this.currIndex = index;
		
		//2、边界处理
		if(this.currIndex<0 || this.currIndex>this.imgs.length-1){
			this.currIndex = 0;
		}
		
		//二、改变外观
		this.showImg(this.currIndex,outIndex);

	}

	//显示指定的图片
	//参数：
	//进入的图片的下标
	//出去的图片的下标
	showImg(inIndex,outIndex){
		if(inIndex==outIndex){
			return;
		}

		if(inIndex<0 || inIndex>this.imgs.length){
			return;
		}

		if(outIndex<0 || outIndex>this.imgs.length){
			return;
		}

		// this.imgDoms[inIndex].style.opacity = this.opacity;
		//1、改图片
		fadeInOut(this.imgDoms[inIndex],this.imgDoms[outIndex],200);

		//2、改豆豆		
		//1）、让所有的li的background-color是pink
		let liDoms = this.boxDom.lastElementChild.children;
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].style.backgroundColor = this.douColor;
		}
		//2）、让当前li的background-color是red
		liDoms[inIndex].style.backgroundColor = this.douHighColor;
	}

}