$(function(){
    $(".footer").load("commonFooter.html",function(){
        if(getCookie("userphone") != null && getCookie("userphone") !=""){
            $("#open").children().html(getCookie("userphone"))
            $(".car_hint").css({"display":"none"})
            $("#open").children().click(function(evt){
                evt.preventDefault(); 
                window.open("cart.html")
            })  
        }
    })
    // mapHref()
    ajaxQ()
})
//悬挂条
// function mapHref(){
//     $(window).scroll(function(){
//         if($("#anchor").offset().top>$("#anchor_position_dis").offset().top){
//             $("#anchor").css({"display":"inline"}) 
//         }else if($("#anchor").offset().top<$("#anchor_position_dis").offset().top){
//             $("#anchor").css({"display":"none"}) 
//         }     
//     })

//     $("#anchor").click(function(){
//         let scrollTop = $("#anchor").offset().top;
//         let myTimer = setInterval(() => {
//             scrollTop-=200;
//             $(window).scrollTop(scrollTop)
//             if(scrollTop<0){
//                 window.clearInterval(myTimer);
//             }
//         }, 10);
//     })
// }
//ajax请求
function ajaxQ(){
   let vipName = getCookie("userphone");
   let vip = vipName.substring(0,vipName.length-1);
    $.get("php/getShoppingCart.php",{"vipName":vip},function(data){
        if(data.length == 0){
            $(".empt").css({"display":"block"})
            $(".count").css({"display":"none"})
        }else{
            $(".empt").css({"display":"none"})
            $(".count").css({"display":"block"})
            for(let i=0;i<data.length;i++){
                let  htmlStr = `
                <div class="goods_list">
                    <div class="shopping_info">
                    <label class="checked_name checked_goods" for="checked_p">
                        <input type="checkbox" class="checked_p" class="check_shop">
                        <img src="${data[i].goodsImg}" alt="">
                    </label>
                    <div class="goods_details">
                        <ul>
                            <li>
                                <a href="">
                                    ${data[i].goodsDesc+data[i].beiyong6+"("+data[i].beiyong2+")"}
                                </a>
                            </li>
                            <li>
                                <span class="price">￥${data[i].goodsPrice}</span>
                            </li>
                            <li>
                                <div class="counts">
                                    <input class="sum" type="text" value="${data[i].goodsCount}">
                                </div>
                                <p class="btnadd">
                                    <span class="add sum_number">+</span>
                                    <span class="subs sum_number">-</span>
                                </p>
                            </li>
                            <li><span class="nub_price">￥${data[i].goodsPrice*data[i].goodsCount}.00</span></li>
                            <li class="delete">删除</li>
                            <li style="display:none">${data[i].goodsId}</li>
                        </ul>
                    </div>
                </div>`
                $(".unempt").append(htmlStr)  
            }
             //购物车数量加减
            numbs()  
            //购物车总金额
            
            //总价固定
            fixedSum()

            //删除
            deleteShop()

            //总金额
            sum()

            //全选
            checkedAll()
        }  
    },"json")
}


//总价固定
function fixedSum(){
    let top1 = parseInt($(".closecount").offset().top);
    let top3 = parseInt($(window).height());
    let top = top1 - top3
    $(window).scroll(function(){
        let top2 = $(window).scrollTop();
        if(top2<top){
            $(".closeC").css({"position":"fixed","bottom":"0px"}) 
        }else{
            $(".closeC").css({"position":"static"}) 
        }
    })
}
//删除
function deleteShop(){
    $(".delete").on("click",function(){ 
        if(true){
            let goodsId = $(this).next().html(); 
            console.log(goodsId)
            let vipName = getCookie("userphone");
            let vip = vipName.substring(0,vipName.length-1);
            console.log(vipName)
            $.get("php/deleteGoods.php",{"vipName":vip,"goodsId":goodsId},function(data){
                
                if(data == 1){
                    
                }else{
                    alert("删除失败")
                }
            })
            $(this).parent().parent().parent().parent().hide(300,function(){
            
                $(this).remove();
            })

        }
        
    })
}
//全选
function checkedAll(){
    //点击全选控制复选
    $(".checked_n").on("click",function(){
        
        if(this.checked){
            $(".checked_n").each(function(){this.checked = "checked"})
            $(".checked_p").each(function(){this.checked = "checked"})
        }else{
            $(".checked_n").each(function(){this.checked = ""})
            $(".checked_p").each(function(){this.checked = ""})
        }
    })
    // 点击复选控制全选
    $(".checked_p").on("click",function(){
        let result = true;
        $(".checked_p").each(function(){
            if(this.checked == false){
                result = false
            }
        }) 
        if(result){
            $(".checked_n").each(function(){this.checked = "checked"})
            
        }else{
            $(".checked_n").each(function(){this.checked = ""})
        }
    })
}
//总金额
function sum(){
    $(".check_shop").on("click",function(){
        let one_price = parseInt(($(this).parent().next().children().children().eq(3).children().html()).substring(1))
        let one_count = parseInt(($(this).parent().next().children().children().eq(2).children().children().val()))
        let prices = parseInt($("#prices").html().substring(1))
        let counts = parseInt($("#choose").html())
        if($(this)[0].checked == true){
            $("#prices").html("￥"+(prices+one_price).toFixed(2))
            $("#choose").html(counts+one_count)
        }else{
            $("#prices").html("￥"+(prices-one_price).toFixed(2))
            $("#choose").html(counts-one_count)
        }
    })
    // $(".sum_number").each(function(){
    //     if(this.checked = true){
            
    //     }
    // })
}
//购物车数量加减
function numbs(){
    $(".sum_number").click(function(){
        let number = parseInt($(this).parent().prev().children().val())
        let sPrice = $(this).parent().parent().prev().children().html()
        let price = parseInt(sPrice.substring(1))
        let num = $(this).html()
        num =="+"?number++:number--;
        if(number<1){
            number=1
        }
            price = (price*number).toFixed(2)
            $(this).parent().prev().children().val(number)
            $(this).parent().prev().parent().next().children().html("￥"+price)
       
    })
}


