const isBrowser = typeof window !== 'undefined';

export class SortPlayerCardsDirectivesConfig {
  get classes(): string[] {
    return (
      (isBrowser &&
        localStorage.classes &&
        JSON.parse(localStorage.classes).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set classes(value: string[]) {
    isBrowser && (localStorage.classes = JSON.stringify(value));
  }

  get assetsSlots(): string[] {
    return (
      (isBrowser &&
        localStorage.slots &&
        JSON.parse(localStorage.slots).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set assetsSlots(value: string[]) {
    isBrowser && (localStorage.slots = JSON.stringify(value));
  }

  get playerCardTypes(): string[] {
    return (
      (isBrowser &&
        localStorage.playerCardTypes &&
        JSON.parse(localStorage.playerCardTypes).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set playerCardTypes(value: string[]) {
    isBrowser && (localStorage.playerCardTypes = JSON.stringify(value));
  }

  get sortingOrder(): string[] {
    return (
      (isBrowser &&
        localStorage.sortingOrder &&
        JSON.parse(localStorage.sortingOrder).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set sortingOrder(value: string[]) {
    isBrowser && (localStorage.sortingOrder = JSON.stringify(value));
  }
}
