function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function procuraYoutube() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#digitaYoutube").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2016-03-03T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          console.log(results);
          $("#videos").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#videos").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                console.log(items.snippet.title);
                console.log(items.id.videoId);
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
};

function resetVideoHeight() {
    $(".video").css("height", $("#videos").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDzkhfOBhIuK1wzxlHTv5iMY8CbcPGvoJo");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
