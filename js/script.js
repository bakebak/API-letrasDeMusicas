var host = {urlArtista:"https://www.vagalume.com.br/",
            urlArtistaNaoEncontrado:"https://api.vagalume.com.br/search.art?q=",
            urlNomeMusica:"https://api.vagalume.com.br/search.excerpt?q=",
            urlArtistaMusica:"https://api.vagalume.com.br/search.php?art=",
            chave:"&apikey={4f136ef8868e60873283c355c01d4de8}"};

function replaceCaracteresEspeciais(str){
    for(var i=0; i<str.length; i++){
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
    var specialChars = replaceCaracteresEspeciais(entradaArtista);
    var entradaComHifen = specialChars.replace(/ /gi, "-");
    var entradaComEspaco = entradaMusica.replace(/ /gi, "%20");
    seleciona(entradaMusica, entradaArtista, entradaComHifen, entradaComEspaco);
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
        for(var i=0; i < list.response.docs.length; i++){
            banda += '<tr><td>' + list.response.docs[i].band + '</td></tr>';
        }
        montaTabela(banda,'Artista/Banda','','')
    })
   $("#exibirArtista").hide();
}

function chamaMusica(entradaComEspaco) {
    $.getJSON(host.urlNomeMusica+entradaComEspaco+"&limit=10", function (list){
        var artistaETrecho = '';
        for(var i=0; i < list.response.docs.length; i++){
            artistaETrecho += '<tr><td>' + list.response.docs[i].band + '</td>';
            artistaETrecho += '<td>' + list.response.docs[i].title + '</td><td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" data-type="art&mus" data-art="' + list.response.docs[i].band + '" data-mus="' + list.response.docs[i].title + '"></span></td></tr>';
        }
        montaTabela(artistaETrecho,'Artista/Banda','Músicas','Detalhes')
    })
    $("#exibirArtista").hide();
}

function chamaArtistaEMusica (entradaComHifen,entradaComEspaco){
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+host.chave, function (list){
        var artista = list.art.name;
        var musica = list.mus[0].name;
        $(".escreveNomeDaBanda").html(artista);
        $(".escreveNomeDaMusica").html(musica);
        mudaCaracteres(artista); 
    })
    $("#btnLetraMusica").click(function(){
        escreveLetra(entradaComHifen,entradaComEspaco);
    });
    $("#exibirTabela").hide();
    $("#exibirArtista").show();
}

function mudaCaracteres(artista){
    var nomeArtistaIncorreto = artista;
    var specialChars = replaceCaracteresEspeciais(nomeArtistaIncorreto);
    var nomeArtista = specialChars.replace(/ /gi, "-");
    nomeArtista = nomeArtista.toLowerCase();
    botoes(nomeArtista,artista);
}

function botoes(nomeArtista,artista){
    $("#btnListaDeMusicas").click(function(){
        listaMusicas(nomeArtista,artista);
    });
    $("#btnAlbuns").click(function(){
        listaAlbuns(nomeArtista);
    }); 
}

function escreveLetra(entradaComHifen,entradaComEspaco){
    $("#myModalLetra").modal("show")
    $.getJSON(host.urlArtistaMusica+entradaComHifen+"&mus="+entradaComEspaco+host.chave, function (list){
        var letra = list.mus[0].text;
        letra = letra.replace(/\n/gi, "<br>");
        $("#telaLetraDaMusica").html(letra);
        var letraTraduzida = list.mus[0].translate[0].text;
        $("#btnTraduzir").click(function(){
            escreveLetraTraduzida(entradaComHifen,entradaComEspaco,letraTraduzida);
        }); 
    })
}

function escreveLetraTraduzida(entradaComHifen,entradaComEspaco,letraTraduzida){
    $("#telaLetraDaMusica").html('');
    letraTraduzida = letraTraduzida.replace(/\n/gi, "<br>");
    $("#telaLetraDaMusica").html(letraTraduzida);
}

function listaMusicas(nomeArtista,artista){
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");;
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/index.js", function (list){
        var todasMusicas = '';
        for(var i=0; i < list.artist.toplyrics.item.length; i++){
            todasMusicas += '<tr><td>' + artista + '</td>' + '<td>' + list.artist.toplyrics.item[i].desc + '</td>' + '<td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" data-type="artista&musica" data-artista="' + artista + '" data-musica="' + list.artist.toplyrics.item[i].desc + '"></span></td></tr>';
        }
        montaTabela(todasMusicas,'Artista/Banda','Músicas','Detalhes')
    })
}

function listaAlbuns (nomeArtista){
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/discografia/index.js", function (list){
        var albuns = '';
        for(var i=0; i < list.discography.item.length; i++){
            albuns += '<tr><td>' + list.discography.item[i].desc + '</td><td><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" data-type="albuns&banda" data-banda="' + nomeArtista + '"data-albuns="' + list.discography.item[i].desc + '"></span></td></tr>';
        }
        montaTabela(albuns,'Albuns','Detalhes','')
    })
}

function modalAlbum (nomeArtista,album){
    $("#ModalAlbum").modal("show")
    var nomeArtistaComHifen = nomeArtista.replace(/ /gi, "-");
    $.getJSON(host.urlArtista+nomeArtistaComHifen+"/discografia/index.js", function (list){
        var linkCapa = list.discography.item[0].cover;
        $("#capaAlbum").html("src='http://www.vagalume.com.br'" + linkCapa);
        $("#nomeAlbum").html(album);
        var musicasDoAlbum = '';
        for(var i=0; i < list.discography.item[0].discs[0].length; i++){
            musicasDoAlbum += '<tr><td>' + list.discography.item[0].discs[0][i].desc + '</td></tr>';
        }        
        $("#musicasAlbum").html(musicasDoAlbum);
    })
}

function montaTabela (corpo,artista,musica,detalhes){
    $("#corpoTabela").html(corpo);
    $("#headTabela").html("<tr><th>" + artista + "</th><th>" + musica + "</th><th>" + detalhes + "</th></tr>");
    $("#exibirTabela").show();
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
    $("#btnVoltar").click(function(){
        telaInicial();
    });
    $('#exibirTabela').on('click', '.glyphicon-plus-sign', function(){
        if($(this).data('type')==='art&mus'){
            var artista = $(this).data('art');
            var musica = $(this).data('mus');
            chamaArtistaEMusica(artista, musica);
        }
        else if ($(this).data('type')==='artista&musica'){
            var artista = $(this).data('artista');
            var musica = $(this).data('musica');
            chamaArtistaEMusica(artista, musica);
        }
        else if($(this).data('type')==='albuns&banda'){
            var banda = $(this).data('banda');
            var album = $(this).data('albuns');
            modalAlbum(banda,album);
        }
    })
});

$(document).keypress(function(e) {
    if (e.which == 13) {setaValores();}
});