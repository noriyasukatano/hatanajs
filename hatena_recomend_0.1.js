<script type="text/javascript">
/*
はてなブログの記事ページに関連情報を表示します。
関連情報の内容はカテゴリのマッチ度合いで表示されます。
*/

//記事中のカテゴリ個数と内容を把握
var categoly_array = new Array;
  $(".entry-categories a").each(function(){
    //記事で使用されているURLを取得
    var categolyU = $(this).attr("href").split('/');
    //記事のカテゴリを文字列で抽出→配列に追加
    categoly_array.push(decodeURI(categolyU[5]));
  });

//記事全体のRSSから各記事のカテゴリを抽出
$.ajax({
  //はてなrssファイルを読み込む
  url:'http://noriyasu-katano.hatenablog.com/rss',
  success: function(data){

    var rss_url_main = 'http://noriyasu-katano.hatenablog.com/rss';
    var list = new Array(); //最終的なリスト


    $.get(rss_url_main, function(data){
      $(data).find("item").each(function (i) {
        var matchP = 0;
        var el = $(this);
        //RSS中でアイテム内のカテゴリを抽出
        var elcategoly = [];
        $(this).find("category").each(function(){
          elcategoly.push($(this).text());
        });

        //1つのアイテム内に入っているカテゴリタグと比較
        $.each(categoly_array, function(y){
          //カテゴチがあっている場合は加算
          //カテゴリがないものはリストに格納しない
          if($.inArray(categoly_array[y], elcategoly) > 0){
            matchP = matchP + 1; //カテゴリのマッチが何個あるかを検出
          };
        });

        if(matchP > 0){
          list.push({"matchP":matchP, "itemEL":$(this)});
        };
      });

      //連結配列のソート（大きいもの順）
      list.sort(
      	function(a,b){
      		var aName = a["matchP"];
      		var bName = b["matchP"];
      		if( aName > bName ) return -1;
      		if( aName < bName ) return 1;
      		return 0;
      	}
      );

      //html作成
      var htmlstr = "";
      htmlstr += '<div class="recomend">';
      htmlstr += '<h2>関連記事</h2>';
      htmlstr += '<ul>';

      $.each(list, function(z){

        var elitem = list[z].itemEL;
        var elimg = elitem.find("enclosure").attr("url");

        htmlstr += '<li class="section">';
        htmlstr += '<p class="imgP"><img src="' + elimg + '" alt="" width="170" ></p>';
        htmlstr += '<a href="' + elitem.find("link").text() + '" title="' + elitem.find("title").text() + '" target="_blank">' + elitem.find("title").text() + ' <br> ' + elitem.find("category").text() + '</a>';
        htmlstr += '</li>';
      });

      htmlstr += '</ul>';
      htmlstr += '</div>';

      //footer前に挿入する
      $('footer').before(htmlstr);
    });
  }
});
</script>
