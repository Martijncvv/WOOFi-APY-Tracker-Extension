export interface LocalStorage {
	activeTab: string
}

export type LocalStorageKeys = keyof LocalStorage

export function setActiveTabStorage(activeTab: string): Promise<void> {
	const vals: LocalStorage = {
		activeTab,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}
export function getActiveTabStorage(): Promise<string> {
	const keys: LocalStorageKeys[] = ['activeTab']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.activeTab)
		})
	})
}
