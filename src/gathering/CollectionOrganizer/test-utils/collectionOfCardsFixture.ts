import type { Card } from '$gathering/Card';
import type { Pack } from '$gathering/Pack';
import { CollectionEntity } from '$gathering/CollectionEntity';
import { createPackRepository } from '$gathering/PackRepository';
import { createCardRepository } from '$gathering/CardRepository';

const cardRepository = createCardRepository();
const packRepository = createPackRepository();

export function createCollectionOfCards(...packs: Pack[]): Iterable<Card> {
  const collection = new CollectionEntity(packRepository);
  packs.forEach((pack) => collection.addPack(pack));
  return cardRepository.getInvestigatorCards(collection.getPacks());
}
