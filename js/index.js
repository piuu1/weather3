/*
* @Author: lijie
* @Date:   2018-01-19 11:17:42
* @Last Modified by:   lijie
* @Last Modified time: 2018-01-20 21:22:49
*/
var weather; 
var city;
// 请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
	}
})
// 请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(obj.data);
	}
})	
// 渲染数据
function updata(){
	// 渲染城市
   var cityName=document.getElementsByClassName("header")[0];
   cityName.innerHTML=weather.city_name;
   // 当前温度
   var citytemp=document.getElementsByClassName("title1")[0];
   citytemp.innerHTML=weather.current_temperature+"°";
   // 获取当前天气状况
   var current_condition=document.getElementsByClassName("title2")[0];
   current_condition.innerHTML=weather.current_condition;
   // 今天最高温、最低温
   var dat_high_temperature=document.getElementById("dat_high_temperature");
   dat_high_temperature.innerHTML=weather.dat_high_temperature;
   var dat_low_temperature=document.getElementById("dat_low_temperature");
   dat_low_temperature.innerHTML=weather.dat_low_temperature;
   // 今天天气状况
   var day_condition=document.getElementById("day_condition");
   console.log(day_condition);
   day_condition.innerHTML=weather.day_condition;
   // 今天icon
   var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
   dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;

  // 明天最高温最低温开始
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
   tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
   var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
   tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
   // 今天天气状况
   var tomorrow_condition=document.getElementById("tomorrow_condition");
   console.log(tomorrow_condition);
   tomorrow_condition.innerHTML=weather.tomorrow_condition;
   // 今天icon
   var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
   tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

   for(var i in weather.hourly_forecast){
       // 创建父元素div
       var now=document.createElement("div");
   	  // 给父元素加样式
   	   now.className="now";
       // 获取now的父元素
       var nowp=document.getElementById("now")
       // 把now插入到父元素中
       nowp.appendChild(now);

       var now_time=document.createElement("h2");
       now_time.className="now_time";
       now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
       now.appendChild(now_time);

       var now_icon=document.createElement("div");
       now_icon.className="now_icon";
       now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
       now.appendChild(now_icon);

       var now_temperature=document.createElement("h3");
       now_temperature.className="now_temperature";
       now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
       now.appendChild(now_temperature);
   }  	
   
    for(var j in weather.forecast_list){
    	var recent=document.createElement("div");
    	recent.className="recent";
        var recents=document.getElementById("recent");
        recents.appendChild(recent);
        // 字符串的切割时间输出
        var date=document.createElement("div");
        date.className="recent_time";
        var str=weather.forecast_list[j].date.substring(5,7);
        var str1=weather.forecast_list[j].date.substring(8);
        // 方法
        //1. 斜杠形式分割日期
        // str=weather.forecast_list[j].date.substring(5);
        // arr=str.split("-");
        // date.innerHTML=arr.join("/");
        
        //2. 年月日的日期
        // date.innerHTML=weather.forecast_list[j].date;
        
        // 3.字符串分割两次
        date.innerHTML=str+"/"+str1;

        recent.appendChild(date);
        var recent_wea=document.createElement("h2");
        recent_wea.className="recent_wea";
        recent_wea.innerHTML=weather.forecast_list[j].condition;
        recent.appendChild(recent_wea);
        var recent_pic=document.createElement("div");
        recent_pic.className="recent_pic";
        recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png)`;
        recent.appendChild(recent_pic);
        var high=document.createElement("div");
        high.className="recent_high";
        high.innerHTML=weather.forecast_list[j].high_temperature+"°";
        recent.appendChild(high);  
         var low=document.createElement("div");
        low.className="recent_low";
        low.innerHTML=weather.forecast_list[j].low_temperature+"°";
        recent.appendChild(low);
         var wind=document.createElement("div");
        wind.className="recent_wind";
        wind.innerHTML=weather.forecast_list[j].wind_direction;
        recent.appendChild(wind);
        var level=document.createElement("div");
        level.className="recent_level";
        level.innerHTML=weather.forecast_list[j].wind_level+"级";
        recent.appendChild(level);
    }

    var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city_box")[0];
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消");
    	city_box.style="display:block";
    }
    // 渲染城市
    for(var k in city){
    	// console.log(k);

        var cityp=document.getElementById("city");
    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
        cityp.appendChild(title);

        var con=document.createElement("div");
        con.className="con";
        for(var y in city[k]){
        	// console.log(y);
        	var erji=document.createElement("div");
        	erji.className="son";
    	    erji.innerHTML=y;
            con.appendChild(erji);
        }
        cityp.appendChild(con);

    }
}
// 查找各城市天气信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
	    updata();
	    $(".city_box").css({"display":"none"});

	}
})
}

// 当页面加载完成执行的代码
window.onload=function(){
	   updata();

	   $(".son").on("click",function(){
	   	var cityh=this.innerHTML;
	   	AJAX(cityh);

	   })
	   // 当input获取焦点，button变确认
	   // 获取焦点：focus
	   // html设置或改变元素的内容
	   $(".text").on("focus",function(){
	       $(".button").html("确认");
	   })



	   // 操作按钮
	   var button=document.getElementsByClassName("button")[0];
	   console.log(button);

	   button.onclick=function(){
	   	// 获取button中间的内容
	   	var btn=button.innerHTML;
	   	if(btn=="取消"){
	   		var city_box1=document.getElementsByClassName("city_box")[0];
	   		city_box1.style="display:none";
	   	}
	   	else
	   	{
	   		var str=document.getElementsByClassName("text")[0].value;
	   		// console.log(str);
	   		for(var i in city)
	   		{
	   			for(var j in city[i])
	   			{
	   				if(str==j)
	   				{
	   					AJAX(str);
	   					return;
	   				}
	   			}
	   		}

	   		  alert("没有该城市气象信息");
	   			

	   	}
	   
    }
}