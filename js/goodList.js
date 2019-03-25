$(function(){
   //头部和顶部
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
    //动态创建商品列表
    $.get("php/getGoodsList.php",function(data){
        let htmlStr="";
        for(let i=0;i<10;i++){
            htmlStr+=`  <li class="goods_list_det">
                            <a href="goodsDetails.html?goodsId=${data[i].goodsId}">
                                <img src="${data[i].goodsImg}" alt="">
                            </a>
                            <p><a href="" target="_blank">${data[i].goodsName}</a></p>
                            <h5>￥${data[i].goodsPrice}</h5>
                            <table class="goods_list_det_bot" cellpadding="0" cellpadding="0">
                                <tr>
                                    <td><a href="">${data[i].beiyong3}</a></td>
                                    <td><span>${data[i].beiyong4}人评论</span></td>
                                </tr>
                            </table>
                        </li>
                    `;
                    
        }
        $(".goods_list ul").html(htmlStr);

    },"json");

    //等待状态的页面
    $(".wait").ajaxStart(function(){
        $(this).fadeIn(300)
    })
})
$(function(){
    getCookie("userphone")
    
    if(getCookie("userphone") != null || getCookie("userphone") != ""){
        $(".empt").css({"display":"none"})
        $("#open").children().html(getCookie("userphone"))
        $("#open").children().click(function(evt){
            evt.preventDefault(); 
            window.open("cart.html")
        })
    }else{
        $(".empt").css({"display":"block"})
    }
})
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