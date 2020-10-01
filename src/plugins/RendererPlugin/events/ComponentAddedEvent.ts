import { Event } from '../../../Event';

export default class ComponentAddedEvent extends Event {
  position: string;
  constructor(name: string, position: string) {
    super(name);
    this.position = position;
  }
}
