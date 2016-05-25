var host = {urlProduct:"http://localhost:3000/product"};

$(document).ready(function(){  
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
             event.preventDefault();

            // Store hash
            var hash = this.hash;

        
            // volta ao topo
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){
       
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    $("#btnListaFrutas").click(function(){
        chamaLista();
    });

})

function chamaLista(){
    $.getJSON(host.urlProduct, function (list){
        var lista = '';
        var i;        
        for(i=0; i < list.length; i++){
            lista += "<span class='"+list[i].status+"'>"+ list[i].id + " - " + list[i].nome + " - R$ " + list[i].valor + " - " + list[i].estoque +"</span><br>";
            valorCadaProduto = list[i].valor * list[i].estoque;
        $("#listaFrutas").html(lista);
    }
    })
}
