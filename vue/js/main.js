const url = 'http://localhost/backend/api/TipoTarea'

const app = new Vue({
    el: '#app',
    data:{
        Tipos: [],
        Nombre:'Consumiendo API con Vue',
        titulo: '',
        id_tipo_tarea:'',
        descripcion: '',
        Editar: false
    },
    mounted(){
        this.Get_tipos()
    },
    methods:{
        async Get_tipos(){
            const response = await fetch(url)
            const myJson = await response.json()
            this.Tipos = myJson
        },
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
        async Post_Tipo(e){
            event.preventDefault()
            if (!this.Editar) {
                const data = new FormData()
                data.append('nombre',this.$refs.titulo.value)
                data.append('descripcion',this.$refs.descripcion.value)

                const response = await fetch(url,{
                    method: 'POST',
                    body: data
                })

            } else if(this.Editar === true) {
                var data = JSON.stringify({
                    "id_tipo_tarea": this.$refs.id.value,
                    "nombre": this.$refs.titulo.value,
                    "descripcion": this.$refs.descripcion.value
                })
                console.log(data)
                const response = await fetch(url + '/'+this.$refs.id.value,{
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
            }

            this.Editar = false;
            this.Get_tipos()
            this.Limpiar()
        },
        async Update_Tipos(id){
            const response = await fetch(url + '/' + id)
            const myJson = await response.json()
            this.$refs.id.value = myJson[0].id_tipo_tarea
            this.$refs.titulo.value = myJson[0].nombre
            this.$refs.descripcion.value = myJson[0].descripcion
            this.Editar = true
            this.$refs.boton.value = "Guardar Cambios"

        }
    },

});