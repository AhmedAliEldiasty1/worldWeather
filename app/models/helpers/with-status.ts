import { observable, IObservableValue } from "mobx"

export type StatusType = "idle" | "pending" | "done" | "error"

export const withStatus = () => {
  /**
   * The observable backing store for the status field.
   */
  const status: IObservableValue<string> = observable.box("idle")

  return {
    views: {
      // a getter
      get status() {
        return status.get() as StatusType
      },
      // as setter
      set status(value: StatusType) {
        status.set(value)
      },
    },
    actions: {
      /**
       * Set the status to something new.
       *
       * @param value The new status.
       */
      setStatus(value: StatusType) {
        status.set(value)
      },
    },
  }
}
