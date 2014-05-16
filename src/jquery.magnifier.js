/**
 *@Name magnifier 输入内容的放大显示
 *
 *@Param 
 *Object opts {['type': 'normal'][,'parents': '#container']}
 *@Param $("#").magnifier()
 *@Description an Extend function of jQuery
 *
 * update @04-22-2014 放大框使用绝对定位 
 *
 *@Author Yongxiang.Li
 *@Email easumlee@gmail.com
 *@Date 09-11-2013 
 */

;(function($) {
	'use strict';

 	var version = '0.2.4';

 	$.fn.magnifier = function(opts) {

 		var options = {'type': 'normal'};

 		$.extend(options, opts);

 		$(this).each(function() {

 			var self = $(this);
 			var _hasInit = false;

 			//包含input的父容器wrapper，放大显示框magBox
 			var 
	 			_isMobile = false,
	 			pos,
	 			magBox,
	 			magCont = $('<div class="p_inp_enlarge"><div class="p_inp_lc js-enlarge hide"></div></div>');

	 		if(options.type === 'mobile') {
	 			_isMobile = true;
	 		};

 			var init = function() {

	 			if(!_hasInit) {

	 				$(document.body).append(magCont);
	 				_hasInit = true;
	 			}

	 			magBox = magCont.find('.js-enlarge');

	 			bindEvents();
	 			
	 			return;
	 		};

	 		function _getPostion(el){
	 			el = $(el);
	 			//增加的额外宽度24
	 			return [el.offset().left, el.offset().top, el.width() - 6];
	 		}

	 		function setPos(){
	 			pos = _getPostion(self);

				magCont.css({
					'position': 'absolute',
					'left': pos[0],
					'top': pos[1]
				});

				magBox.css({
					'min-width': pos[2],
					'_width': pos[2]
				});
	 		}

	 		var bindEvents = function() {
	 			
	 			self.on('focus', function(evt) {

	 				setPos();
	 				change(evt);
	 				showBox();

	 			}).on('blur', function() {
	 				hideBox();
	 				
	 			}).on('keyup', function(evt) {
	 				change(evt);
	 				showBox();
	 			});
	 		};

	 		var change = function(evt) {
	 			var val = self.val().replace(/\s+/, ''); // 去除输入内容中的空格

	 			val = _isMobile ? formatTel(val) : val;

	 			magBox.text(val);
	 		};

	 		var showBox = function() {
	 			var val = $.trim( magBox.html() );
	 			if(val.length !== 0) {
	 				magBox.removeClass('hide');
	 			} else { //内容为空的时候不显示
	 				magBox.addClass('hide');
	 			};
	 		};

	 		var hideBox = function() {
	 			magBox.addClass('hide');
	 		};

	 		//手机号码格式处理
	 		var formatTel = function(tel,str) {

	    		var tel = tel.match(/^(\d{0,3})?(\d{4})?(\d+)?/); //匹配为XXX XXXX XXXX
	    		var tels = [];
	    		var str = str || ' '; //号码分隔符。默认为空格

	    		tel.shift(); //移除原号码

	    		for(var i=0,l=tel.length; i<l; i++){

	    			if(typeof tel[i] !== 'undefined'){  //号码中有空格
	    				tels.push(tel[i]);
	    			};

	    		};

	    		return $.trim( tels.join(str) );
	 		};

	 		init();

 		});

 	};

 })(jQuery);