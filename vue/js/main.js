
//Constante que servira para guardar la url del api rest
const url = 'http://localhost/backend_vue/api/tipotarea'
//Creando instancia de vue js para bindiar con el dom del html en el archivo index en el div con id=app
const app = new Vue({
    //el representa al elemento del dom donde se implementara el vue
    el: '#app',
    //Informacion con la que se estara iterando
    data:{
        Tipos: [],//Arreglo que almacenara la data
        Nombre:'Consumiendo API con Vue',//Titulo del encabezado de la pagina
        titulo: '',//propiedad con la que se bindiara el input de titulo y que almacenara el valor del campo titulo
        id_tipo_tarea:'',//propiedad con la que se bindiara el input de id_tipo_tarea y que almacenara el valor del campo id_tipo_tarea
        descripcion: '',//propiedad con la que se bindiara el input de descripcion y que almacenara el valor del campo descripcion
        Editar: false//propiedad booleana que servira para manejar el control de los botones segun la accion a realizar, puede ser post o put
    },
    //sinonimo del evento load de html. Indicamos que este metodo debe montarlo al cargar la pagina y los archivos de vue js necesarios
    mounted(){
        this.Get_tipos()
    },
    //Propiedad de vue js que sirve para definir nuestros diferentes metodos
    methods:{
        //metodo GET de http
        async Get_tipos(){
            const response = await fetch(url)
            const myJson = await response.json()
            this.Tipos = myJson
        },
         //metodo DELETE de http
        async Delete_Tipos(id){
            const response = await fetch(url + "/" + id,{
                method: 'DELETE'
            });
            this.Get_tipos()
        },
        Limpiar(){
            this.$refs.id.value = ''
            this.$refs.titulo.value = ''
            this.$refs.descripcion.value = ''
            this.$refs.boton.value = "Guardar Registro"
        },
         //metodo POST o PUT de http.
        async Accion_Tipo(e){
            //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
            event.preventDefault()
            //Verificando si Editar es falso para realizar la accion POST de Http
            if (!this.Editar) {
                const data = new FormData()//Instancia de tipo Form data para mandar la informacion
                data.append('nombre',this.$refs.titulo.value)
                data.append('descripcion',this.$refs.descripcion.value)
                //Indicando el metood a realizar a traves del metodo fetch de vue js
                const response = await fetch(url,{
                    method: 'POST',
                    body: data
                })
            //Sino realizara la accion PUT de Http
            } else if(this.Editar === true) {
                //Instancia de tipo Json data para mandar la informacion
                var data = JSON.stringify({
                    "id_tipo_tarea": this.$refs.id.value,
                    "nombre": this.$refs.titulo.value,
                    "descripcion": this.$refs.descripcion.value
                })
                //Indicando el metood a realizar a traves del metodo fetch de vue js
                const response = await fetch(url + '/'+this.$refs.id.value,{
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
            }
            //cambiando el valor de la propiedad Editar a falso
            this.Editar = false;
            this.Get_tipos()//llamando el metodo que carga la data
            this.Limpiar()//limpiando los input independientemente la accion realizada
        },
        //Metodo que llamara a un registro para editarlo segun el id
        async Update_Tipos(id){
            const response = await fetch(url + '/' + id)//consulta
            const myJson = await response.json()//convirtiendo el objeto a Json
            //asignando los valores a los input del formulario
            this.$refs.id.value = myJson[0].id_tipo_tarea
            this.$refs.titulo.value = myJson[0].nombre
            this.$refs.descripcion.value = myJson[0].descripcion
            this.Editar = true
            this.$refs.boton.value = "Guardar Cambios"

        }
    },

});