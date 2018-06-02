/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var role_builder = {
    run: function(creep){
        
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }
        
        if(!creep.memory.building && (creep.carry.energy == creep.carryCapacity)){
            creep.memory.building = true;
            creep.say('🚧');
        }
        
        if(creep.memory.building){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('☄️');
                }
            }
        }
        else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else{
                creep.say('⛏️');
            }
        }
    }
};

module.exports = role_builder;