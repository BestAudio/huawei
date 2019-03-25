$(function(){

	$(".head").load("commonHeader.html",function(){
		 if(getCookie("userphone") != null || getCookie("userphone") != ""){
			console.log(getCookie("userphone"))
			$("#open").children().html(getCookie("userphone"))
			$("#open").children().click(function(evt){
				evt.preventDefault(); 
				window.open("cart.html")
			})   
		}
	})
	$(".footer").load("commonFooter.html")
	searchInfo()
	btnC()
	searchHint()
   
})

$(function(){
    //放大镜
    $(".goodsDetails_pic_img").mouseenter(function(){
        $(".mirrorBox").css({"display":"block"})
        $(".showBox").css({"display":"block"})
        magLens()
    })
    $(".goodsDetails_pic_img").mouseleave(function(){
        $(".mirrorBox").css({"display":"none"})
        $(".showBox").css({"display":"none"})
        magLens()
	})
	//数据获取
	goodsData()

	//加减
	
	
})

//放大镜
function magLens(){

   $("#imgList").children().click(function(){
    $(".goodsDetails_pic_img").css({"backgroundImage":$(this).css("backgroundImage")})
    $(".showBox").css({"backgroundImage":$(this).css("backgroundImage")});
   });
	
	$(".goodsDetails_pic_img").mousemove(function(event){
		let evt = event || window.event;
		//一、数据处理
        //1、改变数据（放大镜子的left和top）
        
		let  left1 = evt.pageX-parseInt($(this).offset().left)-$(".mirrorBox")[0].offsetWidth/2;
        let  top1 = evt.pageY-parseInt($(this).offset().top)-$(".mirrorBox")[0].offsetHeight/2;

		//2、边界处理
		if(left1<0){
			left1=0;
		}else if(left1>this.offsetWidth-$(".mirrorBox")[0].offsetWidth){
			left1=this.offsetWidth-$(".mirrorBox")[0].offsetWidth
		}

		if(top1<0){
			top1=0;
		}else if(top1>this.offsetHeight-$(".mirrorBox")[0].offsetHeight){
			top1=this.offsetHeight-$(".mirrorBox")[0].offsetHeight
		}

		//二、外观呈现
		$(".mirrorBox").css({"left":left1})
		$(".mirrorBox").css({"top":top1})
		$(".showBox").css({"backgroundPositionX":-1*3*left1,"backgroundPositionY":-1*3*top1});
	})
}

//获取数据
function goodsData(){
	let url = location.href
	let i = url.indexOf("?")
	goodsId = url.substring(i+1)
	godsArr = goodsId.split("=")
	$.get("php/getGoodsInfo.php",{goodsId:godsArr[1]},(data)=>{
		$("#classes").html(data.goodsType)
		$("#serise").html(data.goodsName)
		$(".goodsDetails_pic_img").css({"backgroundImage":"url("+data.goodsImg+")"})
		$(".showBox").css({"background-image":"url("+data.goodsImg+")"})
		let imglists = $("#imgList").children();
		//放大镜
		for(let i=0 ;i<imglists.length;i++){
			$(imglists[i]).css({"backgroundImage":"url("+data.goodsImg+")"})
		}

		//商品描述
		$("#ser_number").html(data.goodsId)
		$("#configuration").html(data.goodsDesc+data.beiyong6+"("+data.beiyong2+")")
		$("#adnis").html(data.beiyong7)
		$("#price").html("￥"+data.goodsPrice)
		$("#goods_cplor").children().html(`<img src="${data.goodsImg}" alt="">${data.beiyong2}`)
		$("#remmoPhone").html(data.beiyong8)
	
		//加减
		
		numbs()
		//跳转
		$("#add_cart").click(function(){
			
			$("#number").html($(".sum").val())
		

			$(".disp_z").css({"display":"block","width":$("body").css("width"),"height":$("body").css("height")})
			$("#hint_info").html(data.goodsName+data.goodsDesc)
			let vipname = getCookie("userphone")
			let goodsId = data.goodsId
			let count = $(".sum").val()
			console.log(count)
			$.get("php/addShoppingCart.php",{"vipName":vipname,"goodsId":goodsId,"goodsCount":count},function(data1){
				
				if(data1 == "1"){
					
					$("#go_cart").click(function(){
						window.open("cart.html")
					})
				}
			})
			//
			$(".close").click(function(){
				$(".disp_z").css({"display":"none"})
			})
			$("#back").click(function(){
				window.open("goodsList.html")
				window.location.href ="goodsList.html"
				window.location.target = "_blank"
			})
			
		})

	},"json")
}

//件数加减
function numbs(){
    $(".add").click(function(){
		let number = parseInt($(this).parent().prev().children().val())
        //获取文本框值
		number++
		$(this).parent().prev().children().val(number)
		
	})

    $(".subs").click(function(i,n){
		let number = parseInt($(this).parent().prev().children().val())
        if(number>1){
            number--
			$(this).parent().prev().children().val(number)
		}
	})	
}
 // 输入框的提示信息
 function searchInfo(){
	$("#placeholder_input").children().hover(function(){
		$(this).css({"color":"black"})},
	function(){
		$(this).css({"color":"#a6a6a6"})
	}  
	);
}
// 搜索框内提示
function searchHint(){
	$("#search").on("focus",function(){
		$("#placeholder_input").children().css({"opacity":"0"})
	})

	$("#search").on("blur",function(){
		$("#placeholder_input").children().css({"opacity":"1"})
	})
}
// 搜索框按钮
function btnC(){
	$("#btn01").on("mouseover",function(){
	$(this).siblings().css({"color":"#777777"})})
  
	$("#btn01").on("mouseout",function(){
		$(this).siblings().css({"color":"black"})})
		
	$("#btn01").siblings().on("mouseover",function(){
		$(this).css({"color":"#777777"})}) 

	$("#btn01").siblings().on("mouseover",function(){
			$(this).css({"color":"#777777"})})  
}
