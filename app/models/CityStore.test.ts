import { CityStoreModel } from "./CityStore"

test("can be created", () => {
  const instance = CityStoreModel.create({})

  expect(instance).toBeTruthy()
})
