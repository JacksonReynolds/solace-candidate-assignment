import { renderHook, act } from "@testing-library/react";
import { useAdvocateSearch } from "./useAdvocateSearch";

const mockAdvocateData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "Seattle",
    degree: "MD",
    specialties: ["Cardiology", "Internal Medicine"],
    yearsOfExperience: 10,
    phoneNumber: 5550123,
  },
];

describe("useAdvocateSearch", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should initialize with empty advocates array and empty search term", () => {
    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.advocates).toEqual([]);
    expect(result.current.searchTerm).toBe("");
  });

  it("should update search term when setSearchTerm is called", () => {
    const { result } = renderHook(() => useAdvocateSearch());

    act(() => {
      result.current.setSearchTerm("cardio");
    });

    expect(result.current.searchTerm).toBe("cardio");
  });

  it("should fetch and update advocates when fetchAdvocates is called", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ data: mockAdvocateData }),
    });

    const { result } = renderHook(() => useAdvocateSearch());

    await act(async () => {
      await result.current.fetchAdvocates("cardio");
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/advocates?search=cardio");
    expect(result.current.advocates).toEqual(mockAdvocateData);
  });
});
