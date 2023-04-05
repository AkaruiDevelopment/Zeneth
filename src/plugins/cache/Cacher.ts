import { GroupConfigOptions } from '../../typings/interface.js';
import Group from './Group.js';

export class Cacher {
  [key: string]: Group;

  constructor(input: Record<string, GroupConfigOptions>) {
    for (const key of Object.keys(input)) {
      this[key] = new Group(input[key]);
    }
  }
}
