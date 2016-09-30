/**
 * Created by Administrator on 2016/9/23.
 */
//返回顶部
    $(".return").on("click",function () {
        $("body").animate({scrollTop:0},800);
    })
//轮播图

    var slider = document.getElementById("slider");
    var scroll = document.getElementById("scroll");
    var lis = document.getElementById('key').getElementsByTagName('li');
    var divs = document.getElementsByClassName('div');
    var index = 0;
    var timer;
    scroll.style.width = divs.length * 1200 + "px";
    function nextFun() {
        index++;
        index = index % 4;
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = '#e9e9e9';
        }
        lis[index].style.background = 'red';
        lis[index].number = index;
        scroll.style.left = index * 1200 * -1 + "px";
    }

    scroll.style.left = "0px";
    timer = setInterval(nextFun, 2000);

      
//元素隐藏显示
    var qh = document.getElementById("qh");
    var dizhi =document.getElementById("dizhi");
    var gb =document.getElementById("gb");
    var kh =document.getElementById("kh");
    var　bz =document.getElementById("bz")
    var show_map =document.getElementById("show_map")
    var box =document.getElementById("box")
    var map_close =document.getElementById("map_close")
    var container =document.getElementById("container")

    qh.onclick =function () {
        dizhi.style.display= "block";
        }
    gb.onclick =function () {
        dizhi.style.display= "none";
    }
    kh.onmousemove =function () {
        bz.style.display="block";
    }
    kh.onmouseout =function () {
        bz.style.display="block";
    }
    bz.onmousemove =function () {
        bz.style.display="block";
        bz.onmouseout =function () {
            bz.style.display="none";
        }
    }
    map_close.onclick =function () {
        box.style.display ="none";
    }

//获取数据
show_map.onclick =function () {
    box.style.display ="block";
    $.ajax({
        type:"get",
        url:"http://localhost:5500/tcb/shops/pagecount/1",
        success:function(data){
            fn(data);
        }
    });
}
$(document).ready(function(){
    $(".page").click(function(e){
        e.preventDefault();
        var pageid = $(this).text();
        $.ajax({
            type:"get",
            url:"http://localhost:5500/tcb/shops/pagecount/"+pageid,
            success:function(data){
                fn(data);
            }
        });
    });

});
window.onload = function(){
    $.ajax({
        type:"get",
        url:"http://localhost:5500/tcb/shops/pagecount/1",
        success:function(data){
            fn(data);
        }
    });
}
function fn(data){
    $(".store_left").children(".store").remove();
    $(".store_right").children().remove();
    var shopdata = data['shop_data'];
    shopdata.forEach(function(elem,index,self){
        if(index<5){
            var v_div = $("<div class='store'>" +
                "<img src='"+elem.shop_ico+"'>" +
                "<div class='store_p'>" +
                "<p><a href=''>" + elem.shop_name + "</a></p>" +
                "<p class='pj'>" +"店铺等级:"+ "</p>" +
                "<p>" +"主营:"+elem.shop_desc+ "</p>" +
                "<p>" +"地址:"+elem.addr_detail+ "</p>" +
                "</div>" +
                "<div class='store_img'>" +
                "<p>" + "<img src='../images/c_43.jpg'>" + "先行赔付"+"</p>" +
                "<p>" + "<img src='../images/c_47.jpg'>" + "同城帮认证"+"</p>" +
                "<p>" +"人气:" +elem.comments+"</p>" +
                "</div>" +
                "<div class='store_btn'>" +
                "<a href='../360TCB/shop.html'>"+ "<button>" + "进入店铺" + "</button>" +"</a>" +
                "</div>" +
                "</div>");
            v_div.appendTo($(".store_left"));
        }


        //商家好评榜
        if(index <7){
            var v_div2 =$("<div class='store_right1'>" +
                "<div class='y'>"+(index +1)+"</div>"+
                "<img src='"+elem.shop_ico+"'>"+
                "<p class='pname'><a>"+elem.shop_name+"</a></p>" +
                "<p class='prenqi'>"+"评价:"+elem.comments+"</p>" +
                "</div>")
            v_div2.appendTo($(".store_right"))
        }

    });
    var orignY = parseFloat(shopdata[0].map_latitude);
    var orignX = parseFloat(shopdata[0].map_longitude);
    var orign=[orignX,orignY];
    newMap(orign,shopdata);
}



//---------------------------从AMAP获得地图------------------//

function newMap(orign,shopData){
    var myMap = new AMap.Map('container',{
        zoom: 10,
        center: orign,
    });
    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation','AMap.OverView'],
        function(){
            myMap.addControl(new AMap.ToolBar());

            myMap.addControl(new AMap.Scale());

            myMap.addControl(new AMap.Geolocation());

            myMap.addControl(new AMap.OverView({isOpen:true}));
        });
    shopData.forEach(function(elem,index){
        var positionX = parseFloat(shopData[index].map_longitude);
        var positionY = parseFloat(shopData[index].map_latitude);
        var position = [positionX,positionY];
        var marker=[],circle=[],info=[];

        marker[index] = new AMap.Marker({
            position: position,
        });
        marker[index].setMap(myMap);//地图的点标记
        myMap.setFitView()//地图的自适应
        circle[index] = new AMap.Circle({
            center: position,
            radius: 100,
            fillOpacity:0.5,
            fillColor:'#000',
            strokeColor:'#000',
            strokeWeight:1
        })
        circle[index].setMap(myMap);//点标记的圆
        //点击点标记时的弹窗
        info[index] = new AMap.InfoWindow({
            content: "<h3>"+elem.shop_name+"</h3>" +"<div>"+"<span>" +"主营:"
            +elem.shop_desc+ "</span>" +"<br/>"+ "<span>" +"地址:"+elem.addr_detail+
            "</span>" +"</div>",
            offset:new AMap.Pixel(0,-200),
            size:new AMap.Size(350,130)
        })
        //点击marker显示信息窗体
        var clickHandle = AMap.event.addListener(marker[index], 'click', function() {
            info[index].open(myMap,marker[index].getPosition());
        })
    })
}
    //搜索窗口
    $(".text1").keyup(function () {
        $(".sousuo_content").css("display","block");
        setTimeout(function () {
            $(".sousuo_content").hide();
        },100000)
    })
     $(".sousuo").click(function () {
         $(".sousuo_content").css("display","none");
     })

        //搜索信息
var txt = document.getElementsByClassName("text1")[0];
var oUl = document.getElementsByClassName("sousuo_content")[0];
txt.onkeyup = function(){
    var val = txt.value;
    var oScript = document.createElement("script");//动态创建script标签
    oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="
        +val+"&cb=callback";
    //添加链接及回调函数
    document.body.appendChild(oScript);//添加script标签
    document.body.removeChild(oScript);//删除script标签
}
//回调函数
function callback(data){
    var str="";
    for(var i=0;i<data.s.length;i++){
        str += "<li><a href=\"https://www.baidu.com/s?wd="+data.s[i]+"\">"+data.s[i]+"</a></li>";
    }
    oUl.innerHTML=str;
}