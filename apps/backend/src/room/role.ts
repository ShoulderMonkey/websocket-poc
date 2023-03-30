export abstract class Role{
  team: 'wolves' | 'villagers' | 'lonely';
  isNightCreature: boolean;
  nightLifes: number;
  dayLifes: number;
  name: string

  constructor(team:'wolves' | 'villagers' | 'lonely', isNightCreature: boolean,nightLifes: number,dayLifes: number){
    this.team = team;
    this.isNightCreature = isNightCreature
    this.nightLifes = nightLifes
    this.dayLifes = nightLifes
  }
}

export class Wolf extends Role{
  constructor(){
    super('wolves', true,1,1)
    this.name = 'wolf'
  }
}

export class Protector extends Role{
  constructor(){
    super('villagers', true,1,1)
    this.name = 'protector'
  }
}

export class Seer extends Role{
  constructor(){
    super('villagers', true,1,1)
    this.name = 'seer'
  }
}

export class Fool extends Role{
  constructor(){
    super('lonely', false,1,1)
    this.name = 'fool'
  }
}

export class SuperVillager extends Role{
  constructor(){
    super('villagers', false,1,2)
    this.name = 'super-villager'
  }
}

export class Vampire extends Role{
  constructor(){
    super('villagers', false,2,1)
    this.name = 'vampire'
  }
}

export class TransformerWolf extends Role{
  constructor(){
    super('villagers', false,1,1)
    this.name = 'transformer-wolf'
  }

  transform(){
    this.team = 'wolves'
    this.isNightCreature = true;
  }
}

export class Boomer extends Role{
  constructor(){
    super('lonely', true,1,1)
    this.name = 'boomer'
  }
}

export class Sheriff extends Role{
  constructor(){
    super('villagers', false,1,1)
    this.name = 'sheriff'
  }
}
