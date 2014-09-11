;(function(){
	"use strict";

	/**
	 * 时间条对象
	 * @param {int} monthWidth 单个月的宽度
	 * @param {Date} min  最小年份
	 * @param {Date} start  开始月份
	 * @param {Date} end  结束月份
	 */
	var Strip = function(monthWidth,min,start,end){ 
		this.monthWidth = monthWidth;
		this.min = min;
		this.time={
			"start":start,
			"end":end
		}
	}

	/**
	 * 获取时间条对象的宽度
	 *
	 */
	Strip.prototype.getWidth = function(){ 
		if(this.time.start && this.time.end){
			return ( ( this.time.end.getFullYear() - this.time.start.getFullYear()) * 12 + (this.time.end.getMonth() - this.time.start.getMonth() ) ) * this.monthWidth;
		}
	}

	/**
	 * 获取时间条对象距离最小年度的距离
	 *
	 */
	Strip.prototype.getLeftOffset = function(){
		if(this.time.start && this.min){
			return ((this.time.start.getFullYear() - this.min) * 12 + this.time.start.getMonth() + 1 ) * this.monthWidth;
		}
	}

	window.Strip = Strip;

})();