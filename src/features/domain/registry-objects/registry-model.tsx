// registry.store.ts
import { makeAutoObservable } from "mobx";

class RegistryStore {
    selectedObjectId: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelected(id: number | null) {
        this.selectedObjectId = id;
    }
}

export const registryStore = new RegistryStore();