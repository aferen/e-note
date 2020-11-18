export class Tree {
  constructor(
    public path: string = '',
    public name: string = '',
    public size: number = 0,
    public type: string = '',
    public children: {} = {}
  ) {}
}
