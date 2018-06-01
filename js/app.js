$( document ).ready(function(){
    var movimientos = 0;
    var randomNumber = Math.floor((Math.random() * 4) + 1);
    var maxHor = 0;
    var minHor = 0;
    var maxVer = 0;
    var minVer = 0;
    var puntos = 0;


    $(".btn-reinicio").click(function(){
        if($(this).text() == "Iniciar"){
            startTimer();
            startTimer2();
            llenarPantallaDulces();
            animateOrange($("#game-title"));
            moverElemento();
            revisarTablero();
            $(this).text("Reiniciar");
        }else{
            location.reload();
        }
    });



    function animateYellow(element){
        element.animate(
            {
                color: "#e5f71d"
            },800,function(){
                animateOrange(element);
            }
        );
    }

    function animateOrange(element){
        element.animate(
            {
                color: "#ef8317"
            },800,function(){
                animateYellow(element);
            }
        );
    }

    function llenarPantallaDulces(){
        contador = 0;
        for(var j = 0; j<7;j++){
            for(var i = 1; i<8;i++){
                var temp = Math.floor((Math.random() * 4) + 1);
                $(".col-"+i).append("<img class=elemento src=image/"+temp+".png  numero="+contador+" columna="+i+" imagen="+temp+">");
                contador += 1;
            }
        }


    }


    function moverElemento(){
        $(".elemento").draggable({
            helper:"clone"
        });

        $(".elemento").droppable({
            drop: function(event, ui) {
                    numero1 = $(this).attr("numero");
                    numero2 = $(ui.draggable).attr("numero");
                    if(numero1-7 == numero2 || numero1 == numero2-7 || numero1-1 == numero2 || numero1 == numero2-1 )  {
                            numeroImagen1 = parseInt($(this).attr("imagen"));
                            numeroImagen2 = parseInt($(ui.draggable).attr("imagen"));
                            var image1 = $(this).attr("src");
                            var image2 = $(ui.draggable).attr("src");
                            $(this).attr("src",image2);
                            $(this).attr("imagen",numeroImagen2);
                            $(ui.draggable).attr("src",image1)
                            $(ui.draggable).attr("imagen",numeroImagen1);
                            movimientos += 1;
                            $("#movimientos-text").text(movimientos);

                }
                revisarAlrededor($(this));
                this.addEventListener("dragend", llenarEspaciosVacios());

            }

        });


    }

    function emptyScreen(){
        for(var i=1; i<8; i++){
            $(".col-"+i).empty();
        }
        $(".data-info").empty();

    }

    function startTimer() {
        var timer = 120, minutes, seconds;
        var interval = 1000;
        var intervalFunction = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $("#timer").text(minutes+":"+seconds);
            if(timer > 0){
                timer--

            }else{
                clearInterval(intervalFunction);
                finalJuego($(".panel-tablero"));
                finalJuego($(".time"));

            }

        }, interval);
    }


    function startTimer2() {
        var timer = 120, minutes, seconds;
        var interval = 100;
        var intervalFunction = setInterval(function () {
            if(timer > 0){
                timer--
                llenarEspaciosVacios();
                revisarTablero();
            }else{
                clearInterval(intervalFunction);
            }
        }, interval);
    }



    function finalJuego(element){
        element.animate({
            width: 0,
            height: 0
            },800, function(){
                $(this).css("display","none");
                agrandarElementos($(".panel-score"));
            });
        }

        function agrandarElementos(element){
            element.animate({
                width: "+=100%"

            },800);
        }

        function revisarAlrededor(elemento1){
            var contador1 = 1;
            var contador2 = 1;
            var aumento = 1;
            var resta = 1;
            var aumentoVer = 7;
            var restaVer = 7;
            flag = true;
            var arregloQuitar =[elemento1];
            var arregloQuitar2 = [elemento1]
            numeroElemento = parseInt(elemento1.attr("numero"));
            columna = parseInt(elemento1.attr("columna"));
            numeroImagen = parseInt(elemento1.attr("imagen"));

                //horizontal
                if(numeroImagen == parseInt($("img[numero="+(numeroElemento-resta)+"]").attr("imagen"))){
                    contador1 += 1;
                    arregloQuitar.push($("img[numero="+(numeroElemento-resta)+"]"));
                    resta += 1;

                    while(numeroImagen == parseInt($("img[numero="+(numeroElemento-resta)+"]").attr("imagen"))){
                        arregloQuitar.push($("img[numero="+(numeroElemento-resta)+"]"));
                        resta += 1;

                    }
                }

                if(numeroImagen == parseInt($("img[numero="+(numeroElemento+aumento)+"]").attr("imagen"))){
                    contador1 += 1;
                    arregloQuitar.push($("img[numero="+(numeroElemento+aumento)+"]"));
                    aumento += 1;

                    while(numeroImagen == parseInt($("img[numero="+(numeroElemento+aumento)+"]").attr("imagen"))){
                        arregloQuitar.push($("img[numero="+(numeroElemento+aumento)+"]"));
                        aumento += 1;

                    }
                }

                //vertical

                if(numeroImagen == parseInt($("img[numero="+(numeroElemento-restaVer)+"]").attr("imagen"))){
                    contador1 += 1;
                    arregloQuitar2.push($("img[numero="+(numeroElemento-restaVer)+"]"));
                    restaVer += 7;

                    while(numeroImagen == parseInt($("img[numero="+(numeroElemento-restaVer)+"]").attr("imagen"))){
                        arregloQuitar2.push($("img[numero="+(numeroElemento-restaVer)+"]"));
                        contador2 += 1;
                        restaVer += 7;

                    }
                }

                if(numeroImagen == parseInt($("img[numero="+(numeroElemento+aumentoVer)+"]").attr("imagen"))){
                    contador2 += 1;
                    arregloQuitar2.push($("img[numero="+(numeroElemento+aumentoVer)+"]"));
                    aumentoVer += 7;

                    while(numeroImagen == parseInt($("img[numero="+(numeroElemento+aumentoVer)+"]").attr("imagen"))){
                        arregloQuitar2.push($("img[numero="+(numeroElemento+aumentoVer)+"]"));
                        contador2 += 1;
                        aumentoVer += 7;

                    }
                }




                if(arregloQuitar.length >= 3){
                    puntos += 100;
                    $("#score-text").text(puntos);
                    borrarArray(arregloQuitar)

                }else{
                    flag = false;
                }

                if(arregloQuitar2.length >= 3){
                    puntos += 100;
                    $("#score-text").text(puntos);
                    borrarArray(arregloQuitar2)

                }



        }

        function revisarTablero(){
            for(var i=0; i<49;i++){
                revisarAlrededor($("img[numero="+i+"]"));
            }
        }



        function borrarArray(array){
            for(var i=0; i<array.length; i++){
                array[i].animate(
                    {
                        opacity: 0.25,
                        opacity: 1,
                        opacity: 0.25,
                        opacity: 0
                    },1500);
                    array[i].remove();

            }
        }



        function llenarEspaciosVacios(){
            var contador1 = 0;
            var contador2 = 0;
            var contador3 = 0;
            var contador4 = 0;
            var contador5 = 0;
            var contador6 = 0;
            var contador7 = 0;
            $("img[columna=1]").each(function(){
                contador1 += 1;
            });
            $("img[columna=2]").each(function(){
                contador2 += 1;
            });
            $("img[columna=3]").each(function(){
                contador3 += 1;
            });
            $("img[columna=4]").each(function(){
                contador4 += 1;
            });
            $("img[columna=5]").each(function(){
                contador5 += 1;
            });
            $("img[columna=6]").each(function(){
                contador6 += 1;
            });
            $("img[columna=7]").each(function(){
                contador7 += 1;
            });

            if(contador1 < 7){
                while(contador1 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                $(".col-1").append("<img class=elemento src=image/"+temp+".png  numero="+1+"  columna="+1+" imagen="+temp+" >");
                    contador1 +=1;
                }
            }

            if(contador2 < 7){
                while(contador2 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-2").append("<img class=elemento src=image/"+temp+".png  numero="+2+"  columna="+2+" imagen="+temp+" >");
                    contador2 +=1;
                }
            }

            if(contador3 < 7){
                while(contador3 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-3").append("<img class=elemento src=image/"+temp+".png  numero="+3+"  columna="+3+" imagen="+temp+" >");
                    contador3 +=1;
                }
            }

            if(contador4 < 7){
                while(contador4 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-4").append("<img class=elemento src=image/"+temp+".png  numero="+4+"  columna="+4+" imagen="+temp+" >");
                    contador4 +=1;
                }
            }

            if(contador5 < 7){
                while(contador5 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-5").append("<img class=elemento src=image/"+temp+".png  numero="+5+"  columna="+5+" imagen="+temp+" >");
                    contador5 +=1;
                }
            }

            if(contador6 < 7){
                while(contador6 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-6").append("<img class=elemento src=image/"+temp+".png  numero="+6+"  columna="+6+" imagen="+temp+" >");
                    contador6 +=1;
                }
            }

            if(contador7 < 7){
                while(contador7 < 7){
                    var temp = Math.floor((Math.random() * 4) + 1);
                    $(".col-7").append("<img class=elemento src=image/"+temp+".png  numero="+7+"  columna="+7+" imagen="+temp+" >");
                    contador7 +=1;
                }
            }


            moverElemento();
            ordenarNumeros();

        }


        function ordenarNumeros(){

            var aumento = 0;
            var aumento2 = 0;
            var aumento3 = 0;
            var aumento4 = 0;
            var aumento5 = 0;
            var aumento6 = 0;
            var aumento7 = 0;

            $(".col-"+1+" img").each(function(){
                    $(this).attr("numero", aumento);
                    $(this).attr("columna",1);
                    aumento += 7;
            })

            $(".col-"+2+" img").each(function(){
                    $(this).attr("numero", 1+aumento2);
                    $(this).attr("columna",2);
                    aumento2 += 7;
            })

            $(".col-"+3+" img").each(function(){
                    $(this).attr("numero", 2+aumento3);
                    $(this).attr("columna",3);
                    aumento3 += 7;
            })

            $(".col-"+4+" img").each(function(){
                    $(this).attr("numero", 3+aumento4);
                    $(this).attr("columna",4);
                    aumento4 += 7;
            })

            $(".col-"+5+" img").each(function(){
                    $(this).attr("numero", 4+aumento5);
                    $(this).attr("columna",5);
                    aumento5 += 7;
            })

            $(".col-"+6+" img").each(function(){
                    $(this).attr("numero", 5+aumento6);
                    $(this).attr("columna",6);
                    aumento6 += 7;
            })

            $(".col-"+7+" img").each(function(){
                    $(this).attr("numero", 6+aumento7);
                    $(this).attr("columna",7);
                    aumento7 += 7;
            })
    }
});
