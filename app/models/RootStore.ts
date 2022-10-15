import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CityStoreModel } from "./CityStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  cityStore: types.optional(CityStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
