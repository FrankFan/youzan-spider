

// https://fx.youzan.com/supplier/followers/sellerlist.json?keyword=&p=1&orderby=fx_at&order=desc
// https://fx.youzan.com/supplier/followers/sellerlist.json?keyword=&p=2&orderby=fx_at&order=desc&count=362


var seller = (function() {
	var SELLER_URL = 'https://fx.youzan.com/supplier/followers/sellerlist.json';
	var count;
	var ARR_SELLER_LIST = [];

	var getSellerList = function(pageNum) {

		console.log('开始处理……');

		$.get(SELLER_URL, {
			keyword: '',
			p: 1,
			orderby: 'fx_at'
		}, function(result) {
			if (result && result.data && result.data.list.length > 0) {
				count = result.data.count;

				var len = Math.ceil(count / 20);

				// console.log('mobile,homepage_url,kdt_id,team_name,logo,name,discount_description,contract')

				for(var i = 1; i < len; i++) {
					$.get(SELLER_URL, {
						keyword: '',
						p: i,
						orderby: 'fx_at',
						count: count
					}, function(result) {
						if (result && result.data && result.data.list.length > 0) {
							var list = result.data.list;

							list.forEach(function(item) {
								var level = item.level;
								var seller_order = item.seller_order;
								var arrItem = [];

								arrItem.push(item.mobile);
								arrItem.push(item.homepage_url);
								arrItem.push(item.kdt_id);
								arrItem.push(item.team_name);
								arrItem.push(item.logo);
								arrItem.push(level.name);
								arrItem.push(level.discount_description);
								arrItem.push(item.contract);

								// console.log(arrItem.join(','));

								var sellerObj = {
									team_name: item.team_name,
									mobile: item.mobile,
									kdt_id: item.kdt_id,
									name: level.name,
									discount_description: level.discount_description,
									logo: item.logo,
									homepage_url: item.homepage_url,
									contract: item.contract
									
								};

								ARR_SELLER_LIST.push(sellerObj);


							});
						}
					});
				}

				console.log('共处理' + count + '条数据，点击下载可以下载csv文件');
				
			}
		});
	};

	var getCSVFile = function() {

		var resultData = ['mobile,homepage_url,kdt_id,team_name,logo,name,discount_description,contract\r\n'];

		var sellerLength = ARR_SELLER_LIST.length;
		
		for(var i = 0; i < sellerLength - 1; i ++) {
			var currentItem = ARR_SELLER_LIST[i];

			resultData.push(currentItem.mobile + ',');
			resultData.push(currentItem.homepage_url + ',');
			resultData.push(currentItem.kdt_id + ',');
			resultData.push(currentItem.team_name + ',');
			resultData.push(currentItem.logo + ',');
			resultData.push(currentItem.name + ',');
			resultData.push(currentItem.discount_description + ',');
			resultData.push(currentItem.contract || '' + ',');
			resultData.push('\r\n');
		}

		return resultData;
	};

	return {
		getSellerList: getSellerList,
		arrSeller: ARR_SELLER_LIST,
		getCSVFile: getCSVFile
	}

})();

// seller.getSellerList();