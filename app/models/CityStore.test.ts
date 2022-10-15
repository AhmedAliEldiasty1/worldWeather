import { CityStoreModel } from "./CityStore"

// This is a simple example of fetch city api

test("fetch city", async () => {
  const cityStore = CityStoreModel.create({})
  await cityStore.fetchCity("cairo")
  expect(cityStore.cityDetails.city).toBe("Cairo")
  expect(cityStore.cityDetails.country).toBe("EG")
  expect(cityStore).toBeTruthy()
})
