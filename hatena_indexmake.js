<script type="text/javascript">
$(document).ready(function(){
        var hc = $('h4').length;

        //h4の要素を取得して配列に入れる
        var hedarry = [];

        $('h4').each(function(i){
          var text = $(this).text();
          hedarry.push(text);
          $(this).attr('id', 'headline' + i);
        });

        // ulタグを生成してinsertに追加
        var insert = $('<ul>').addClass('list');
        var newLi = "";
        for(var j = 0; j < hedarry.length; j++) {
            // liタグを生成してテキスト追加
            newLi += '<li><a href="#headline'+j+'">'+hedarry[j]+'</a></li>';
            // insertに生成したliタグを追加
            insert.append(newLi);
        }

        //divを生成してulを囲む
        var divinsert = $('<div>').addClass('index-list');
        divinsert.append(newLi);

        if(hc > 0){
          $('div.entry-content>p:eq(1)').after(divinsert);

          //h2（目次タイトル）の作成
          var h2title = $('<h2>').text("この記事のINDEX");
          $('.index-list').prepend(h2title);
        };
});

//スムーズスクロール
$(function(){
  $("body").click(function(obj){
      var target = $(obj.target);
      if(target.is('a')){
        var speed = 500;
        var href= target.attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
      };
    });
});

</script>
