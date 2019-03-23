$(function(){
    //电话号码验证
    $("#phone").on("blur",function(){
        $.get("php/regUserphone.php",{"userphone":$("#phone").val()},(data)=>{
            if(data == 1){
                $(this).parent().siblings("span").eq(1).css({"display":"none"})
            }else{
                $(this).parent().siblings("span").eq(1).css({"display":"block"})
            }
        })
    })
    //手机号正则验证
    phoneVerify("phone")

    //邮箱验证
    phoneVerify("email")

    //短信验证码
    phoneVerify("messageCode")
    
    //密码验证
    phoneVerify("userpass")
    
    //密码强度
    passwStro()

    //确认密码
    phoneVerify("repassword")

    //滑动验证
    linerImg()

    //国籍列表
    countryList()
    
    //选择国家
    checkCoun()

    //拖拽验证
    $(".smallBtn").mousedown(function(){
		$(".smallBtn").mousemove(function(event){
            var evt = event || window.event;
            var offsetX = $(".reg_img_par").offset().left;
            var pageX = evt.pageX;
            var width = parseInt(($(".smallBtn").css("width")))/2
			//鼠标距离页面左上角的位置减去偏移量
            $(".reg_smallimg").css({"left":(pageX-offsetX-width)})
            $(".smallBtnp").css({"left":(pageX-offsetX-width)})
            $(".smallBtnp").siblings("span").html("") 
            var leftT = parseInt($(".smallBtnp").css("left"))
            var leftH = parseInt($(".img_index").css("left"))
            if(leftT == leftH){
            $(".smallBtnp").siblings("span").html("验证成功")
            
            }
        })  
    }) 
    
    $(".smallBtn").mouseup(function(){
        var leftT = parseInt($(".smallBtnp").css("left"))
        var leftH = parseInt($(".img_index").css("left"))
        if(leftT == leftH){
            $(".smallBtnp").siblings("span").html("验证成功")
            $(".reg_img_par").fadeOut(1000)
            $("#diamonds").html("验证成功")
        }else{
            $(".reg_smallimg").css({"left":0})
            $(".smallBtnp").css({"left":0})
            $("#diamonds").html("拖动左边滑块完成上方拼图")
        }
    })  
    //注册按钮
    submitBtn()

    //关闭提示
    cloaseBTN()

    //邮箱、手机登录
    login()

})
//正则匹配
function regExpHuawei(type,str){
	switch(type){
		case "phone":var reg = /^1\d{10}$/;break;
		case "email":var reg = /^\w{3,}@\w{2,}\.(com|cn|net|com\.cn)$/i;break;
		case "messageCode":var reg = /^\d{6}$/;break;
        case "userpass":var reg = /^(((?![^a-zA-Z]+$)(?!\D+$)(?=[^\s]*$))|((?![^!@#$%^&*_+=]+$)(?!\D+$)(?=[^\s]*$))|((?![^a-zA-Z]+$)(?![^!@#$%^&*_+=]+$)(?=[^\s]*$))).{8,}$/;break;
        default :return;
        //
	}
	return reg.test(str);

}
//正则验证
function phoneVerify(str){
     $("#"+str).on("blur",function(){
        rPass = $("#repassword").val();
        pass = $("#userpass").val();
        let vlaueInput = $("#"+str).val();
        let result = regExpHuawei(str,vlaueInput);
        if(result == true  || (rPass == pass && rPass != "" && pass !="")){
            $(this).parent().siblings("span").css({"display":"none"})
            $(this).parents().css({"borderColor":"#e4e4e4"})
        }else if(vlaueInput == ""){
            $(this).parent().siblings("span").first().css({"display":"none"})
            $(this).parent().siblings("span").last().css({"display":"block"})
        }else{
            $(this).parent().siblings("span").last().css({"display":"none"})
            $(this).parent().siblings("span").first().css({"display":"block"})
            $(this).parents().css({"borderColor":"#f31818"})
        }
    })  
}

//国籍列表
function countryList(){
    $("#ckecCou").on("click",function(){
        $(".country_list").fadeIn(1000)
    })
}
//选择国家
function checkCoun(){
    $(".country_bar").children().on("click",function(){
        let content = $(this).html();
        $("#ckecCountry").val(content)
        $(".country_list").fadeOut(1000)
    })
}
//密码强度
function passwStro(){
    $("#userpass").on("focus",function(){
        $(".pass_word_hint").fadeIn(1000)
    })
    $("#userpass").on("input",function(){
        let passwords = $("#userpass").val();
        let spacingS = passwords.search(/[ ]/);
        let numberS = passwords.length;
        let resultS = regExpHuawei("userpass",passwords)
        if(spacingS = -1){
            $("#spacing").css({"color":"greenyellow"})
        }else{
            $("#spacing").css({"color":"#000"})
        }
        if(numberS >= 8){
            $("#chars").css({"color":"greenyellow"})
        }else{
            $("#chars").css({"color":"#000"})
        }
        if(resultS == true){
            $("#letter").css({"color":"greenyellow"})
        }else{
            $("#letter").css({"color":"#000"})
        } 
        if(spacingS = -1 && numberS == 8 && resultS == true){
            $(".green_bar").css({"backgroundColor":"orange"})
            $("#strong").html("中等")
        }else if(spacingS = -1 && numberS >= 10 && resultS == true){
            $(".green_bar").css({"backgroundColor":"greenyellow"})
            $("#strong").html("强")
        }else if(numberS <= 8){
            $(".green_bar").css({"backgroundColor":"red"})
            $("#strong").html("弱")
        }
    })

    $("#userpass").on("blur",function(){
        $(".pass_word_hint").fadeOut(1000)
    })
}
//滑动验证
function linerImg(){
    $(".verify").on("click",function(){
        $(".reg_img_par").fadeIn(1000)
        $(".reg_smallimg").css({"left":0})
        $(".smallBtnp").css({"left":0})
    })
}
//注册按钮
function submitBtn(){
    $(".reg_sub").click(function(){
        
        let arr = []
        $("input:visible").each(function(){
            arr.push($(this).val().trim().length)
        })

        let result = false;
        for(var i in arr){
            if(arr[i] == 0){
                result = false;
                break; 
            }else{
                result = true; 
            }
        }

        if(result == false){
            $("#regFail_reg").css({"display":"block"}) 
            $(".submit_btm").css({"display":"block"})
            return;
        }else{
            widthC = $("body").css("width");
            heightC = $("body").css("height");
            $(".barrier_bed").css({"width":widthC,"height":heightC,"backgroundColor":"rgba(0,0,0,0.5)","display":"block"})   
        }
        
        
        
    })
}

function cloaseBTN(){
    $("#close").click(function(){
        $(".barrier_bed").fadeOut(500)
    })
    $("#dele_che").click(function(){
        $(".barrier_bed").fadeOut(500)
    })
    $("#agreeNotice").click(function(){
        let checked01 = $("#agreeCheck").attr("checked")
        if(checked01 == "checked"){
            $(".barrier_bed").fadeOut(500)

            //ajax请求
            $.post("php/reg.php",{"userphone":$("#phone").val(),"usercountry":$("#ckecCountry").val(),"userpass":$("#userpass").val(),"useremail":$("#email").val()},function(data){
                console.log(data)
                if(data == "1"){
                    //cookie
                    addCookie("userphone",$("#phone").val(),30)
                    addCookie("userpass",$("#userpass").val(),30)
                    $("#regFail").css({"display":"none"})
                    window.location.href = "index.html"
                }else{
                    $("#regFail").css({"display":"block"})
                }
            }) 
        }
    })
}
//邮箱、手机登录
function login(){
    $(".login_mo_01 ").click(function(){
        $(".reg_setc_phone").css({"display":"block"})
        $(".reg_setc_email").css({"display":"none"})
        $(".login_mo_02 ").css({"backgroundColor":"#ccc"})
        $(".login_mo_01 ").css({"backgroundColor":"#b40707"})
    })
    $(".login_mo_02 ").click(function(){
        $(".reg_setc_phone").css({"display":"none"})
        $(".reg_setc_email").css({"display":"block","marginBottom":"10px"})
        $(".login_mo_01 ").css({"backgroundColor":"#ccc"})
        $(".login_mo_02 ").css({"backgroundColor":"#b40707"})
    })
}
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