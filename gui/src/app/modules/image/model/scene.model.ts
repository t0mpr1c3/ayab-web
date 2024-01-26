import { Scale } from "../../toolbar/models/scale.model";
import { SerializedImageData } from "./serialized-image-data.model";

export interface Scene {
  data: SerializedImageData,
  scale: Scale,
  startRow: number,
  offset: number,
  width: number,
}