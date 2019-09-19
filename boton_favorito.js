Vue.component('boton-favorito',
  {
    props: ['id_inmueble'],
    template: '<p v-if="disponible"> \
                {{id_inmueble}}\
                <i  v-on:click="changeState" \
                    class="glyphicon" \
                    v-bind:class="[activo?classActivo:classNoActivo]">\
                </i> \
              </p>',
    data:function() {
                      return {
                        classActivo : 'glyphicon-star',
                        classNoActivo : 'glyphicon-star-empty',
                        activo : false,
                        favoritos : [],
                        disponible: false //Hasta hacer las comprobaciones la estrella no está diponible
                      }
                    }, 
    created: function() {
      let isLocalStorageDisponible = (typeof(Storage) !== "undefined");
      if(isLocalStorageDisponible){
        this.disponible = true;

        this.iniciarLocalStorage();

        this.activo = this.getStatus();
        console.log('Estado de activo es ' + this.activo);
      }      
    },
    methods: {
        iniciarLocalStorage:function(){
          this.favoritos = JSON.parse(window.localStorage.getItem('mywebfav'));
          if(!Array.isArray(this.favoritos)){
            this.favoritos = Array();
            window.localStorage.setItem('mywebfav', JSON.stringify(this.favoritos) );
          }    
        },
        //Registrar el inmueble en el listado y cambia el estado
        changeState:function() {
          this.activo = !this.activo;

          this.iniciarLocalStorage();
          if(this.activo){
            this.addElemento();
          }
          else{
            this.deleteElemento();
          }
          window.localStorage.setItem('mywebfav', JSON.stringify(this.favoritos) );
          EventBus.$emit('editing', null); //Se emite un aviso general
        },
        //Mira si el inmueble está en la lista de inmuebles favoritos
        getStatus:function() {
          this.iniciarLocalStorage();
          for(i=0;i<this.favoritos.length;++i){
            if(this.favoritos[i].id === this.id_inmueble){
              return true;
            }
          }
          return false;
        },
        addElemento(){
            //Añadir elemento al array
            let item = new Object();
            item.id = this.id_inmueble;
            item.titulo = "hola";
            item.url = "http://lo que sea";
            item.foto = "Foto de lo que sea";
            this.favoritos.push(item);
        },
        deleteElemento(){
            //Retirar elementos del array
            for(i=0;i<this.favoritos.length;++i){
              if(this.favoritos[i].id === this.id_inmueble){
                this.favoritos.splice(i,1);
              }
            }  
        }
    }
  });
  
