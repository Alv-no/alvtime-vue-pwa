import { mutations, State, state as initialState } from "@/store";

describe("UPDATE_TIME_ENTRIES", () => {
  const { UPDATE_TIME_ENTRIES } = mutations;
  let state: State;
  beforeEach(() => {
    state = { ...initialState };
  });

  it("Adds timentries to map", () => {
    UPDATE_TIME_ENTRIES(state, [
      { id: 1, date: "2020-02-25", value: "7.5", taskId: 17 },
    ]);

    expect(state.timeEntriesMap).toEqual({
      "2020-02-25": { 17: { value: "7.5", id: 1 } },
    });
    expect(state.timeEntries).toEqual([
      { id: 1, date: "2020-02-25", value: "7.5", taskId: 17 },
    ]);
  });

  it("Updates timentries in map", () => {
    UPDATE_TIME_ENTRIES(state, [
      { id: 1, date: "2020-02-25", value: "7.5", taskId: 17 },
    ]);
    UPDATE_TIME_ENTRIES(state, [
      { id: 1, date: "2020-02-25", value: "5", taskId: 17 },
    ]);

    expect(state.timeEntriesMap).toEqual({
      "2020-02-25": { 17: { value: "5", id: 1 } },
    });
    expect(state.timeEntries).toEqual([
      { id: 1, date: "2020-02-25", value: "5", taskId: 17 },
    ]);
  });

  it("Add multiple timentries in map on same date", () => {
    UPDATE_TIME_ENTRIES(state, [
      { id: 1, date: "2020-02-25", value: "7.5", taskId: 17 },
      { id: 2, date: "2020-02-25", value: "5", taskId: 13 },
    ]);

    expect(state.timeEntriesMap).toEqual({
      "2020-02-25": { 13: { value: "5", id: 2 }, 17: { value: "7.5", id: 1 } },
    });
    expect(state.timeEntries).toEqual([
      { id: 1, date: "2020-02-25", value: "7.5", taskId: 17 },
      { id: 2, date: "2020-02-25", value: "5", taskId: 13 },
    ]);
  });
});
