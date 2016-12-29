$.get("http://noriyasu-katano.hatenablog.com/rss", function (data) {
    $(data).find("item").each(function () {
        var el = $(this);
          console.log(el.find("link").text());
          console.log(el.find("title").text());
    });
});
