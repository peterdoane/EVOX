app.factory('WorldsFactory', function($http,MapFactory) {
  var grass = ['grass', 'dirt', 'grass_dirt']; //this will come from the server
  var dirt = ['dirt', 'dirt', 'dirt'];
  var bark = ['tree_side'];
  var leaves = ['leaves_opaque'];
  var materials = [grass, dirt, bark, leaves];
  var size = 20;

  var currentGame;


  return {
    getWorlds: function() {
      return $http.get('/api/worlds')
        .then(function(res) {
          return res.data;
        })
    },
    getWorld: function(id) {
      return $http.get('/api/worlds/' + id)
        .then(function(res) {
          return res.data;
        })
    },
    postWorld: function(world) {
      return $http.post('/api/worlds', world)
        .then(function(res) {
          return res.data;
        })
    },
    updateWorld: function(id) {
      return $http.put('/api/worlds/' + id)
        .then(function(res) {
          return res.data;
        })
    },
    removeWorld: function(id) {
      return $http.delete('/api/worlds/' + id)
        .then(function(res) {
          return res.data;
        })
    },
    setCurrentGame:function(game){
      currentGame = game;
    },
    getCurrentGame: function(){
      return currentGame;
    }
    ,
    newWorldOptions:function(){
      return {
        generate: function(x, y, z) {
        return (y === 0 && x >= 0 && x <= size && z >= 0 && z <= size) ?MapFactory.getCurrentMap().getMaterial(x, z) : 0;
      },
      materials: materials,
      texturePath: '../textures/',
      controls: {
        discreteFire: true
      },
      // // lightsDisabled: true
    }
    }
  }
})