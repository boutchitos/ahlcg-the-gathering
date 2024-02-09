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

  get assetsSlots(): string[] {
    return (
      (isBrowser &&
        localStorage.slots &&
        JSON.parse(localStorage.slots).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  get playerCardTypes(): string[] {
    return (
      (isBrowser &&
        localStorage.playerCardTypes &&
        JSON.parse(localStorage.playerCardTypes).map((s: string) => s ?? undefined)) ||
      []
    );
  }

  get sortingOrder(): string[] {
    return (
      (isBrowser &&
        localStorage.sortingOrder &&
        JSON.parse(localStorage.sortingOrder).map((s: string) => s ?? undefined)) ||
      []
    );
  }
}

//$: isBrowser && (localStorage.classes = JSON.stringify($classes));
//$: isBrowser && (localStorage.slots = JSON.stringify($slots));
//$: isBrowser && (localStorage.playerCardTypes = JSON.stringify($playerCardTypes));
//$: isBrowser && (localStorage.sortingOrder = JSON.stringify($sortingOrder));
