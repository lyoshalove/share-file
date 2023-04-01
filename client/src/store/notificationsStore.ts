import { generateCode } from "@/helpers";
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
    addNewNotification(notificationMessage: string) {
      this.notifications.push({
        id: generateCode(),
        text: notificationMessage,
      });

      setTimeout(() => this.deleteFirstNotification(), 5000);
    },
  },
});
