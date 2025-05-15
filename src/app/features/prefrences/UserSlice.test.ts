/**
 * @jest-environment jsdom
 */

describe("userSlice reducer & actions", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  function setupSlice(prefersDark: boolean) {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: jest.fn(),     
      removeListener: jest.fn(),
      addEventListener: jest.fn(),  
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { default: reducer, toggleTheme, setTheme } = require("./UserSlice");
    return { reducer, toggleTheme, setTheme };
  }

  it("initialState.isDarkTheme should be true when prefers-color-scheme is dark", () => {
    const { reducer } = setupSlice(true);
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.isDarkTheme).toBe(true);
  });

  it("initialState.isDarkTheme should be false when prefers-color-scheme is light", () => {
    const { reducer } = setupSlice(false);
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.isDarkTheme).toBe(false);
  });

  it("toggleTheme flips isDarkTheme", () => {
    const { reducer, toggleTheme } = setupSlice(false);
    const state1 = reducer(undefined, { type: "@@INIT" });
    expect(state1.isDarkTheme).toBe(false);

    const state2 = reducer(state1, toggleTheme());
    expect(state2.isDarkTheme).toBe(true);

    const state3 = reducer(state2, toggleTheme());
    expect(state3.isDarkTheme).toBe(false);
  });

  it("setTheme sets isDarkTheme to the payload value", () => {
    const { reducer, setTheme } = setupSlice(false);
    const state1 = reducer(undefined, { type: "@@INIT" });
    expect(state1.isDarkTheme).toBe(false);

    const state2 = reducer(state1, setTheme(true));
    expect(state2.isDarkTheme).toBe(true);

    const state3 = reducer(state2, setTheme(false));
    expect(state3.isDarkTheme).toBe(false);
  });
});
