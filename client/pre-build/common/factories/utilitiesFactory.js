app.factory('utilitiesFactory', function() {
    var nearest;
    var min;

    function findCreature(mapCreatures, currentPoint, radius, self) {
        mapCreatures.forEach(function(creature) {
            if (creature !== self) {
                var dist = distance(currentPoint, creature.position);
                //var dist = Math.sqrt(Math.pow((creature.position.x - x), 2) + Math.pow((creature.position.z - z), 2)) ;
                if (dist < radius) {
                    if (!min) {
                        min = dist;
                        nearest = creature;
                    } else if (dist < min) {
                        min = dist;
                        nearest = creature;
                    }
                }
            }
        });
        return nearest;
    }

    function moveToEat(objv) {
        var x = this.position.x - 0.5;
        var z = this.position.z - 0.5;
        var self = this;
        //array of neighboring coordinates
        var ard = [
            [x - 1, z],
            [x + 1, z],
            [x + 1, z - 1],
            [x + 1, z - 1],
            [x - 1, z - 1],
            [x - 1, z + 1],
            [x, z - 1],
            [x, z + 1]
        ];

        var foundFood = false;
        shuffle(ard);
        if (!this.isHerbivore) {
            ard.forEach(function(coords) {
                if (coords[0] === objv.position.x - 0.5 && coords[1] === objv.position.z - 0.5 && !foundFood) {
                    foundFood = true;
                    self.lookAt(objv);
                    self.eat(objv);
                }
            });
            if (foundFood === false) {
                this.move(step(x, objv.position.x - 0.5), 0, step(z, objv.position.z - 0.5));
            }

        }
        if (this.isHerbivore) {
            var count = 0;
            foundFood = ard.some(function(coords) {
                if (!self.game.flat) {
                    if (self.game.getBlock([coords[0], self.position.y, coords[1]])) {
                        if (self.game.getBlock(coords[0], self.position.y, coords[1])) {
                            if (self.map.getCell(coords[0], self.position.y, coords[1]).material === objv) {
                                self.lookAt(self.map.getCell(coords[0], self.position.y, coords[1]));
                                self.eat(self.map.getCell(coords[0], self.position.y, coords[1]));
                                count++;
                                if (count >= self.appetite) {
                                    return true;
                                }
                            }
                        }
                    }
                } else {
                    if (self.game.getBlock([coords[0], 0, coords[1]])) {
                        if (self.game.getBlock(coords[0], 0, coords[1])) {
                            if (self.map.getCell(coords[0], 0, coords[1]).material === objv) {
                                self.lookAt(self.map.getCell(coords[0], 0, coords[1]));
                                self.eat(self.map.getCell(coords[0], 0, coords[1]));
                                count++;
                                if (count >= self.appetite) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            });


            if (!foundFood) {
                this.moveRandomly(2)
            }
        }

    }

    function step(dir, objective) {
        if (dir < objective) return 1;
        else if (dir > objective) return -1;
        else return 0;
    }

    function distance(pointA, pointB) {
        return Math.floor(Math.sqrt(Math.pow((pointB.x - pointA[0]), 2) + Math.pow((pointB.z - pointA[1]), 2)));
    }

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    return {
        findCreature: findCreature,
        distance: distance,
        moveToEat: moveToEat
    };

});