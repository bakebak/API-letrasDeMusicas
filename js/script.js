var host = {urlProduct:"http://localhost:3000/product"};

$(document).ready(function(){
    telaInicial();
    $("#btnPesquisar").click(function(){
        $("#exibirTabela").show();
        $("#exibirArtista").hide()
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
        $("#exibirTabela").show();
    }
});

function teste(){
    
}
    
/*function pesquisar(){
    var entrada = $("#numero").val();
        if (entrada !== ""){
            chamaIndividual(entrada);
            ocultarAdicionar ();
        }
        
        else if (entrada == "") {
            $("#dados").html(mensagens.disponibilidade);    
            ocultarNaoDisponivel();
        }
        $("#dados").show();
}*/

function telaInicial() {
    $("#exibirTabela").hide();  
    $("#exibirArtista").hide();
}