var find_structures = require('find.structures');

var role_harvester = {
    run: function(creep){
        var target = find_structures.containers(creep);
        
        
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
            else{
                creep.say('⛏️', true);
            }
        }
        
        else {
            if(Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity){    
                if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {            
                    creep.moveTo(Game.spawns['spawn_first']);
                    creep.say('🏠', true);
                }
            }
            
            else{
                for(var room_name in Game.rooms);
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                    || structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_TOWER) 
                    && structure.energy < structure.energyCapacity;
                }});
                
                if(Game.rooms[room_name].energyAvailable == Game.rooms[room_name].energyCapacityAvailable){
                    creep.say('꽉찼다~', true);
                    creep.moveTo(2, 19);
                }
                else if(targets.length > 0){
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0]);
                        creep.say('🏠', true);
                    }
                }

                
                // creep.moveTo(targets[0]);
                // creep.transfer(targets[0], RESOURCE_ENERGY);
                
            }
        }
    }
};

module.exports = role_harvester;