var host = {urlArtista:"https://www.vagalume.com.br/",
            urlArtistaNaoEncontrado:"https://api.vagalume.com.br/search.art?q=",
            urlNomeMusica:"https://api.vagalume.com.br/search.excerpt?q="};


$(document).ready(function(){
    telaInicial();
    $("#btnPesquisar").click(function(){
        seleciona();
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

function seleciona (){
    var entradaMusica = $("#digitaMusica").val();
    var entradaArtista = $("#digitaArtista").val();
    if (entradaArtista !== "" && entradaMusica === ""){
        chamaArtista();
    }
    else if (entradaArtista === "" && entradaMusica !== ""){
        chamaMusica();
    }
    else if (entradaArtista !== "" && entradaMusica !== ""){
        chamaArtistaEMusica;
    }
}

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

function chamaMusica() {
    var entradaMusica = $("#digitaMusica").val();
    var entradaComEspaco = entradaMusica.replace(/ /gi, "%20");
    $.getJSON(host.urlNomeMusica+entradaComEspaco+"&limit=5", function (list){
        var trecho = '';
        var artista = '';
        var i;
        console.log(list);
        for(i=0; i < list.response.docs.length; i++){
            artista += list.response.docs[i].band;
        }
        for(i=0; i < list.response.docs.length; i++){
            trecho += list.response.docs[i].title;
        }
        $("#telaResultado").html(artista+trecho);
    })
}

function chamaArtistaEMusica (){

}

function telaInicial() {
    $("#exibirTabela").hide();  
    $("#exibirArtista").hide();
}