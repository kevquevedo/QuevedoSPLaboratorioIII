class Cliente extends Persona{


    constructor(p_id, p_nombre, p_apellido, p_edad, p_sexo){

        super(p_id, p_nombre, p_apellido);
        this.edad = p_edad;
        this.p_sexo = p_sexo;
    }



    
}