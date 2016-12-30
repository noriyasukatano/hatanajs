
$.ajax({
		//はてなrssファイルを読み込む
		//ブログのアドレスの最後にrssをつける
     url:'http://noriyasu-katano.hatenablog.com/rss',
     success: function(data){

			 		//はてなrssの読み込み
					var rss_url = 'http://noriyasu-katano.hatenablog.com/rss';

          var htmlstr = "";
					htmlstr += '<div class="recomend">';
          htmlstr += '<h2>関連記事</h2>';
          htmlstr += '<ul>';

					//アイテムの調整
          $.get(rss_url, function(data) {
               $(data).find("item").each(function (i) {
                    var el = $(this);
										var elimg = el.find("enclosure").attr("url");

                    htmlstr += '<li class="section">';
                    htmlstr += '<p class="imgP"><img src="' + elimg + '" alt="" width="170" ></p>';
                    htmlstr += '<a href="' + el.find("link").text() + '" title="' + el.find("title").text() + '" target="_blank">' + el.find("title").text() + ' - ' + el.find("category").text() + '</a>';
                    htmlstr += '</li>';
										if(i === 5) {
											// 表示件数の設定
											return false;
										};
               });

          htmlstr += '</ul>';
          htmlstr += '</div>';

          //footer前に挿入する
					$('footer').before(htmlstr);
          });
     }
});
