import { INotification } from "@/types";
import { defineStore } from "pinia";

interface IState {
  notifications: INotification[];
}

export const notificationsStore = defineStore("notifications", {
  state: () =>
    ({
      notifications: [],
    } as IState),
  actions: {
    deleteFirstNotification() {
      this.notifications.shift();
    },
    addNewNotification(notification: INotification) {
      this.notifications.push(notification);

      setTimeout(() => this.deleteFirstNotification(), 5000);
    },
  },
});
