var role_pioneer = {
    run: function(creep){
        // console.log(Game.flags['Flag1'].pos);
        var flag = Game.flags['Flag1'].pos;
        var spawn = Game.spawns['spawn_first'];
        var room_pioneer = Game.rooms['W6N8'];
        const mystorage = Game.rooms['W5N8'].lookForAt('structure', 22, 22)[0];
        // console.log('mystorage'+mystorage);
        var sources = creep.room.find(FIND_SOURCES);
        
        // var sources = Game.rooms['W6N8'].find(FIND_SOURCES);
        // console.log(creep.moveTo(source));
        // creep.harvest(sources[0], RESOURCE_ENERGY);

        // 소스 근처가 아닐때,
        if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            // 에너지가 꽉 안찼다면 (캐러 가야한다면)
            if(creep.carry.energy < creep.carryCapacity){
                // 가즈아
                creep.moveTo(flag);
                creep.say('에너지캐러가즈아', true);
            }
            // 에너지가 꽉찼다면
            else{
                if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage.pos);
                    creep.say('외화벌어왔당', true);
                }
                else{
                    creep.transfer(mystorage, RESOURCE_ENERGY);
                    creep.say('외화벌어왔당!', true);
                }

            }
        }
        else{
            // 에너지가 꽉 안찼다면 (캐야한다면)
            if(creep.carry.energy < creep.carryCapacity){
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(flag);
                    creep.say('pioneering', true);
                }
                else{
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                    creep.say('캐즈아', true);
                }   
            }
            // 에너지가 꽉찼다면
            else{
                if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage.pos);
                    creep.say('외화벌어왔당', true);
                }
                else{
                    creep.transfer(mystorage, RESOURCE_ENERGY);
                }
            }
        }
    }
}
module.exports = role_pioneer;