/*
 * 将抓取到的数据导出为csv文件
 * 利用html5 file API, 纯客户端操作
 */

var saver = (function() {

	var get_blob = function() {
		return this.Blob;
	};

	var write = function() {
		var BB = get_blob();

		var mydata = seller.getCSVFile();

		saveAs(
			new BB(
				mydata
				, {type: "text/plain;charset=" + document.characterSet}
			)
			, "youzan" + ".csv"
		);

	};

	return {
		write: write
	}
})();