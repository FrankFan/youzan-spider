/**
 * 操作2个按钮
 *
 */

$(function() {
	$('#crawl').on('click', function() {
		seller.getSellerList();
	});

	$('#down').on('click', function() {
		saver.write();
	});

});