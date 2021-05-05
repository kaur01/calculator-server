import { DataStore } from "../../src/dataStore/DataStore";

let dataStore: DataStore;
let initialLength: number = 0;

beforeAll(async () => {
  dataStore = new DataStore();
});

beforeEach(() => {
  dataStore.expressionList = [];
  for (let i = 1; i < 10; i++) {
    dataStore.expressionList.push("1/0=0");
  }
  initialLength = dataStore.expressionList.length;
});

describe("save", () => {
  it("should save the expression to the expressionList if there are less than 10 values in the list", () => {

    expect(dataStore.save("1/0=0")).toHaveLength(initialLength + 1);

  });
});

describe("save", () => {
  it("should pop the first expression from our expressionList and save the new expression if there are more than 10 values in the list", () => {

    dataStore.expressionList[0] = "2/0=0";
    dataStore.expressionList.push("1/0=0");

    expect(dataStore.save("1/0=0")).toHaveLength(initialLength+1);
    expect(dataStore.expressionList[0].toString()).toEqual("1/0=0");
  });
});

describe("get", () => {
  it("should get the expression List", () => {

    expect(dataStore.get()).toHaveLength(initialLength);
    
  });
});
