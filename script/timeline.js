;(function(){
	"use strict";

	/**
	 * 时间轴对象
	 * @param container {string} 目标对象id
	 * @param min {int} 最小年份
	 * @param max {int} 最大年份
	 # @param data {Array} 数据
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
		console.log(this.data);
		console.log(this.year);
	}

	/**
	 * 转换字符串为日期类型
	 */
	TimeLine.prototype.analyzeDate = function(str){debugger;	
		var date = null,year = null,month = null;
		if(str.indexOf("/") > -1){
			year = parseInt(str.substring(0,str.indexOf("/")));
			month = parseInt(str.substring(str.indexOf("/")+1,str.length))
			date = new Date(year,month);
		}else{
			year = parseInt(str);
			date = new Date(year);
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
			var end = data[i].length ==3 ? this.analyzeDate(data[i][1]) : null;
			var label = data[i].length == 3 ? data[i][2] : data[i][1];

			if(start.getFullYear() < this.year.min){
				this.year.min = start.getFullYear();
			}
			if(end && end.getFullYear() > this.year.max){
				this.year.max = end.getFullYear();
			}

			this.data.push({"start":start,"end":end,"label":label});
		}
	}

	window.timeLine = TimeLine;

})();