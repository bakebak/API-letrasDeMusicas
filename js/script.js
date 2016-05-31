var host = {urlArtista:"https://www.vagalume.com.br/",
            urlArtistaNaoEncontrado:"https://api.vagalume.com.br/search.art?q=",
            urlNomeMusica:"https://api.vagalume.com.br/search.excerpt?q=",
            urlArtistaMusica:"https://api.vagalume.com.br/search.php?art=",
            chave:"&apikey={4f136ef8868e60873283c355c01d4de8}"};

function replaceSpecialChars(str)
{
    var i;
    for(i=0; i<str.length; i++){
        str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
        str = str.replace(/[àáâãäå]/,"a");
        str = str.replace(/[ÈÉÊË]/,"E");
        str = str.replace(/[èéêë]/,"e");
        str = str.replace(/[ìíî]/,"i");
        str = str.replace(/[ÌÍÎ]/,"I");
        str = str.replace(/[ÒÓÕÔ]/,"O");
        str = str.replace(/[óòôõ]/,"o");
        str = str.replace(/[ÙÚÛÜ]/,"U");
        str = str.replace(/[ùúûü]/,"u");
        str = str.replace(/[Ç]/,"C");
        str = str.replace(/[ç]/,"c");
    }
    return str;
}

function setaValores(){
    var entradaMusica = $("#digitaMusica").val();
    var entradaArtista = $("#digitaArtista").val();
    var specialChars = replaceSpecialChars(entradaArtista);
    var entradaComHifen = specialChars.replace(/ /gi, "-");
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
   $.getJSON(host.urlArtistaNaoEncontrado+entradaComHifen+"&limit=10", function (list){
        var banda = '';
        var i;
        for(i=0; i < list.response.docs.length; i++){
            banda += '<tr><td>' + list.response.docs[i].band + '</td></tr>';
        }
        $("#corpoTabela").html(banda);
        $("#headTabela").html("<tr><th>Artista/Banda</th></tr>");
        $("#exibirTabela").show();
        $("#exibirArtista").hide();
    })
}

function chamaMusica(entradaComEspaco) {
    $.getJSON(host.urlNomeMusica+entradaComEspaco+"&limit=5", function (list){
        var artistaETrecho = '';
        var i;
        for(i=0; i < list.response.docs.length; i++){
            artistaETrecho += '<tr><td>' + list.response.docs[i].band + '</td>';
            artistaETrecho += '<td>' + list.response.docs[i].title + '</td><td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></td></tr>';
        }
        $("#corpoTabela").html(artistaETrecho);
        $("#headTabela").html("<tr><th>Artista/Banda</th><th>Músicas</th><th>Detalhes</th></tr>");
        $("#exibirTabela").show();
        $("#exibirArtista").hide();
    })
}

function chamaArtistaEMusica (entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+host.chave, function (list){
        var artista = '';
        var musica = '';
        artista += list.art.name;
        musica += list.mus[0].name;
        $(".escreveNomeDaBanda").html(artista);
        $(".escreveNomeDaMusica").html(musica);
        var nomeArtistaIncorreto = artista;
        var specialChars = replaceSpecialChars(nomeArtistaIncorreto);
        var nomeArtista = specialChars.replace(/ /gi, "-");
        nomeArtista = nomeArtista.toLowerCase();
        $("#btnListaDeMusicas").click(function(){
            listaMusicas(nomeArtista,artista);
        });
        $("#btnAlbuns").click(function(){
            listaAlbuns(nomeArtista);
        });   
        modalAlbum(nomeArtista,artista); 
    })
    escreveLetra();
    $("#exibirTabela").hide();
    $("#exibirArtista").show();
    
}

function escreveLetra(entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+host.chave, function (list){
        var letra = list.mus[0].text;
        letra = letra.replace(/\n/gi, "<br>");
        $("#telaLetraDaMusica").html(letra);
    })
}

function escreveLetraTraduzida(entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+host.chave, function (list){
        var letra = list.mus[0].translate[0].text;
        letra = letra.replace(/\n/gi, "<br>");
        $("#telaLetraDaMusica").html(letra);
    })
}

function listaMusicas(nomeArtista,artista){
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");;
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/index.js", function (list){
        var i;
        var todasMusicas = '';
        for(i=0; i < list.artist.toplyrics.item.length; i++){
            todasMusicas += '<tr><td>' + artista + '</td>' + '<td>' + list.artist.toplyrics.item[i].desc + '</td>' + '<td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></td></tr>';
        }
        $("#corpoTabela").html(todasMusicas);
        $("#headTabela").html("<tr><th>Artista/Banda</th><th>Músicas</th><th>Detalhes</th></tr>");
        $("#exibirTabela").show();
    })
}

function listaAlbuns (nomeArtista){
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/discografia/index.js", function (list){
         var i;
         var albuns = '';
        for(i=0; i < list.discography.item.length; i++){
            albuns += '<tr><td>' + list.discography.item[i].desc + '</td><td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></td></tr>';
        }
        $("#corpoTabela").html(albuns);
        $("#headTabela").html("<tr><th>Albuns</th><th>Detalhes</th></tr>");
        $("#exibirTabela").show();
    })
}

function modalAlbum (nomeArtista,artista){
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/discografia/index.js", function (list){
        var linkCapa = list.discography.item.cover
        $("#capaAlbum").html("www.vagalume.com.br" + linkCapa);
        $("#nomeGrupo").html(artista);
        var i;
        var musicasAlbum = '';
        for(i=0; i < list.discography.item.discs.length; i++){
            musicasAlbum += '<tr><td>' + list.discography.item.discs[i].desc + '</td></tr>';
        }
        $("#musicasAlbum").html(musicasAlbum);
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