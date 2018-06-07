var define_role = require('define_role');

var role_harvester = require('role_harvester');
var role_upgrader = require('role_upgrader');
var role_builder = require('role_builder');
var role_repairer = require('role_repairer');
var role_miner = require('role_miner');
var role_miner2 = require('role_miner2');
var role_cleaner = require('role_cleaner');
var role_storager = require('role_storager');
var role_pioneer = require('role_pioneer');

var structure_tower = require('structure_tower');


module.exports.loop = function () {
    // 루프문을 위한 변수
    var i = 0;

    // 개체수가 적어졌을때를 대비해서 목표 creep 수를 항상 가지고 있자.
    var total_population = 0; // 목표 전체 creep수
    for(i = 0; i < define_role.get_role_population_max().length; i++){
        total_population += define_role.get_role_population_max()[i];
    }

    // emergency variables
    var creep_count = _.filter(Game.creeps).length; // 현재 creep 수
    var emergency_creep_count = total_population; // 목표 creep 수
    var energy_for_creep = Game.spawns['spawn_first'].room.energyAvailable; // 현재 creep 생산을 위한 energy 양
    var emergency_energy_for_creep = 1000; // 목표 energy 양
    console.log('emergency_check => creep : ' + creep_count + ', energy : ' + energy_for_creep);

    // work tower
    structure_tower.run('5b14744c931ce5002cd5e775');
    structure_tower.run('5b18026b187269002656bb19');

    // clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // let work to creeps
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.ticksToLive < 101){
            creep.say('내목숨을아이어에' + creep.ticksToLive, true);
        }

        if(creep.memory.role == 'harvester'){
            role_harvester.run(creep);
        }

        if(creep.memory.role == 'upgrader'){
            role_upgrader.run(creep);
        }

        if(creep.memory.role == 'builder'){
            role_builder.run(creep);
        }

        if(creep.memory.role == 'repairer'){
            role_repairer.run(creep);
        }

        if(creep.memory.role == 'miner1'){
            role_miner.run(creep);
        }

        if(creep.memory.role == 'miner2'){
            role_miner2.run(creep);
        }

        if(creep.memory.role == 'cleaner'){
            role_cleaner.run(creep);
        }
        
        if(creep.memory.role == 'storager'){
            if(!(creep_count < emergency_creep_count && energy_for_creep < emergency_energy_for_creep)){
                role_storager.run(creep);
            }
        }
        
        if(creep.memory.role == 'pioneer'){
            role_pioneer.run(creep);
        }
    }
    
    // get link objects
    const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
    const linkTo = Game.rooms['W5N8'].lookForAt('structure', 37, 31)[0];
    // link energy from to
    linkFrom.transferEnergy(linkTo);
    
    // for (var room_name in Game.rooms);
    // links = Game.rooms[room_name].find(FIND_STRUCTURES, {filter: (link) => link.structureType == STRUCTURE_LINK});
    // console.log(links[0]);
    // console.log(links[0].transferEnergy(links[1]));

    // spawn creeps
    for(var i = 0; i < define_role.get_role_name().length; i++){
        if(define_role.get_role_count()[i] < define_role.get_role_population_max()[i]){
            // console.log(define_role.get_role_count()[i], ' ', define_role.get_role_population_max()[i]);
            var type_body = define_role.get_role_spec(define_role.get_body_spec()[i]);
            // 3마리 이하인데 현재 에너지가 별로 없다면.
            // console.log(creep_count + ' ' + energy_for_creep);
            if(creep_count < emergency_creep_count && energy_for_creep < emergency_energy_for_creep){
                Game.spawns['spawn_first'].spawnCreep(define_role.get_role_spec([1,1,1,0,0,0,0,0]), define_role.get_role_type()[i] + Game.time, {memory: {role: define_role.get_role_name()[i]}});
            }
            else{
                Game.spawns['spawn_first'].spawnCreep(type_body, define_role.get_role_type()[i] + Game.time, {memory: {role: define_role.get_role_name()[i]}});
            }
        }
    }
}

//  Game.spawns['spawn_first'].spawnCreep([WORK, CARRY, MOVE], 'c_h_' + Game.time, {memory: {role: 'harvester'}});