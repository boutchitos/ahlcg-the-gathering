const isBrowser = typeof window !== 'undefined';

export class SortPlayerCardsDirectivesConfig {
  get assetsSlots(): string[] {
    return (
      (isBrowser &&
        localStorage.slots &&
        JSON.parse(localStorage.slots).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set assetsSlots(value: string[]) {
    if (!isBrowser) {
      return;
    }
    localStorage.slots = JSON.stringify(value);
  }

  get classes(): string[] {
    return (
      (isBrowser &&
        localStorage.classes &&
        JSON.parse(localStorage.classes).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  set classes(value: string[]) {
    if (!isBrowser) {
      return;
    }
    localStorage.classes = JSON.stringify(value);
  }

  get groupBondedCards(): boolean {
    return (
      (isBrowser && localStorage.groupBondedCards && JSON.parse(localStorage.groupBondedCards)) ??
      true
    );
  }

  set groupBondedCards(value: boolean) {
    if (!isBrowser) {
      return;
    }
    localStorage.groupBondedCards = JSON.stringify(value);
  }

  get groupInvestigatorCards(): boolean {
    return (
      (isBrowser &&
        localStorage.groupInvestigatorCards &&
        JSON.parse(localStorage.groupInvestigatorCards)) ??
      true
    );
  }

  set groupInvestigatorCards(value: boolean) {
    if (!isBrowser) {
      return;
    }
    localStorage.groupInvestigatorCards = JSON.stringify(value);
  }

  get groupByTitle(): string {
    return (isBrowser && localStorage.groupByTitle && JSON.parse(localStorage.groupByTitle)) || '';
  }

  set groupByTitle(value: string) {
    if (!isBrowser) {
      return;
    }
    localStorage.groupByTitle = JSON.stringify(value);
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
    if (!isBrowser) {
      return;
    }
    localStorage.playerCardTypes = JSON.stringify(value);
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
    if (!isBrowser) {
      return;
    }
    localStorage.sortingOrder = JSON.stringify(value);
  }
}
