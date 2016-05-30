var host = {urlArtista:"https://www.vagalume.com.br/",
            urlArtistaNaoEncontrado:"https://api.vagalume.com.br/search.art?q=",
            urlNomeMusica:"https://api.vagalume.com.br/search.excerpt?q=",
            urlArtistaMusica:"https://api.vagalume.com.br/search.php?art="};

function setaValores(){
    var entradaMusica = $("#digitaMusica").val();
    var entradaArtista = $("#digitaArtista").val();
    var entradaComHifen = entradaArtista.replace(/ /gi, "-");
    var entradaComEspaco = entradaMusica.replace(/ /gi, "%20");
    seleciona(entradaMusica, entradaArtista, entradaComHifen, entradaComEspaco);
    escreveLetra(entradaComHifen,entradaComEspaco);
    $("#btnTraduzir").click(function(){
        $("#telaLetraDaMusica").html('');
        escreveLetraTraduzida(entradaComHifen,entradaComEspaco);
    }); 
}

function seleciona(entradaMusica, entradaArtista, entradaComHifen, entradaComEspaco){
    if (entradaArtista !== "" && entradaMusica !== ""){
        chamaArtistaEMusica(entradaComHifen, entradaComEspaco);
    }
    else if (entradaArtista === "" && entradaMusica !== ""){
        chamaMusica(entradaComEspaco);
    }
    else if (entradaArtista !== "" && entradaMusica === ""){
        chamaArtista(entradaComHifen);
    }
}

function chamaArtista (entradaComHifen){
   $.getJSON(host.urlArtistaNaoEncontrado+entradaComHifen+"&limit=5", function (list){
        var banda = '';
        var i;
        for(i=0; i < list.response.docs.length; i++){
            banda += list.response.docs[i].band;
        }
        $("#telaResultado").html(banda);
    })
}

function chamaMusica(entradaComEspaco) {
    $.getJSON(host.urlNomeMusica+entradaComEspaco+"&limit=5", function (list){
        var trecho = '';
        var artista = '';
        var i;
        for(i=0; i < list.response.docs.length; i++){
            artista += list.response.docs[i].band;
        }
        for(i=0; i < list.response.docs.length; i++){
            trecho += list.response.docs[i].title;
        }
        $("#telaResultado").html(artista+trecho);
    })
}

function chamaArtistaEMusica (entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+"&apikey={4f136ef8868e60873283c355c01d4de8}", function (list){
        var artista = '';
        var musica = '';
        artista += list.art.name;
        musica += list.mus[0].name;
        $("#telaResultado").html(artista+musica);
        $(".escreveNomeDaBanda").html(artista);
        $(".escreveNomeDaMusica").html(musica);
    })
    escreveLetra();
    $("#exibirArtista").show();
    
}

function escreveLetra(entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+"&apikey={4f136ef8868e60873283c355c01d4de8}", function (list){
        var letra = '';
        letra += list.mus[0].text;
        var letra = letra.replace(/\n/gi, "<br>");
        $("#telaLetraDaMusica").html(letra);
    })
}

function escreveLetraTraduzida(entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+"&apikey={4f136ef8868e60873283c355c01d4de8}", function (list){
        var letra = '';
        letra += list.mus[0].translate[0].text;
        var letra = letra.replace(/\n/gi, "<br>");
        $("#telaLetraDaMusica").html(letra);
    })
}

function listaMusicas(entradaComHifen){
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
}

function telaInicial() {
    $("#exibirTabela").hide();  
    $("#exibirArtista").hide();
}

$(document).ready(function(){
    telaInicial();
    $("#btnPesquisar").click(function(){
        setaValores();
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
         setaValores();
    }
});