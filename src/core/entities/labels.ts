import deepClone from 'lodash.clonedeep';
import { ILabel } from '../interface/labels';

class Label implements ILabel {
  color: string;
  description: string;
  id: number;

  constructor({ color, description, id }: ILabel) {
    this.color = color;
    this.description = description;
    this.id = id;
  }
}

export class LabelGeneration {
  list: ILabel[];
  private counter = 0;
  private static instance: LabelGeneration;

  constructor() {
    if (typeof LabelGeneration.instance === 'object') {
      this.list = [];
      return LabelGeneration.instance;
    } else {
      this.list = [
        { color: '#990000', description: 'High priority', id: this.counter++ },
        { color: '#E28C1F', description: 'Normal priority', id: this.counter++ },
        { color: '#00AB66', description: 'Low priority', id: this.counter++ },
      ];
      LabelGeneration.instance = this;
      return this;
    }
  }

  generateNewLabel({ color, description }: Omit<ILabel, 'id'>) {
    const clone = deepClone(this.list);
    const newLabel = new Label({ color, description, id: this.counter++ });
    clone.push(newLabel);
    return (this.list = clone);
  }

  updateLabel({ id, description, color }: ILabel) {
    const clone = deepClone(this.list);
    const label = clone.find((el) => el.id === id);
    if (label) {
      label.color = color;
      label.description = description;
      return (this.list = clone);
    } else {
      console.error('Invalid param in LabelGeneration.updateLabel');
      return deepClone(this.list);
    }
  }

  deleteLabel(id: number) {
    const index = this.list.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
      return deepClone(this.list);
    } else {
      console.error('Invalid param in LabelGeneration.deleteLabel');
      return deepClone(this.list);
    }
  }

  setDataFromJSON(data: ILabel[]) {
    this.list = data;
    data.forEach((el) => (this.counter = Math.max(this.counter, el.id)));
    this.counter++;

    return this.list;
  }
}
