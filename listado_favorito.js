Vue.component('listado-favorito',
  {
    props: [],
    template: ' <div>\
                  <div v-for="favorito in favoritos">\
                      {{favorito.id}}\
                      {{favorito.titulo}}\
                      {{favorito.url}}\
                      {{favorito.foto}}\
                  </div>\
                </div>',
    data:function() {
      return {
        favoritos : []
      }
    }, 
    created: function() {
                this.get();
                that = this;
                EventBus.$on('editing', function (index) {
                      that.get();
                });                
              },
    methods: {
        get :function(){
            this.favoritos = JSON.parse(window.localStorage.getItem('mywebfav'));
            console.log(this.favoritos)
        }
    }
  });
  
  
