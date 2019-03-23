$(function(){
    getCookie("userphone")
    if(getCookie("userphone") != null){
        $("#open").children().html(getCookie("userphone"))
        $("#open").children().click(function(evt){
            evt.preventDefault(); 
            window.open("cart.html")
        })
        
    }
    
    // 输入框的提示信息
    searchInfo()

    // 搜索框内提示
    searchHint()
       
    // 搜索框按钮
    btnC()
    
    //悬挂条锚点连接
    mapHref()
   
    //轮播图
    new BannerPic({
        "boxDom":$("#box1")[0],//轮播图的容器
        "spanL":$("#spanL"),
        "spanR":$("#spanR"),
        "imgs":["img/index/banner_01.jpg","img/index/banner_02.jpg","img/index/banner_03.jpg","img/index/banner_04.jpg","img/index/banner_05.jpg","img/index/banner_06.jpg","img/index/banner_07.jpg","img/index/banner_08.jpg","img/index/banner_09.jpg"],
        "doudouDirection":"下"

    });

    //小轮播图
    new BannerPic({
        "boxDom":$("#box2")[0],//轮播图的容器
        "imgs":["img/index/small_banner01.jpg","img/index/small_banner02.jpg","img/index/small_banner03.jpg","img/index/small_banner04.jpg","img/index/small_banner05.jpg","img/index/small_banner06.jpg","img/index/small_banner07.jpg","img/index/small_banner08.jpg"],
        "doudouDirection":"下"			
    });
    // 划过二级菜单
    twoList()

    //动态创建二级菜单内容
    
    //公告
    noticeBo()
   
    //点击箭头滑动列表
    sweep()

    //锚点连接列表
    anchorPoint()

    //锚点连接左侧下划线
    anchorPointStyle()
  
    //登录弹出框
    open("login.html")

    hrefT()
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
    //悬挂条锚点连接
    function mapHref(){
        $(window).scroll(function(){
            if($("#anchor").offset().top>$("#anchor_position_dis").offset().top){
                $("#anchor").css({"display":"inline"}) 
            }else if($("#anchor").offset().top<$("#anchor_position_dis").offset().top){
                $("#anchor").css({"display":"none"}) 
            }     
        })

        $("#anchor").click(function(){
            let scrollTop = $("#anchor").offset().top;
            let myTimer = setInterval(() => {
                scrollTop-=200;
                $(window).scrollTop(scrollTop)
                if(scrollTop<0){
                    window.clearInterval(myTimer);
                }
            }, 10);
        })
    }
    // 划过二级菜单
    function twoList(){
        $(".list").children().hover(function(){
            $(".list_hover_goods").css({"display":"block"})
        },
        function(){
            $(".list_hover_goods").css({"display":"none"})
        }
        )
    }
   
    //公告函数
    let ulPos = 0;
    let myTimer01 = null
    let stepSpace = 1500;
    function noticeBo(){
        myTimer01 = setInterval(() => {
            ulPos-=44;
            if(ulPos<-1*(parseInt($(".channel_list_exp_des").css("height"))-44)){
                $(".channel_list_exp_des").css({"top":"0"})
                ulPos = 0;
            }else{
                $(".channel_list_exp_des").animate({"top":ulPos},500)
            }
        }, stepSpace)

         $(".channel_list_exp_des").hover(function(){
            window.clearInterval(myTimer01);
            $(".channel_list_exp_des a").css({"color":"#d7021b"})
        },function(){
            noticeBo()
            $(".channel_list_exp_des a").css({"color":"#777777"})
        })
    }

    //点击箭头滑动列表
    function sweep(){
        let leftSpace = 0
        $(".bou_remm_btnL").on("click",function(){
            let confine = parseInt($(this).siblings(".recommend").css("left")) 
            let conine = ($(this).siblings(".recommend").children().last()).is("hidden")
            if(confine < -2000){
                return;
            }else{
                leftSpace -= 1200
                $(this).siblings(".recommend").animate({left:leftSpace},500)
            }
            
        })
        $(".bou_remm_btnR").on("click",function(){
            let confine = parseInt($(this).siblings(".recommend").css("left")) 
            if(confine == 0){
                return;
            }else{
                leftSpace += 1200
                $(this).siblings(".recommend").animate({left:leftSpace},500)
            }
        })
    }
    //锚点连接显示
    function anchorPoint(){
        $(window).scroll(function(){
            scrollTop = parseInt($(window).scrollTop());
            if(parseInt($(".anchor_point").css("right")) == -70 && scrollTop>2000){
                $(".anchor_point").animate({"right":0},300)
            }
            if(parseInt($(".anchor_point").css("right")) == 0 && scrollTop<=2000){
                $(".anchor_point").animate({"right":-70},300)
            }
        }) 
    }
    //锚点连接左侧下划线
    function anchorPointStyle(){
        $("#anchor_point_ul").children().on("click",function(){
            $(this).siblings().css({"color":"#777777"})
            $(this).siblings().children().animate({"height":0},200)
            $(this).children("span").animate({"height":20},200)
            $(this).css({"color":"black"})
            
        })
    }
    //锚点连接连接对应位置
    function hrefT(){
        for(let i =0;i<=7;i++){
            $("#anchor_point_ul").children()[i].onclick = function(){
                // $(window).scrollTop($("#point"+i).offset().top)
                $(window).animate({"scrollTop":$("#point"+i).offset().top},300)
            }
        }
    }
    //弹出框登录页面
       