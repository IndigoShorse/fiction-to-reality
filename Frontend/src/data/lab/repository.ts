import { MAGE } from './mage';
import { PHYS } from './phys';
import { ROOT } from './root';

export interface LabData {
  root: typeof ROOT;
  mage: typeof MAGE;
  phys: typeof PHYS;
}

/**
 * The single source for Lab content. It currently returns local data and can
 * later be replaced with an API request without changing Lab components.
 */
export async function getLabData(): Promise<LabData> {
  return { root: ROOT, mage: MAGE, phys: PHYS };
}
