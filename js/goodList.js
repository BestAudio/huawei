$(function(){
   
    //动态创建商品列表
    $.get("php/getGoodsList.php",function(data){
        let htmlStr="";
        for(let i=0;i<5;i++){
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
    
    if(getCookie("userphone") != null){
        $(".empt").css({"display":"none"})
        $("#open").html(getCookie("userphone"))
        $("#open").click(function(evt){
            evt.preventDefault(); 
            window.open("cart.html")
        })
    }else{
        $(".empt").css({"display":"block"})
    }
})