<script type="text/javascript">
//記事中のカテゴリ個数と内容を把握
var categoly_array = [];
  $(".entry-categories a").each(function(){
    //記事で使用されているURLを取得
    var categolyU = $(this).attr("href").split('/');
    //記事のカテゴリを文字列で抽出→配列に追加
    categoly_array.push(decodeURI(categolyU[5]));
  });
    console.log('categoly_array' + categoly_array);


//カテゴリの取得
var categoly = $(".entry-categories a").attr("href").split('/');
console.log(categoly[5]);

 var categoly_url = 'http://noriyasu-katano.hatenablog.com/rss/category/' + categoly[5];
 console.log(categoly_url);

    $.ajax({

		//はてなrssファイルを読み込む
		//ブログのアドレスの最後にrssをつける
     //url:'http://noriyasu-katano.hatenablog.com/rss',
     url:categoly_url,
     success: function(data){


			 		//はてなrssの読み込み
					//var rss_url = 'http://noriyasu-katano.hatenablog.com/rss';
          var rss_url = categoly_url;

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
                    htmlstr += '<a href="' + el.find("link").text() + '" title="' + el.find("title").text() + '" target="_blank">' + el.find("title").text() + ' <br> ' + el.find("category").text() + '</a>';
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

</script>
