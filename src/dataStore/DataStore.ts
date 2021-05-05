export class DataStore {
  public expressionList: string[] = [];

  public save(expression: string): string[] {
    if (this.expressionList.length === 10) {
      this.expressionList.shift();
    }
    this.expressionList.push(expression);
    return this.expressionList;
  }

  public get(): string[] {
    return this.expressionList;
  }
}
