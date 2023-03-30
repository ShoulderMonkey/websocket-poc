export interface Role {
  team: 'wolves' | 'villagers' | 'lonely';
  isNightCreature: boolean;
  nightLifes: number;
  dayLifes: number;
  name: string
}
