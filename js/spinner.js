class Spinner{

    $(id) {
        return document.getElementById(id);
    }

    static mostrarSpinner(mostrar)
    {
        if(mostrar){
            $("divSpinner").hidden = false;
        }else{
            $("divSpinner").hidden = true;
        }
    }
}

