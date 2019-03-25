$(function(){
    //账号登录切换
    let userphone = getCookie("userphone")
    let userpass = getCookie("userpass")
    console.log(userphone)
    console.log(userpass)
    $("#username").val(userphone)
    $("#userpass").val(userpass)
    $("#account").click(function(){
        $(".login_form_center").fadeIn(500);
        $(".codeQR").css({"display":"none"});
    })

    $("#QRcode").click(function(){
        $(".login_form_center").css({"display":"none"});
        $(".codeQR").fadeIn(500);
    })
    
    //二维码滑过效果
    $(".codeQR_img").on("mouseenter",function(){
        let left = parseInt($(this).css("left"))
        if(left == 110){
            $(this).animate({"left":"10px"},500)
            $(".codeQR_help").fadeIn(500)
        }else{
            $(this).stop(true,false)
            $(".codeQR_help").stop(true,false)
            $(this).css({"left":left})
        }
        
    })

    $(".codeQR").on("mouseleave",function(){
        $(".codeQR_img").animate({"left":"110px"},500)
        $(".codeQR_help").fadeOut(500)
    })
    

    //登录ajax请求
    $("#login_submit").click(function(){
        $.post("php/login.php",{"userphone":$("#username").val(),"userpass":$("#userpass").val()},(data)=>{
           console.log(data)
            if(data == 0){
                addCookie("userphone", $("#username").val(),30)
                addCookie("userpass", $("#userpass").val(),30)
                $("#password_hint").css({"display":"none"})
                window.location.href = "index.html"

            }else{
                $("#password_hint").css({"display":"inline-block"})
            }
        })
    })
})
//添加cookie
function addCookie(key,value,dayCount) {
	//1、定义日期
	var d = new Date();
	d.setDate(d.getDate()+dayCount);
	//2、保存cookie
	document.cookie = key+"="+escape(value)+";expires="+d.toGMTString();
}
//获取cookie
function getCookie(key){//username=baobao; userpass=123456

	//1、获取所有的cookie
	var str = unescape(document.cookie);

	//2、用“; ”分割成数组
	var arr = str.split("; ");//["username=baobao","userpass=123456"];

	//3、循环查找
	for(var i in arr){
		if(arr[i].indexOf(key+"=")==0){
			return arr[i].split("=")[1];
		}
	}

	return null;
}


