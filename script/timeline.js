;(function(){
	"use strict";

	/**
	 * 时间轴对象
	 * @param {string} container  目标对象id
	 * @param {int} min  最小年份
	 * @param {int} max  最大年份
	 # @param {Array} data  数据
	 */
	var TimeLine = function(container,min,max,data){
		this.container = "#"+container;
		this.year = {
			"min":min,
			"max":max
		};
		this.data = [];

		this.analyze(data || []);

		// 以下方法采用document的内置函数，调用之前判断document的有效性
		if(typeof document !== "undefine"){
			this.drawMap();
			this.fillData();
		}
	}

	/**
	 * 根据设置的最小年份和最大年份绘制时间轴
	 *
	 */
	TimeLine.prototype.drawMap = function(){
		var htmls = [],
			i = this.year.min;
		for( ; i<=this.year.max; i++){
			htmls.push("<section>"+i+"</section>");
		}
		document.querySelector(this.container).innerHTML = "<div class='scope'>"+htmls.join("")+"</div>";
	}

	/**
	 * 根据传入的data，将时间段数据填充到时间轴上
	 *
	 */
	TimeLine.prototype.fillData = function(){
		var i = 0 , 
			monthWidth = document.querySelector(this.container + " .scope section").offsetWidth / 12,
			htmls = [],
			strip = null,
			temp = null;	
		for(;i<this.data.length;i++){
			temp = this.data[i];
			strip = new window.Strip(monthWidth,this.year.min,this.data[i].start,this.data[i].end);
			htmls.push("<li>"+
					  	"<div class='bubble bubble-" + temp.theme + "' style='width:" + strip.getWidth() + "px;margin-left:" + strip.getLeftOffset() + "px;'></div>"+
					  	"<label>" + temp.start.getFullYear()+"/"+(temp.start.getMonth()+1)+"-"+ temp.end.getFullYear()+"/"+(temp.end.getMonth()+1) + "</label>"+
					  	"<span class='description'>" + temp.label + "</span>"+
					  "</li>");
		}
		document.querySelector(this.container).innerHTML += "<div class='data'><ul>" + htmls.join("") + "</ul></div>";
	}

	/**
	 * 转换字符串为日期类型
	 */
	TimeLine.prototype.analyzeDate = function(str){
		var date = null,year = null,month = null;
		if(str.indexOf("/") > -1){
			year = parseInt(str.substring(0,str.indexOf("/")));
			month = parseInt(str.substring(str.indexOf("/")+1,str.length))
			date = new Date(year,month);
			date.hasMonth = true;
		}else{
			year = parseInt(str);
			date = new Date(year);
			date.hasMonth = false;
		}
		return date;
	}

	/**
	 * 解析传入的data数据
	 *
	 */
	TimeLine.prototype.analyze = function(data){
		var i = 0;
		for(;i<data.length;i++){
			var start = this.analyzeDate(data[i][0]);
			var end = data[i].length == 4 ? this.analyzeDate(data[i][1]) : null;
			var label = data[i].length == 4 ? data[i][2] : data[i][1];
			var theme = data[i].length == 4 ? data[i][3] : data[i][2];

			if(start.getFullYear() < this.year.min){
				this.year.min = start.getFullYear();
			}
			if(end && end.getFullYear() > this.year.max){
				this.year.max = end.getFullYear();
			}

			this.data.push({"start":start,"end":end,"label":label,"theme":theme});
		}
	}

	window.timeLine = TimeLine;

})();