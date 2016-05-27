var host = {urlArtista:"https://www.vagalume.com.br/",
            urlArtistaNaoEncontrado:"https://api.vagalume.com.br/search.art?q="};


$(document).ready(function(){
    telaInicial();
    $("#btnPesquisar").click(function(){
        chamaArtista();
    });
    $("#btnDetalhes").click(function(){
        $("#exibirTabela").hide();
        $("#exibirArtista").show();
    });
    $("#btnVoltar").click(function(){
        telaInicial();
    });
    
});

$(document).keypress(function(e) {
    if (e.which == 13) {
        chamaArtista();
    }
});
    
function chamaArtista (){
   var entradaArtista = $("#digitaArtista").val();
   var entradaComHifen = entradaArtista.replace(/ /gi, "-");
    $.getJSON(host.urlArtista+entradaComHifen+"/index.js", function (list){
        var musicas = '';
        var artista = '';
        var i;
        artista += list.artist.desc;
        for(i=0; i < list.artist.toplyrics.item.length; i++){
            musicas += list.artist.toplyrics.item[i].desc;
        }
        $("#telaResultado").html(artista+musicas);
    })
    /*.fail(function() {
       $.getJSON(host.urlArtistaNaoEncontrado+entradaComHifen+"&limit=5", function (list){
            var banda = '';
            var i;
            for(i=0; i < list.docs.length; i++){
                banda += list.docs[i].band;
            }
            $("#telaResultado").html(banda);
            console.log(banda);
        })
    })*/
}

function telaInicial() {
    $("#exibirTabela").hide();  
    $("#exibirArtista").hide();
}